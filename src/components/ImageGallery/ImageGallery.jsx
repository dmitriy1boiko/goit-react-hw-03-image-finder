import { Component } from 'react';
import { GalleryItem } from './ImageGallery.styled';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from 'components/Button/Button';
import { getSearchedImagesApi } from 'components/servises/ImageApi';
import { Modal } from '../Modal/Modal';
class ImageGallery extends Component {
  state = {
    images: [],
    query: '',
    isLoading: false,
    page: 1,
    error: null,
    showModal: false,
    largeImg: '',
  };

  static getDerivedStateFromProps(props, state) {
    if (state.query !== props.query) {
      return { page: 1, query: props.query };
    }
    return null;
  }

  async componentDidUpdate(prevProps, prevState) {
    // const { query } = this.props;
    const { page, query } = this.state;
    if (
      (prevProps.query !== query && query !== '') ||
      (prevState.page !== page && page !== 1)
    ) {
      this.setImages();
    }
  }

  setImages = async () => {
    const { page, query } = this.state;

    this.setState({ isLoading: true, error: null });
    try {
      const data = await getSearchedImagesApi(query, page);
      if (data.hits.length === 0) {
        throw new Error(`No images for ${query}`);
      }
      this.setState(prev => ({
        images: page === 1 ? data.hits : [...prev.images, ...data.hits],
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  changePage = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  showLargeImg = largeImg => {
    this.setState({ largeImg });
  };

  render() {
    const { images, error, showModal } = this.state;
    return (
      <>
        {this.state.isLoading && <h1>Loading...</h1>}
        {error ? (
          <h2>{error}</h2>
        ) : (
          <>
            <GalleryItem>
              <ImageGalleryItem
                images={images}
                openModal={this.toggleModal}
                showLargeImg={this.showLargeImg}
              />
              {showModal && (
                <Modal
                  closeModal={this.toggleModal}
                  largeImg={this.state.largeImg}
                ></Modal>
              )}
            </GalleryItem>
            {images.length > 0 && <Button onClick={this.changePage} />}
          </>
        )}
      </>
    );
  }
}

export default ImageGallery;
