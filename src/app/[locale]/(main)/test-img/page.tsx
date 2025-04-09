/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-await-in-loop */

'use client';

import React, { useRef, useState } from 'react';

const filters = [
  { label: 'Default', value: 'none' },
  { label: 'Chrome', value: 'contrast(1.2) saturate(1.4)' },
  { label: 'Cold', value: 'contrast(1.1) saturate(1.2) hue-rotate(180deg)' },
  { label: 'Warm', value: 'contrast(1.1) saturate(1.3) hue-rotate(-20deg)' },
  { label: 'Grayscale', value: 'grayscale(100%)' },
  { label: 'Sepia', value: 'sepia(100%)' },
  { label: 'Invert', value: 'invert(100%)' },
];

const stickers = [
  './assets/images/stickers/emoji1.png',
  './assets/images/stickers/emoji2.png',
];

const ImageEditor = () => {
  const imgSrc = './assets/images/img-filter.jpg';
  const [filter, setFilter] = useState('none');
  const [stickerList, setStickerList] = useState<
    { src: string; x: number; y: number }[]
  >([]);
  const imgContainerRef = useRef<HTMLDivElement>(null);

  const handleAddSticker = (src: string) => {
    setStickerList((prev) => [...prev, { src, x: 50, y: 50 }]);
  };

  const handleDrag = (index: number, e: React.DragEvent<HTMLImageElement>) => {
    const containerRect = imgContainerRef.current?.getBoundingClientRect();
    if (!containerRect) return;

    const x = e.clientX - containerRect.left - 25;
    const y = e.clientY - containerRect.top - 25;

    const updated = [...stickerList];
    const sticker = updated[index];

    // Kiểm tra sticker tồn tại và có src
    if (!sticker || !sticker.src) return;

    updated[index] = { src: sticker.src, x, y };
    setStickerList(updated);
  };

  const handleSaveImage = async () => {
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 300;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw base image
    const baseImage = new Image();
    baseImage.crossOrigin = 'anonymous'; // Required if loading from external
    baseImage.src = imgSrc;

    await new Promise<void>((resolve) => {
      baseImage.onload = () => {
        // Apply CSS filter via canvas (approximate using ctx.filter)
        ctx.filter = filter;
        ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
        ctx.filter = 'none';
        resolve();
      };
    });

    // Draw stickers
    for (const sticker of stickerList) {
      const stickerImg = new Image();
      stickerImg.src = sticker.src;
      await new Promise<void>((resolve) => {
        stickerImg.onload = () => {
          ctx.drawImage(stickerImg, sticker.x, sticker.y, 50, 50);
          resolve();
        };
      });
    }

    // Export as data URL
    const dataUrl = canvas.toDataURL('image/png');

    // Download image
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = 'edited-image.png';
    a.click();
  };

  return (
    <div className="flex flex-col items-center">
      {/* Filter select */}
      <div className="mb-2">
        <label className="mr-2 font-semibold">Filter:</label>
        <select onChange={(e) => setFilter(e.target.value)} value={filter}>
          {filters.map((f) => (
            <option key={f.value} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>
      </div>

      {/* Image with stickers */}
      <div
        ref={imgContainerRef}
        className="relative border"
        style={{ width: 400, height: 300 }}
      >
        <img
          src={imgSrc}
          alt="Main"
          className="size-full object-cover"
          style={{ filter }}
        />
        {stickerList.map((sticker, index) => (
          <img
            key={index}
            src={sticker.src}
            alt="sticker"
            draggable
            onDragEnd={(e) => handleDrag(index, e)}
            className="absolute cursor-move"
            style={{
              left: sticker.x,
              top: sticker.y,
              width: 50,
              height: 50,
            }}
          />
        ))}
      </div>

      {/* Stickers */}
      <div className="mt-4 flex gap-3">
        {stickers.map((src) => (
          <button
            type="button"
            key={src}
            onClick={() => handleAddSticker(src)}
            className="rounded border bg-white p-2"
          >
            <img src={src} alt="sticker" className="size-10" />
          </button>
        ))}
      </div>

      {/* Save Button */}
      <button
        type="button"
        onClick={handleSaveImage}
        className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Save Image
      </button>
    </div>
  );
};

export default ImageEditor;
