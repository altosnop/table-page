import { RootState } from '../configureStore';

export const loadingSelector = (state: RootState) => state.person.loading;
