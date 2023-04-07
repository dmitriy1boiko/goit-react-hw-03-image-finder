import PropTypes from 'prop-types';
import { GalleryItem, ImageItem } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ image, openModal }) => {
  const { largeImageURL, name, webformatURL } = image;
  return (
    <GalleryItem onClick={() => openModal(largeImageURL)}>
      <ImageItem src={webformatURL} alt={name} />
    </GalleryItem>
  );
};
export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  image: PropTypes.arrayOf(PropTypes.object).isRequired,
  openModal: PropTypes.func.isRequired,
};
