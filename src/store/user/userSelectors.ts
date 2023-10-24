import { RootState } from '../configureStore';

export const statusSelector = (state: RootState) => state.user.status;
export const messageSelector = (state: RootState) => state.user.message;
export const loadingSelector = (state: RootState) => state.user.loading;
export const isAuthenticatedSelector = (state: RootState) =>
  state.user.isAuthenticated;
