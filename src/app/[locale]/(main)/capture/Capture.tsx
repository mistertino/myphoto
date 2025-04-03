/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-plusplus */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable @next/next/no-img-element */

'use client';

import { Button } from 'antd';
import { useEffect, useRef, useState } from 'react';

import { notify } from '@/utils/common';

import ModalView from './components/ModalView';

export default function Capture() {
  // const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [capturedImages, setCapturedImages] = useState<any[]>([]);
  const [captureInterval, setCaptureInterval] = useState<number>(3);
  const [captureCount, setCaptureCount] = useState(3);
  const [countdown, setCountdown] = useState<number>(0);
  const [cameras, setCameras] = useState<any[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<string | null>(null);
  const [filter, setFilter] = useState('none');
  const [openModal, setOpenModal] = useState({
    isOpen: false,
    data: null,
  });
  const [rotation, setRotation] = useState(0);
  const [flipX, setFlipX] = useState(false);
  const [flipY, setFlipY] = useState(false);

  async function startCamera(deviceId: string) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  }

  async function getCameras() {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(
        (device) => device.kind === 'videoinput',
      );
      setCameras(videoDevices);
      if (videoDevices && videoDevices.length > 0) {
        setSelectedCamera(videoDevices[0] ? videoDevices[0].deviceId : '');
        startCamera(videoDevices[0] ? videoDevices[0].deviceId : '');
      }
    } catch (error) {
      console.error('Error accessing camera devices:', error);
    }
  }

  useEffect(() => {
    if (capturedImages.length > 0 && capturedImages.length === captureCount) {
      setOpenModal({
        isOpen: true,
        data: null,
      });
    }
  }, [capturedImages]);

  // useEffect(() => {
  //   async function getCameras() {
  //     try {
  //       const devices = await navigator.mediaDevices.enumerateDevices();
  //       const videoDevices = devices.filter(
  //         (device) => device.kind === 'videoinput',
  //       );
  //       setCameras(videoDevices);
  //       if (videoDevices && videoDevices.length > 0) {
  //         setSelectedCamera(videoDevices[0] ? videoDevices[0].deviceId : '');
  //         startCamera(videoDevices[0] ? videoDevices[0].deviceId : '');
  //       }
  //     } catch (error) {
  //       console.error('Error accessing camera devices:', error);
  //     }
  //   }
  //   getCameras();
  // }, []);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(() => {
        getCameras();
      })
      .catch(() => {
        notify('Bạn phải cho phép dùng camera để sử dụng ứng dụng', 'warning');
      });
  }, []);

  const handleCameraChange = (event: any) => {
    const deviceId = event.target.value;
    setSelectedCamera(deviceId);
    startCamera(deviceId);
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const context = canvasRef.current.getContext('2d');

    // Đặt kích thước canvas phù hợp với video gốc
    const { videoWidth } = videoRef.current;
    const { videoHeight } = videoRef.current;

    // Nếu video đã quay 90 hoặc 270 độ, cần hoán đổi width/height của canvas
    if (rotation % 180 !== 0) {
      canvasRef.current.width = videoHeight;
      canvasRef.current.height = videoWidth;
    } else {
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;
    }

    // Xóa canvas trước khi vẽ
    context?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    // Di chuyển điểm gốc để xoay chính xác
    context?.save();
    if (rotation === 90) {
      context?.translate(canvasRef.current.width, 0);
      context?.rotate((90 * Math.PI) / 180);
    } else if (rotation === 180) {
      context?.translate(canvasRef.current.width, canvasRef.current.height);
      context?.rotate((180 * Math.PI) / 180);
    } else if (rotation === 270 || rotation === -90) {
      context?.translate(0, canvasRef.current.height);
      context?.rotate((-90 * Math.PI) / 180);
    }

    if (flipX) {
      context?.translate(canvasRef.current.width, 0);
      context?.scale(-1, 1);
    }

    if (flipY) {
      context?.translate(0, canvasRef.current.height);
      context?.scale(1, -1);
    }

    // Áp dụng filter (nếu có)
    if (context) {
      context.filter = filter;
    }

    // Vẽ hình ảnh từ video vào canvas
    context?.drawImage(videoRef.current, 0, 0, videoWidth, videoHeight);
    context?.restore(); // Khôi phục trạng thái gốc của canvas

    // Nếu có filter đặc biệt (pinkify), chỉnh sửa từng pixel
    if (filter === 'pinkify') {
      const imageData: ImageData | undefined = context?.getImageData(
        0,
        0,
        canvasRef.current?.width,
        canvasRef.current?.height,
      );
      if (imageData) {
        const dataImg = imageData?.data ?? new Uint8ClampedArray();
        for (let i = 0; i < dataImg.length; i += 4) {
          dataImg[i] = (dataImg[i] ?? 0) + 30;
          dataImg[i + 1] = (dataImg[i + 1] ?? 0) - 10;
          dataImg[i + 2] = (dataImg[i + 2] ?? 0) - 10;
        }
        context?.putImageData(imageData, 0, 0);
      }
    }

    // Chuyển canvas thành ảnh
    const newImage = canvasRef?.current?.toDataURL('image/png');
    setCapturedImages((prev) => {
      const updatedImages = [...prev, newImage];
      return updatedImages;
    });
  };

  const startTimedCapture = () => {
    setCapturedImages([]);
    let shotCount = 0;

    const captureSequence = () => {
      if (shotCount >= captureCount) return;

      let countdownValue = captureInterval;
      setCountdown(countdownValue);

      const countdownInterval = setInterval(() => {
        countdownValue--;
        setCountdown(countdownValue);
        if (countdownValue <= 0) {
          clearInterval(countdownInterval);
          capturePhoto();
          shotCount++;
          if (shotCount < captureCount) {
            setTimeout(captureSequence, 100);
          }
        }
      }, 1000);
    };
    captureSequence();
  };

  return (
    <div className="flex flex-col">
      <div className="grid h-[90vh] grid-cols-3 items-center justify-between gap-2 p-4">
        <div className="relative col-span-3 flex h-[60vh] items-center justify-center lg:col-span-2">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full rounded-lg object-cover"
            style={{
              filter: filter === 'pinkify' ? 'none' : filter,
              transform: `rotate(${rotation}deg) ${flipX ? 'scaleX(-1)' : ''} ${flipY ? 'scaleY(-1)' : ''}`,
              transformOrigin: 'center',
              transition: 'transform 0.3s ease',
              width: rotation % 180 === 0 ? '83%' : '60vh',
              height: rotation % 180 === 0 ? '60vh' : '100%',
            }}
          />
          {countdown > 0 && (
            <div className="absolute left-1/2 top-1/2 flex size-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-4xl font-bold text-white opacity-45 outline outline-4 outline-white">
              <span>{countdown}</span>
            </div>
          )}
          {capturedImages.length === 0 ||
          capturedImages.length === captureCount ? (
            <Button
              className="absolute bottom-2 right-1/2 !size-16 translate-x-1/2 rounded-full text-white opacity-70 hover:text-red-200"
              onClick={startTimedCapture}
              type="text"
              icon={
                <i className="fa-regular fa-circle-camera text-5xl text-white opacity-70 hover:text-gray-400" />
              }
            />
          ) : null}
        </div>

        {/* ----------------------Option ------------------------------- */}
        <div className="glass-card col-span-3 flex h-[50vh] flex-col items-center justify-center rounded-xl lg:col-span-1">
          <div className="grid w-full grid-cols-2 items-center justify-center lg:grid-cols-4 lg:flex-row">
            <div className="col-span-1 flex w-full items-center justify-center">
              <button
                type="button"
                className="button-glass col-span-1 flex w-20 items-center justify-center"
                onClick={() => setRotation((prev) => prev - 90)}
              >
                <i className="fa-regular fa-arrow-rotate-left" />
              </button>
            </div>

            <div className="col-span-1 flex w-full items-center justify-center">
              <button
                type="button"
                className="button-glass col-span-1 flex w-20 items-center justify-center"
                onClick={() => setFlipX((prev) => !prev)}
              >
                <i className="fa-regular fa-arrows-left-right" />
              </button>
            </div>
            <div className="col-span-1 flex w-full items-center justify-center">
              <button
                type="button"
                className="button-glass col-span-1 flex w-20 items-center justify-center"
                onClick={() => setFlipY((prev) => !prev)}
              >
                <i className="fa-regular fa-arrows-up-down" />
              </button>
            </div>
            <div className="col-span-1 flex w-full items-center justify-center">
              <button
                type="button"
                className="button-glass col-span-1 flex w-20 items-center justify-center"
                onClick={() => setRotation((prev) => prev + 90)}
              >
                <i className="fa-regular fa-arrow-rotate-right" />
              </button>
            </div>
          </div>
          <div className="mt-7 grid w-full grid-cols-5 justify-center pl-4 lg:justify-start">
            <span className="col-span-2 text-sm font-semibold text-white">
              Chọn camera:{' '}
            </span>
            <select
              value={selectedCamera || ''}
              onChange={handleCameraChange}
              className="col-span-3 mx-2 border px-2 py-1 text-black"
            >
              {cameras.map((camera, index) => (
                <option key={camera.deviceId} value={camera.deviceId}>
                  {camera.label || `Camera ${index + 1}`}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-4  grid w-full grid-cols-5 justify-center pl-4 lg:justify-start">
            <span className="col-span-2 text-sm font-semibold text-white">
              Chọn bộ lọc:{' '}
            </span>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="col-span-3 mx-2 border px-2 py-1 text-black"
            >
              <option value="none">Không có</option>
              <option value="grayscale(100%)">Đen trắng</option>
              <option value="brightness(150%)">Làm sáng</option>
              <option value="pinkify">Làm hồng da</option>
            </select>
          </div>
          <div className="mt-4 flex w-full flex-col items-center justify-center gap-2 pl-4 lg:items-start">
            <div className="grid w-full grid-cols-5 gap-1">
              <span className="col-span-2 text-sm font-semibold text-white">
                Thời gian chụp (giây):{' '}
              </span>
              <input
                min={3}
                type="number"
                value={captureInterval}
                onChange={(e) => setCaptureInterval(Number(e.target.value))}
                className="col-span-3 mx-2 border px-2 py-1 text-black"
              />
            </div>
            <div className="grid w-full grid-cols-5 gap-1">
              <span className="col-span-2 text-sm font-semibold text-white">
                Số lần chụp:{' '}
              </span>
              <input
                min={3}
                type="number"
                value={captureCount}
                onChange={(e) => setCaptureCount(Number(e.target.value))}
                className="col-span-3 mx-2 border px-2 py-1 text-black"
              />
            </div>
          </div>

          <canvas ref={canvasRef} className="hidden" />
          <div
            className="mt-4 flex flex-wrap justify-center gap-2"
            onClick={() => {
              if (
                capturedImages.length > 0 &&
                capturedImages.length === captureCount
              ) {
                setOpenModal({
                  isOpen: true,
                  data: null,
                });
              }
            }}
          >
            {capturedImages.map((img, index) => (
              <img
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                src={img}
                alt={`Captured ${index + 1}`}
                className="size-24 rounded-lg border object-cover object-center"
              />
            ))}
          </div>
        </div>
        {/* ----------------------Option ------------------------------- */}
      </div>

      {openModal.isOpen && (
        <ModalView
          capturedImages={capturedImages}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
      )}
    </div>
  );
}
