import { Component } from 'react';
import { GalleryItem } from './ImageGallery.styled';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from 'components/Button/Button';
import { getSearchedImagesApi } from 'components/servises/ImageApi';
class ImageGallery extends Component {
  state = {
    images: [],
    query: '',
    isLoading: false,
    page: 1,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query } = this.props;
    const { page } = this.state;
    if (prevProps.query !== query && query !== '') {
      this.setState({ isLoading: true });
      try {
        const data = await getSearchedImagesApi(query);
        if (data.hits.length === 0) {
          throw new Error(`No images for ${query}`);
        }
        this.setState({ images: data.hits });
      } catch (error) {
        console.log(error.message);
      } finally {
        this.setState({ isLoading: false });
      }
    }
    if (prevState.page !== page) {
      this.setState({ isLoading: true });
      try {
        const data = await getSearchedImagesApi(query, page);
        if (data.hits.length === 0) {
          throw new Error(`No images for ${query}`);
        }
        this.setState(prev => ({ images: [...prev.images, ...data.hits] }));
      } catch (error) {
        console.log(error.message);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  changePage = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  render() {
    const { images } = this.state;
    return (
      <>
        {this.state.isLoading && <h1>Loading...</h1>}
        <GalleryItem>
          <ImageGalleryItem images={images} />
        </GalleryItem>
        {images.length > 0 && <Button onClick={this.changePage} />}
      </>
    );
  }
}
export default ImageGallery;
