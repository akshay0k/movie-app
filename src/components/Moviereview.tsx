import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCast, detailsMovies, fetchVideo } from "../API/tmbdApi";
import dayjs from "dayjs";
import {ProgressStatus} from "../components/ProgressStatus";
import { CastResponse, movieType } from "../model/type";

const Moviereview = () => {
  const [movieDetails, setMovieDetails] = useState<movieType[]>();
  const [MovieCast, setMovieCast] = useState<CastResponse[]>([]);
  const [trailerVideo, setTrailerVideo] = useState<string>("");
  const [ShowPosterimg, setShowPosterimg] = useState<boolean>(true);
  const { id } = useParams();
  useEffect(() => {
    const getMovieDetails = async () => {
      const details = await detailsMovies(id);
      const videos = await fetchVideo(id);
      const cast = await fetchCast(id);
      setMovieDetails(details);
      setMovieCast(cast);
      const trailer = videos.results.find(
        (video: any) => video.type === "Trailer"
      );
      if (trailer) {
        setTrailerVideo(trailer.key);
      }
    };
    getMovieDetails();
  }, [id]);

  const getImageUrl = (posterPath: string) => {
    return `https://image.tmdb.org/t/p/original/${posterPath}`;
    
  };
  return (
    <div className="bg-black min-h-screen">
     
      {movieDetails && (
        <div className="flex flex-col items-center justify-center gap-10 p-3 sm:p-16">
          <div className="w-full sm:w-4/5 lg:w-3/5 xl:w-2/5">
            <div className="relative">
              <img
                src={getImageUrl(movieDetails.backdrop_path)}
                alt=""
                className="w-full h-64 sm:h-96 object-cover rounded-lg"
              />
              <div className="absolute top-0 left-0 bottom-0 right-0 bg-gradient-to-r from-black/20 to-black z-10 flex items-center justify-center">
                {ShowPosterimg && (
                  <div className="w-40 sm:w-52 lg:w-60 flex flex-col items-center"></div>
                )}
              </div>
            </div>
          </div>
          <div className="text-white text-center">
            <div className="w-full flex gap-2">
              <img
                src={getImageUrl(movieDetails.poster_path)}
                alt=""
                className="w-1/2 md:w-1/6 object-cover rounded-xl"
              />
              <div className="flex-col p-3">
                <h1 className="text-sm sm:text-4xl font-semibold">
                  {movieDetails.title}
                </h1>
                <span className="text-xl sm:text-3xl font-normal">
                  ({dayjs(movieDetails.release_date).format("YYYY")})
                </span>
                <div className="mt-5 w-12 h-12  bg-black rounded-full">
                  <ProgressStatus percentage={movieDetails.vote_average * 10} />
                </div>
                <p className="mt-4 text-sm sm:text-base  md:text-lg py-5 text-start">
                  {movieDetails.overview}
                </p>
              </div>
            </div>
            {trailerVideo && (
              <div className="mt-8">
                <iframe
                  className="w-full h-64 sm:h-96 rounded-md"
                  src={`https://www.youtube.com/embed/${trailerVideo}`}
                  title="Movie Trailer"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="flex  gap-4 p-4 overflow-x-auto">
        <h1 className="text-2xl font-bold text-white">Top Cast</h1>
        {MovieCast?.map((cast) => (
          <div className="shrink-0 rounded-md overflow-hidden border p-1">
            <img
              src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
              alt="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiQmcqzN9KSMx-hxPJfiB3yt59uQhN9R4IqjisfUEitJv9lbQVN14QYLsUfmgiH-AoH2VgTFMdRBaTWa9XXpU9aMV1fveYnRgRsf4peaqt_rCR_qyQ483NgjHHdhfYpOr8axyGWhk3DHw5lAUQkXl6NGMugPS7k6Apw7CUjqRMgwAv01i2_AXyRumuBfw/w680/blank-profile-picture-hd-images-photo.JPG"
              className="w-48 h-auto"
            />
            <h1 className="text-white font-bold p-2">{cast.name}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Moviereview;