import type { ModalContextProps } from '@/context/ModalNotiSessionContext';

let modalInstance: { showModal: ModalContextProps['showModal'] } | null = null;

export const setModalInstance = (instance: {
  showModal: ModalContextProps['showModal'];
}) => {
  modalInstance = instance;
};

export const openModal = () => {
  if (modalInstance) {
    modalInstance.showModal();
  } else {
    console.error(
      'Modal instance is not set. Make sure ModalProvider is initialized.',
    );
  }
};
