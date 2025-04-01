'use client';

import { WarningOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import type { ReactElement } from 'react';
import React from 'react';

export interface AppProps {
  openModal: boolean;
  callbackFunc: () => void;
  callbackFuncDiscard?: () => void;
  textComfirm?: string;
  textCancel?: string;
  title: string;
  desc: string | ReactElement;
  width?: number;
}

export default function ModalConfirm(props: AppProps) {
  const {
    openModal,
    callbackFunc,
    callbackFuncDiscard,
    textComfirm,
    textCancel,
    title,
    width,
    desc,
  } = props;

  return (
    <div>
      <Modal
        title=""
        centered
        open={openModal}
        footer={<div />}
        onCancel={callbackFuncDiscard}
        closeIcon={<div />}
        width={width || undefined}
      >
        <div className="p-3">
          <span className="flex w-full items-center justify-center">
            <WarningOutlined className="text-center text-6xl text-yellow-700" />
          </span>
          <span className="mt-5 flex w-full items-center justify-center text-3xl font-bold">
            {title || ''}
          </span>
          <p className="whitespace-pre-line p-3 text-center text-lg font-medium">
            {desc || ''}
          </p>
          <div className="mt-2 flex justify-center gap-4">
            {callbackFuncDiscard && (
              <Button
                className="btn-outline-custom h-10 w-24"
                onClick={callbackFuncDiscard}
              >
                {textCancel || 'Hủy'}
              </Button>
            )}
            <Button
              className="btn-custom h-10 w-24"
              onClick={callbackFunc}
              autoFocus
            >
              {textComfirm || 'Đồng ý'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
