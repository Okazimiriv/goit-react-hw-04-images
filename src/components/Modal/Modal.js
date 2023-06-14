import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, ModalWindow } from './Modal.styled';

const modalRoot = document.querySelector('#image-modal');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onEscapeCloseHandle);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onEscapeCloseHandle);
  }

  onBackdropCLick = event => {
    if (event.target === event.currentTarget) {
      this.props.onClose();
    }
  };

  onEscapeCloseHandle = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    const { alt } = this.props;

    return createPortal(
      <Overlay onClick={this.onBackdropCLick}>
        <ModalWindow>
          <img src={this.props.bigImage} alt={alt} />
        </ModalWindow>
      </Overlay>,
      modalRoot
    );
  }
}

PropTypes.Modal = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
