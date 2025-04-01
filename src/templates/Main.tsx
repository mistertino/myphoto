/* eslint-disable no-console */
/* eslint-disable no-unreachable-loop */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */

'use client';

import 'react-toastify/dist/ReactToastify.css';
import './index.css';

import { Layout } from 'antd';
import { useRouter } from 'next/navigation';
import React from 'react';
import { ToastContainer } from 'react-toastify';

import LocaleSwitcher from '@/components/LocaleSwitcher';

import { menuItems } from './menuItems';

const { Header, Content } = Layout;

export const Main = (props: { children: React.ReactNode }) => {
  const router = useRouter();

  return (
    <Layout className="flex h-screen flex-col">
      <ToastContainer hideProgressBar />
      <Layout className="bgImage flex flex-1 flex-col">
        <Header className="h-20 flex items-center bg-black px-4 shadow-[inset_0_0_50px_rgba(255,255,255,0.2)] gap-2">
          <div>
            <span className="text-2xl text-white">MyPhoto</span>
          </div>
          <div className="gap-2 flex w-full items-center ml-10 h-16">
            {menuItems.map((itemMenu) => (
              <div
                key={itemMenu.key}
                className="flex flex-col text-white items-center justify-center w-24 h-full p-[1px] hover:p-[2px] hover:border-y hover:border-y-white rounded-md"
                onClick={() => router.push(itemMenu?.href || '')}
              >
                <i className={`${itemMenu.icon} h-1/2 flex items-center justify-center`} />
                <span className='h-1/2 flex items-center justify-center'>{itemMenu.label}</span>
              </div>
            ))}
          </div>
          <div className="w flex w-full items-center justify-end">
            <div className="mr-3 flex items-center justify-between gap-1">
              <div className="flex w-14 justify-center text-center" />
            </div>
            <div>
              <LocaleSwitcher />
            </div>
          </div>
        </Header>

        <Content className="content-scrollbar-hide mx-4 mt-4 flex-1 overflow-auto">
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
};
