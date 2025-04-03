/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable @next/next/no-img-element */

import 'react-image-lightbox/style.css';

import { useState } from 'react';
import Lightbox from 'react-image-lightbox';

type AppProps = {
  imgSrc: any;
};
const ImageView = (props: AppProps) => {
  const { imgSrc } = props;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <img
        src={imgSrc}
        alt="Preview"
        className="w-fit cursor-pointer"
        onClick={() => setIsOpen(true)}
      />

      {isOpen && (
        <Lightbox mainSrc={imgSrc} onCloseRequest={() => setIsOpen(false)} />
      )}
    </div>
  );
};

export default ImageView;
