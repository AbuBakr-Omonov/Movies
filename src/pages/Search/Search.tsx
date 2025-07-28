import { useMovie } from "@/api/hooks/useMovie";
import MovieView from "@/components/movieView/MovieView";
import useDebounce from "@/hooks/useDebounce";
import { useParamsHook } from "@/hooks/useParamsHook";
import { Spin, Empty, Alert, Pagination } from "antd";
import React, { useEffect, useState } from "react";

const Search = () => {
  // useEffect(() => window.scrollTo(0, 0), []);
  const {setParam:setPrm, getParam:getPrm} = useParamsHook()
  const { getMoviesSearch } = useMovie()
  const queryPram = getPrm("query")
  const [query, setQuery] = useState( queryPram ||"");
  const debounce = useDebounce(query)

  //URL dan "page" va "genre" ni olish
  const { getParam, setParam } = useParamsHook();
  const page = Number(getParam("page")) || 1;
  
  //Pagination 
  const handlPagination = (value: Number) => {
    setParam("page", value.toString());
  };
  const genre = getParam("genre");
  console.log(genre);
  
  useEffect(() => {
      if(debounce){
        setPrm("query", debounce)
      }
  },[debounce])
   
  const { data, isLoading, isError } = getMoviesSearch({query : queryPram ? queryPram : debounce, page, with_genres: genre, without_genres: "36,27,18,10749",})

  return (
    <div className="min-h-screen container mx-auto px-4 py-10 flex justify-center">
      <div className="w-full ">
        <div className=" flex flex-col items-center justify-center">
          <input
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full max-w-[400px] px-4 py-2 rounded-lg  border border-gray-300 dark:border-gray-400  bg-white dark:bg-[#111111] text-black dark:text-white focus:outline-none  focus:border-gray-500 dark:focus:border-gray-500    transition" />
        </div>

        {isLoading && (
          <div className="text-center mt-6 ">
            <Spin size="large" tip="Searching movies..." />
          </div>
        )}
        {isError && (
          <div className="mt-6">
            <Alert
              message="Error"
              description="Something went wrong while fetching movies. Please try again."
              type="error"
              showIcon
            />
          </div>
        )}

        {!isLoading && data?.results?.length === 0 && query.length > 0 && (
          <div className="mt-10 text-center">
            <Empty
              description={
                <span className="text-gray-500 dark:text-gray-400 text-lg">
                  No movies found for your search.
                </span>
              }
            />
          </div>
        )}
        <div className="mt-8">
          <MovieView data={data?.results} loading={isLoading} count={12} />

          {data?.total_results > 0 && (
            <div className="w-full flex justify-center mt-10">
              <div className="bg-white dark:bg-[#111111] px-6 py-4 rounded-xl shadow-md">
                <Pagination
                  current={page}
                  onChange={handlPagination}
                  total={data?.total_results <= 10000 ? data?.total_results : 10000}
                  pageSize={20}
                  showSizeChanger={false}
                  className="
                    [&_.ant-pagination-item-active]:!bg-[#C61F1F]
                    [&_.ant-pagination-item-active]:!text-white
                    [&_.ant-pagination-item]:!rounded-md
                    dark:[&_.ant-pagination-item]:!text-gray-300
                    dark:[&_.ant-pagination-item-active]:!bg-[#C61F1F]
                    dark:[&_.ant-pagination-item-active]:!text-white
                  "
                />
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default React.memo(Search);
