/* eslint-disable react/jsx-no-constructed-context-values */
import { WarningOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { signOut } from 'next-auth/react';
import React, { createContext, useCallback, useContext, useState } from 'react';

import { ACCESS_TOKEN, USER_PERMISSIONS } from '@/utils/constants';
import { setModalInstance } from '@/utils/ModalUtil';

export interface ModalContextProps {
  showModal: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

async function keycloakSessionLogout() {
  try {
    await fetch(`/api/logout`, { method: 'GET' });
  } catch (error) {
    console.log(error);
  }
}

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const showModal = useCallback(() => {
    setModalOpen(true);
  }, []);

  React.useEffect(() => {
    setModalInstance({ showModal });
  }, [showModal]);

  const handleOk = () => {
    sessionStorage.removeItem(ACCESS_TOKEN);
    sessionStorage.removeItem(USER_PERMISSIONS);
    keycloakSessionLogout().then(() => signOut({ callbackUrl: '/' }));

    // setModalOpen(false);
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  return (
    <ModalContext.Provider value={{ showModal }}>
      {children}
      <Modal title="" closable={false} open={isModalOpen} footer={<div />}>
        <div className="flex flex-col justify-center p-3">
          <span className="flex w-full items-center justify-center">
            <WarningOutlined className="text-center text-6xl text-yellow-700" />
          </span>
          <span className="mt-5 flex w-full items-center justify-center text-center text-xl font-bold">
            Phiên làm việc của bạn đã hết hạn. Vui lòng đăng nhập lại.
          </span>

          <div className="mt-2 flex justify-center gap-4">
            <Button
              className="btn-outline-custom h-10 w-24"
              onClick={handleCancel}
            >
              Hủy
            </Button>
            <Button
              className="btn-custom h-10 w-24"
              onClick={handleOk}
              autoFocus
            >
              Đồng ý
            </Button>
          </div>
        </div>
      </Modal>
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextProps => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
