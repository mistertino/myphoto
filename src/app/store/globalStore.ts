import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import type { UserInfo } from '@/types/global';

interface GlobalStoreState {
  userInfo: UserInfo | null;
  setUserInfo: (data: UserInfo | null) => void;
  useDataRequestGetList: { [key: string]: any } | null;
  setUseDataRequestGetList: (config: string, req: any) => void;
}

const store = immer<GlobalStoreState>((set) => ({
  userInfo: null,
  setUserInfo: (userInfo: UserInfo | null) =>
    set((state: GlobalStoreState) => {
      // eslint-disable-next-line no-param-reassign
      state.userInfo = userInfo;
    }),
  useDataRequestGetList: null,
  setUseDataRequestGetList: (config: string, req: any) =>
    set((state: any) => {
      if (!state.useDataRequestGetList) {
        // eslint-disable-next-line no-param-reassign
        state.useDataRequestGetList = {};
      }
      if (config === 'MAIN') {
        // eslint-disable-next-line no-param-reassign
        state.useDataRequestGetList = null;
        return;
      }
      // eslint-disable-next-line no-param-reassign
      state.useDataRequestGetList[config] = req;
    }),
}));

const useGlobalStore = create(
  persist(devtools(store), { name: 'globalStore' }),
);

export default useGlobalStore;
