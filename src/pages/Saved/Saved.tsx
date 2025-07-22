import { useMovie } from "@/api/hooks/useMovie";
import MovieView from "@/components/movieView/MovieView";
import { useStore } from "@/Zustand/Store";
import React, { useEffect } from "react";

const Saved = () => {
   useEffect(() => window.scrollTo(0, 0), []);
    const { getMovies } = useMovie();
  const { isLoading } = getMovies({})
  const {saved }= useStore()
  return <div className="min-h-[300px]"> <MovieView data={saved} loading={isLoading} count={10}/> </div>;
};

export default React.memo(Saved);
