import { create } from 'zustand'
import { IHomeQueryParams } from './typeGroup';


export interface HomeListStoreState {
    query: IHomeQueryParams;
    setQuery: (query: IHomeQueryParams) => void;
}
  
export const useHomeListStore = create<HomeListStoreState>((set, get) => ({
    query: { type: 'latest', category: '', page: '1', limit: '5' },
    setQuery: (query) => set({ query }),
}));
  