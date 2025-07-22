import type { IMovie } from '@/types'
import { create } from 'zustand'

type Store = {
  saved:IMovie[]
  togglesaved: (payload:IMovie) => void
}

export const useStore = create<Store>()((set) => ({
  saved: [],
  togglesaved: (payload) => set((state) => { 
    const isExast = state.saved.some((item:IMovie) => item.id === payload.id)
    if(isExast){
        return{
            saved: state.saved.filter((item:IMovie) => item.id !== payload.id)
        }
    }else{
        return{
            saved: [...state.saved, payload]
        }
    }
  }),
}))