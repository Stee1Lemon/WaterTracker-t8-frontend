import { useEffect } from 'react';
import { OverlayBackground, Container } from './ModalOverlay.styled';

const ModalOverlay = ({ children, isOpen, onClose }) => {
  const keydownHandler = ({ key }) => {
    switch (key) {
      case 'Escape':
        onClose();
        break;
      default:
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', keydownHandler);
    return () => document.removeEventListener('keydown', keydownHandler);
  });

  return (
    <>
      {isOpen ? (
        <div className="overlay">
          <OverlayBackground onClick={onClose} />
          <Container>{children}</Container>
        </div>
      ) : null}
    </>
  );
};

export default ModalOverlay;
