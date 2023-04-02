import { GalleryItem, ImageItem } from './ImageGalleryItem.styled';
const ImageGalleryItem = ({images}) => {
  return (
    <>
      {images.map(({ id, largeImageURL, webformatURL, name }) => {
        return (
          <GalleryItem
            key={id}
            // ref={arr.length - itemsAmount === idx ? imagesItemRef : null}
            // onClick={handle}
            data-large={largeImageURL}
          >
            <ImageItem src={webformatURL} alt={name} />
          </GalleryItem>
        );
      })}
    </>
  );
}
export default ImageGalleryItem;