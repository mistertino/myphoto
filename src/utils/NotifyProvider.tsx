'use client';

// import type { Socket } from 'socket.io-client';
// import { io } from 'socket.io-client';
// import { notify } from './common';
import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import { ToastContainer } from 'react-toastify';

export default function NotifyProvider(props: { children: React.ReactNode }) {
  // const socket: Socket = io('wss://caar.vn');

  // const socketInitializer = (): void => {
  //   socket.on('server-message', (message: string) => {
  //     notify(message);
  //   });
  // };

  // useEffect(() => {
  //   // socketInitializer();
  //   return () => {
  //     // socket.removeAllListeners('server-message');
  //   };
  // }, []);

  return (
    <div className="box-socket">
      {props.children}
      <ToastContainer hideProgressBar />
    </div>
  );
}
