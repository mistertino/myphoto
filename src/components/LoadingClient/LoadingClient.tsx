'use client';

import './index.css';

type AppProps = {
  isLoading: boolean;
};

export default function LoadingClient({ isLoading }: AppProps) {
  return (
    <div className={`${isLoading ? 'flex' : 'hidden'} loading-client`}>
      <i className="fa-duotone fa-spinner-third fa-spin text-6xl text-primary-color" />
    </div>
  );
}
