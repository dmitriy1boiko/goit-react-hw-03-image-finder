import PropTypes from 'prop-types';
import { Component } from 'react';
import { ModalBackdrop, ModalContent, ModalImg } from './Modal.styled';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.closeEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeEsc);
  }

  closeEsc = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  closeModal = e => {
    if (e.currentTarget === e.target) {
      this.props.closeModal();
    }
  };

  render() {
    const { largeImg } = this.props;
    return createPortal(
      <ModalBackdrop onClick={this.closeModal}>
        <ModalContent closeModal={this.props.closeModal}>
          <ModalImg
            src={largeImg}
            alt="img"
            onClick={this.closeModal}
          ></ModalImg>
        </ModalContent>
      </ModalBackdrop>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  largeImg: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
