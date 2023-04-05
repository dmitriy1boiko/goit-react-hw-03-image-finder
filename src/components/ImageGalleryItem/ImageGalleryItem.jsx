import PropTypes from 'prop-types';
import { GalleryItem, ImageItem } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ images, openModal, showLargeImg }) => {
  return (
    <>
      {images.map(({ id, largeImageURL, webformatURL, name }) => {
        const handle = e => {
          openModal();
          showLargeImg(e.currentTarget.dataset.large);
        };
        return (
          <GalleryItem
            key={id}
            // ref={arr.length - itemsAmount === idx ? imagesItemRef : null}
            onClick={handle}
            data-large={largeImageURL}
          >
            <ImageItem src={webformatURL} alt={name} />
          </GalleryItem>
        );
      })}
    </>
  );
};
export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  openModal: PropTypes.func.isRequired,
  showLargeImg: PropTypes.func.isRequired,
};
