import { GalleryList } from './ImageGallery.styled';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ images, openModal }) => {
  // static getDerivedStateFromProps(props, state) {
  //   if (state.query !== props.query) {
  //     return { page: 1, query: props.query };
  //   }
  //   return null;
  // }
  return (
    <GalleryList>
      {images.map(image => {
        return (
          <ImageGalleryItem
            key={image.id}
            image={image}
            openModal={openModal}
          />
        );
      })}
    </GalleryList>
  );
};

export default ImageGallery;
