let updateRefreshTokenSuccess: ((token: string) => void) | null = null;

export const setUpdateRefreshTokenSuccess = (fn: (token: string) => void) => {
  updateRefreshTokenSuccess = fn;
};

export const triggerUpdateRefreshTokenSuccess = (token: string) => {
  if (updateRefreshTokenSuccess) {
    updateRefreshTokenSuccess(token);
  }
};
