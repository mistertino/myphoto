/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable @next/next/no-img-element */

import { Modal } from 'antd';
import html2canvas from 'html2canvas';
import React, { useEffect, useRef, useState } from 'react';

import { CONSTANTS_ICONS } from '@/utils/constants-icons';

import ImageView from './ImageView';

export interface IAppProps {
  capturedImages: any[];
  openModal: {
    isOpen: boolean;
    data: any;
  };
  setOpenModal: (value: { isOpen: boolean; data: any }) => void;
}

export default function ModalView(props: IAppProps) {
  const { capturedImages, openModal, setOpenModal } = props;
  const imageRef = useRef(null);
  const [imgSrc, setImgSrc] = useState<any>(null);

  const handleExportImage = async () => {
    if (imageRef.current) {
      const canvas = await html2canvas(imageRef.current);
      const imgData = canvas.toDataURL('image/png');

      // Tạo thẻ <a> để tải ảnh xuống
      const link = document.createElement('a');
      link.href = imgData;
      link.download = 'exported-image.png';
      link.click();
    }
  };

  useEffect(() => {
    setTimeout(async () => {
      if (imageRef.current) {
        const canvas = await html2canvas(imageRef.current);
        const imgData = canvas.toDataURL('image/png');
        setImgSrc(imgData);
      }
    }, 500);
  }, [imageRef.current]);

  const renderCol = () => {
    if (capturedImages.length > 6) {
      return 'grid-cols-3 w-[1152px]';
    }
    if (capturedImages.length > 3) {
      return 'grid-cols-2 w-[770px]';
    }
    return 'grid-cols-1 w-96';
  };

  return (
    <Modal
      width="95vw"
      // height="95vh"
      open={openModal.isOpen}
      onClose={() =>
        setOpenModal({
          isOpen: false,
          data: null,
        })
      }
      onCancel={() =>
        setOpenModal({
          isOpen: false,
          data: null,
        })
      }
      centered
      className="modal-custom-black"
      footer={<div />}
    >
      <div className="grid max-h-[90vh] grid-cols-3 overflow-y-auto">
        <div className="col-span-2 flex max-h-[90vh] flex-col items-center  justify-center rounded-md bg-black bg-opacity-50 p-4">
          <ImageView imgSrc={imgSrc} />
        </div>
        <div className="col-span-1 flex max-h-[90vh] items-center justify-center">
          <div className="glass-card col-span-3 flex h-[50vh] w-3/4 flex-col items-center justify-center rounded-xl lg:col-span-1">
            <div className="mt-4  grid w-full grid-cols-5 justify-center pl-4 lg:justify-start">
              <span className="col-span-2 text-lg font-semibold text-black">
                Chọn viền:{' '}
              </span>
              <select
                // value={filter}
                // onChange={(e) => setFilter(e.target.value)}
                className="col-span-3 mx-2 border px-2 py-1 text-black"
              >
                <option value="none">Không có</option>
                <option value="grayscale(100%)">Viền tròn</option>
                <option value="brightness(150%)">Viền sao</option>
                <option value="pinkify">Trái tim</option>
              </select>
            </div>
            <div className="mt-4  grid w-full grid-cols-5 justify-center pl-4 lg:justify-start">
              <span className="col-span-2 text-lg font-semibold text-black">
                Chọn sticker:{' '}
              </span>
              <select
                // value={filter}
                // onChange={(e) => setFilter(e.target.value)}
                className="col-span-3 mx-2 border px-2 py-1 text-black"
              >
                <option value="none">Không có</option>
                <option value="grayscale(100%)">Mặt trăng</option>
                <option value="brightness(150%)">mặt trời</option>
                <option value="pinkify">Trái tim</option>
              </select>
            </div>
            <div className="mt-auto flex w-full items-center justify-center">
              <div className=" flex w-full items-center justify-center">
                <button
                  type="button"
                  className="button-glass col-span-1 flex w-fit items-center justify-center gap-2"
                  onClick={() => handleExportImage()}
                >
                  Tải xuống {'  '} <i className={CONSTANTS_ICONS.DOWNLOAD} />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="fixed z-[-1]">
          <div className="absolute left-[-9999] opacity-0">
            <div
              ref={imageRef}
              className={`mx-5 grid ${renderCol()} gap-2 bg-slate-950 p-7`}
            >
              {capturedImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Captured ${index + 1}`}
                  // className="col-span-1 size-96 rounded-lg object-cover object-center"
                  className="col-span-1 w-full aspect-[12/9]"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
