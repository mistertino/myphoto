'use client';

import React from 'react';
// import { Metadata } from "next"
// import Link from "next/link"
// import video from '@/public/images/home/img-ads.jpg';
// import home2 from '@/public/images/home/img-home-2.png';
// import dataRealtime from '@/public/images/home/data-realtime.png';
// import Image from "next/image";
// export const metadata: Metadata = {
//     title: "error",
//     description: "Not found page.",
// }

const ErrorPage = () => {
  return (
    <div className="page-content">
      {/* ====== Error 404 Section Start */}
      <section className="bg-primary relative z-10 py-[120px]">
        <div className="container mx-auto">
          <div className="-mx-4 flex">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[400px] text-center">
                <h2 className="mb-2 text-[50px] font-bold leading-none text-black sm:text-[80px] md:text-[100px]">
                  Lỗi
                </h2>
                <h4 className="mb-3 text-[22px] font-semibold leading-tight text-black">
                  Oops! Có gì đó không ổn
                </h4>
                <p className="mb-8 text-lg text-black">
                  Trang bạn đang truy cập đang gặp lỗi
                </p>
                <a
                  href="/"
                  className="hover:text-primary inline-block rounded-lg border border-white px-8 py-3 text-center text-base font-semibold text-black transition hover:bg-white"
                >
                  Quay về trang chủ
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute left-0 top-0 -z-10 flex size-full items-center justify-between space-x-5 md:space-x-8 lg:space-x-14">
          <div className="h-full w-1/3 bg-gradient-to-t from-[#FFFFFF14] to-[#C4C4C400]" />
          <div className="flex h-full w-1/3">
            <div className="h-full w-1/2 bg-gradient-to-b from-[#FFFFFF14] to-[#C4C4C400]" />
            <div className="h-full w-1/2 bg-gradient-to-t from-[#FFFFFF14] to-[#C4C4C400]" />
          </div>
          <div className="h-full w-1/3 bg-gradient-to-b from-[#FFFFFF14] to-[#C4C4C400]" />
        </div>
      </section>
      {/* ====== Error 404 Section End */}
    </div>
  );
};

export default ErrorPage;
