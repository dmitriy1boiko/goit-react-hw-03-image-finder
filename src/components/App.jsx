import { Component } from 'react';
import { AppSection } from './App.styled';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import { getSearchedImagesApi } from './servises/ImageApi';
import { Modal } from './Modal/Modal';
import Button from './Button/Button';
export class App extends Component {
  state = {
    images: [],
    query: '',
    isLoading: false,
    page: 1,
    error: null,
    showModal: false,
    largeImg: '',
    totalImages: 0,
  };

  async componentDidUpdate(_, prevState) {
    const { page, query } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
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
        images: [...prev.images, ...data.hits],
        totalImages: data.totalHits,
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  changeQuery = query => {
    this.setState({ query, images: [], page: 1 });
  };

  changePage = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  openModal = largeImg => {
    this.setState({ largeImg, showModal: true });
  };

  closeModal = () => {
    this.setState({ largeImg: '', showModal: false });
  };

  render() {
    const { images, isLoading, showModal, totalImages } = this.state;
    return (
      <AppSection>
        <Searchbar onSubmit={this.changeQuery} />
        {this.state.isLoading && <h1>Loading...</h1>}
        <ImageGallery images={images} openModal={this.openModal} />
        {showModal && (
          <Modal closeModal={this.closeModal} largeImg={this.state.largeImg} />
        )}
        {!isLoading && totalImages !== images.length && (
          <Button onClick={this.changePage} />
        )}
      </AppSection>
    );
  }
}
