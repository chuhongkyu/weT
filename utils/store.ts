import { create } from 'zustand'
import { getHomeList } from './api';
import { IData, IHomeQueryParams } from './typeGroup';


interface HomeListStoreState {
    query: IHomeQueryParams;
    data?: {
        lists?: IData[];
        totalCount?: number;
    };
    setData: (data : {}) => void;
    setQuery: (query: IHomeQueryParams) => void;
    fetch: () => Promise<void>;
}
  
export const useHomeListStore = create<HomeListStoreState>((set, get) => ({
    query: { type: 'latest', page: '1', limit: '5' },
    data: {},
    setData: (data) => set({ data }),
    setQuery: (query) => set({ query }),
    fetch: async () => {
      const currentQuery = get().query;
      const data = await getHomeList(currentQuery);
      set({ data });
    },
}));
  