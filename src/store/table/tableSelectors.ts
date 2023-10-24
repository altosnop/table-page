import { RootState } from '../configureStore';

export const loadingSelector = (state: RootState) => state.table.loading;
export const dataSelector = (state: RootState) => state.table.data;
export const countSelector = (state: RootState) => state.table.count;
export const nextPageSelector = (state: RootState) => state.table.next;
export const prevPageSelector = (state: RootState) => state.table.previous;
