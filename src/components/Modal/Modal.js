import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import PropTypes from 'prop-types';
import { Overlay, ModalWindow } from './Modal.styled';

const modalRoot = document.querySelector('#image-modal');

export function Modal({ alt, bigImage, onClose }) {
  useEffect(() => {
    const onEscapeCloseHandle = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', onEscapeCloseHandle);
    disableBodyScroll(document);
    return () => {
      window.removeEventListener('keydown', onEscapeCloseHandle);
      enableBodyScroll(document);
    };
  }, [onClose]);

  const onBackdropCLick = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <Overlay
      onClick={onBackdropCLick}
      // onAfterOpen={() => disableBodyScroll(document)}
      // onAfterClose={() => enableBodyScroll(document)}
    >
      <ModalWindow>
        <img src={bigImage} alt={alt} loading="lazy" />
      </ModalWindow>
    </Overlay>,
    modalRoot
  );
}

PropTypes.Modal = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

// const modalRoot = document.querySelector('#image-modal');

// export class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.onEscapeCloseHandle);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.onEscapeCloseHandle);
//   }

//   onBackdropCLick = event => {
//     if (event.target === event.currentTarget) {
//       this.props.onClose();
//     }
//   };

//   onEscapeCloseHandle = event => {
//     if (event.code === 'Escape') {
//       this.props.onClose();
//     }
//   };

//   render() {
//     const { alt } = this.props;

//     return createPortal(
//       <Overlay onClick={this.onBackdropCLick}>
//         <ModalWindow>
//           <img src={this.props.bigImage} alt={alt} />
//         </ModalWindow>
//       </Overlay>,
//       modalRoot
//     );
//   }
// }
