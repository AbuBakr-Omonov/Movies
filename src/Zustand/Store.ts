import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { IMovie } from "@/types"

type AuthUser = {
  credential: string
} | null

type Store = {
  saved: IMovie[]
  togglesaved: (movie: IMovie) => void

  auth: AuthUser
  setAuth: (credential: AuthUser) => void
  logout: () => void
}

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      saved: [],
      togglesaved: (movie) => {
        const exists = get().saved.some((item) => item.id === movie.id)
        if (exists) {
          set({
            saved: get().saved.filter((item) => item.id !== movie.id),
          })
        } else {
          set({
            saved: [...get().saved, movie],
          })
        }
      },

      auth: null,
      setAuth: (credential) => {
        if (credential?.credential) {
          localStorage.setItem("credential", credential.credential)
        }
        set({ auth: credential })
      },
      logout: () => {
        localStorage.removeItem("credential")
        set({ auth: null })
      },
    }),
    {
      name: "movie-saved-store",
      partialize: (state) => ({
        saved: state.saved,
        auth: state.auth,
      }),
    }
  )
)
