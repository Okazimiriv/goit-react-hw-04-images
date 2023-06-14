import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryBlock } from './ImageGallery.styled';

export const ImageGallery = ({ images, onImgClick }) => {
  return (
    <ImageGalleryBlock onClick={onImgClick}>
      {images.map(({ id, webformatURL, tags, largeImageURL }) => {
        return (
          <ImageGalleryItem
            onImgClick={onImgClick}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            tags={tags}
            key={id}
          />
        );
      })}
    </ImageGalleryBlock>
  );
};

PropTypes.ImageGallery = {
  onImgClick: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      webFormatUrl: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }).isRequired
  ),
};
