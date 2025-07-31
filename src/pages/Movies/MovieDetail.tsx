import { useMovie } from "@/api/hooks/useMovie";
import MovieView from "@/components/movieView/MovieView";
import { IMAGE_URL } from "@/const";
import type { TMovieImage } from "@/types";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import logo from "@/assets/vite.svg";
import { RightOutlined } from "@ant-design/icons";
//
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import SkeletonDetail from "@/components/SkeletonMovieCard/skeletonDetail";
import SkeletonScenes from "@/components/SkeletonMovieCard/SkeletonScenes ";
import SkeletonCast from "@/components/SkeletonMovieCard/SkeletonCast ";
import SkeletonMovieInfo from "./SkeletonMovieInfo ";
/////
const MovieDetail = () => {
  useEffect(() => window.scrollTo(0, 0));
  const { id } = useParams();
  const { getMovieSingle, getMovieDetail } = useMovie();
  const { data, isLoading: isLoadingMovie, isLoading: isLoadingInfo } = getMovieSingle(id || "");
  const { data: similarData, isLoading } = getMovieDetail(id || "", "similar");
  const { data: imagesData, isLoading: isLoadingScenes } = getMovieDetail(id || "", "images");
  const { data: creditsData, isLoading: isLoadingCast } = getMovieDetail(id || "", "credits");
  // console.log(similarData.results);
  console.log(imagesData);
  const navigate = useNavigate();

  return (
    <>
      {isLoadingMovie ? <SkeletonDetail /> : (
        <div className="rounded-3xl rounded-b-3xl relative max-w-[1300px] mx-auto  max-[768px]:px-3 max-[500px]:px-2">
          <img
            className="rounded-3xl  w-full h-auto object-cover max-[500px]:rounded-xl"
            src={IMAGE_URL + data?.backdrop_path}
            alt=""
          />

          <div className="absolute inset-0 bg-gradient-to-t   to-transparent dark:from-black/90 dark:via-black/50" />
          <div className=" backdrop-blur-[1px]    absolute bottom-6 left-6 right-6 text-white z-10 max-[500px]:bottom-3 max-[500px]:left-3 max-[500px]:right-3">
            <p className="text-sm sm:text-base italic text-gray-600 dark:text-gray-400">
              “{data?.tagline}”
            </p>
            <p className="opacity-80 dark:opacity-50 md:block text-sm md:text-base lg:text-lg max-w-2xl text-gray-200 mb-4  max-[500px]:text-xs max-[500px]:mb-2 truncate">
              {data?.overview}
            </p>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <button className="bg-[#C61F1F] hover:bg-[#a91919] transition-colors px-5 py-2 rounded-lg text-sm font-semibold max-[500px]:px-3 max-[500px]:py-1 max-[500px]:text-xs">
                Add to wishlist
              </button>
              <span className="text-[20px] text-red-600 max-[500px]:text-sm">
                {data?.release_date.split("-")[0]}
              </span>
            </div>
          </div>

          <div className="absolute top-4 sm:top-6 md:top-5 left-0 right-0 px-4 sm:px-6 flex sm:flex-row sm:items-center justify-between gap-2 max-[500px]:px-2 max-[500px]:top-2">
            <p className="text-2xl sm:text-3xl md:text-4xl text-white font-bold max-[500px]:text-lg max-[400px]:text-base">
              {data?.title}
            </p>
            <div className="flex items-center gap-2">
              <img
                className="w-[20px] sm:w-[25px] max-[500px]:w-[18px]"
                src={logo}
                alt="logo"
              />
              <span className="text-white font-Ax text-sm sm:text-base max-[500px]:text-xs">
                movie
              </span>
            </div>
          </div>
        </div>
      )}
      {isLoadingInfo ? <SkeletonMovieInfo /> : (
        <div className="mt-[50px] container mx-auto bg-gray-100 dark:bg-[#111111]  rounded-2xl px-4 py-8 text-black dark:text-white space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-3">{data?.title}</h1>
            <p className="text-sm sm:text-base leading-relaxed text-gray-700  dark:text-gray-300 ">
              {data?.overview}
            </p>
          </div>



          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
            <div className="bg-white dark:bg-[#111111] rounded-xl px-5 py-4 space-y-2 shadow-md">
              <h3 className="text-sm font-semibold mb-2 text-gray-800 dark:text-gray-200">
                Information
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">Released:</span>{" "}
                {data?.release_date?.split("-")[0]}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">Rated:</span> {data?.status}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">Origin:</span>{" "}
                {data?.origin_country?.[0]}
              </p>
            </div>

            <div className="bg-white dark:bg-[#111111] rounded-xl px-5 py-4 space-y-2 shadow-md">
              <h3 className="text-sm font-semibold mb-2 text-gray-800 dark:text-gray-200">
                Language
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">Original:</span>{" "}
                {data?.original_language?.toUpperCase()}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">Audio:</span>{" "}
                {data?.spoken_languages?.[0]?.english_name}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">Subtitles:</span> English
              </p>
            </div>
            <div className="bg-white dark:bg-[#111111] rounded-xl px-5 py-4 space-y-2 shadow-md">
              <h3 className="text-sm font-semibold mb-2 text-gray-800 dark:text-gray-200">
                Accessibility
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                CC (Closed Caption)
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                AD (Audio Description)
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Subtitles available
              </p>
            </div>
          </div>
        </div>)}

      <div className="container mx-auto ">
        <div className="mt-[20px]">
          <p className=" font-Ax ml-[17px] text-black dark:text-white ">
            Scenes <RightOutlined style={{ fontSize: "16px", color: "#fff" }} />
          </p>
        </div>
        {isLoadingScenes ? (
          <SkeletonScenes />
        ) : (
          <Swiper
            spaceBetween={12}
            slidesPerView={"auto"}
            freeMode={true}
            modules={[FreeMode]}
            className="px-4 mt-12 mb-12 border-y border-gray-300 dark:border-gray-700 "
          >
            {imagesData?.backdrops?.map((item: TMovieImage, inx: number) => (
              <SwiperSlide
                key={inx}
                style={{ width: "185px", maxWidth: "80vw" }}
                className=" my-[22px] rounded-lg overflow-hidden bg-white dark:bg-[#1a1a1a] shadow transition-all duration-300 ease-in-out hover:shadow-md hover:scale-[1.02]"
              >
                <img
                  src={IMAGE_URL + item?.file_path}
                  alt={`Backdrop ${inx}`}
                  className="w-full h-[120px] object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        <div className="">
          <p className=" font-Ax ml-[17px] text-black dark:text-white ">
            Cast & crew{" "}
            <RightOutlined style={{ fontSize: "16px", color: "#fff" }} />
          </p>
        </div>
        {isLoadingCast ? <SkeletonCast /> : (
          <Swiper
            spaceBetween={16}
            slidesPerView={"auto"}
            freeMode={true}
            modules={[FreeMode]}
            className="px-4 b  mt-[50px] mb-[50px] border-y border-y-gray-400 dark:border-t-gray-700 "
          >
            {creditsData?.cast?.map((person: any) => (
              <SwiperSlide
                key={person?.id}
                style={{ width: "103px" }}
                className="text-center text-sm text-white space-y-1 py-[30px]"
              >
                <img  onClick={() => navigate(`/personDeatil/${person.id}`)} src={person?.profile_path ? IMAGE_URL + person.profile_path : "https://avatars.mds.yandex.net/i?id=bc191175c76b8822e8ce5a4c87ea0768d98eff5c-5091797-images-thumbs&n=13"} alt={person?.original_name} className="w-[80px] h-[80px]  sm:w-[100px] sm:h-[100px] rounded-full object-cover mx-auto shadow-md border border-gray-500" />
                <h3 className="font-semibold text-gray-800 dark:text-white text-[12px] sm:text-sm truncate">
                  {person?.original_name}
                </h3>
                <p className="text-gray-700 dark:text-gray-400 text-[11px] sm:text-xs truncate">
                  {person?.character}
                </p>
              </SwiperSlide>
            ))}
          </Swiper>)}
      </div>

      <MovieView data={similarData?.results?.slice(0, 8)} loading={isLoading} count={8} />

    </>
  );
};

export default React.memo(MovieDetail);

