import { CONSTANTS_ICONS } from "@/utils/constants-icons";
import { Button, Modal } from "antd";
import html2canvas from "html2canvas";
import * as React from "react";

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
  const imageRef = React.useRef(null);

  const handleExportImage = async () => {
    if (imageRef.current) {
      const canvas = await html2canvas(imageRef.current);
      const imgData = canvas.toDataURL("image/png");

      // Tạo thẻ <a> để tải ảnh xuống
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "exported-image.png";
      link.click();
    }
  };
  return (
    <div>
      <Modal
        width="100vw"
        height="95vh"
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
        className="modal-custom-black"
        footer={<div />}
      >
        <div className="grid grid-cols-3">
          <div className="col-span-2 bg-slate-400 flex justify-center items-center flex-col p-4 rounded-md bg-opacity-50">
            <div
              ref={imageRef}
              className="mx-5 flex w-96 flex-col gap-2 bg-slate-950 p-7"
            >
              {capturedImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Captured ${index + 1}`}
                  className="size-96 rounded-lg object-cover object-center"
                />
              ))}
            </div>
            {/* <div className="mt-3 flex flex-col">
                        <span>Chọn viền</span>
                        <select className="mx-2 border px-2 py-1">
                            <option value="none">Không có</option>
                            <option value="circle">Tròn</option>
                            <option value="heart">Trái tim</option>
                            <option value="start">Sao</option>
                        </select>
                    </div> */}
          </div>
          <div className="col-span-1 flex justify-center items-center">
            <div className="glass-card col-span-3 flex h-[50vh] flex-col items-center justify-center rounded-xl lg:col-span-1 w-3/4">
              <div className="mt-4  grid w-full grid-cols-5 justify-center pl-4 lg:justify-start">
                <span className="col-span-2 text-lg font-semibold text-black">
                  Chọn viền:{" "}
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
                  Chọn sticker:{" "}
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
              <div className="flex w-full items-center justify-center mt-auto">
                <div className=" flex w-full items-center justify-center">
                  <button
                    type="button"
                    className="button-glass col-span-1 flex w-fit items-center justify-center"
                    onClick={() => () => handleExportImage()}
                  >
                    Tải xuống {"  "} <i className={CONSTANTS_ICONS.DOWNLOAD} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
