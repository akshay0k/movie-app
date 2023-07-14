import { useEffect, useState } from "react";

import "./assets/App.scss";
import{ Result, Search} from "./model/type"
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import {
  fetchTrending,
  fetchWeeklyTrending,
  popularMovies,
  nowPlayingMovies,
  fetchUser,
  fetchTrendingWeek,
  fetchSearch,
 
} from "./API/tmbdApi";
import { ProgressStatus } from "./components/ProgressStatus";
import {AiOutlineLeft,AiOutlineRight} from "react-icons/ai";
import {CgProfile}from "react-icons/cg";
import {AiOutlineMessage} from "react-icons/ai";
import {MdNotificationsActive} from "react-icons/md"
import {TbBrandSafari} from "react-icons/tb";
import {AiOutlineHeart} from "react-icons/ai";
import {SlCalender} from "react-icons/sl"
import {BsSearch} from "react-icons/bs"
import { Link } from "react-router-dom";


function App() {
 
  const [data, setData] = useState<Result[]>([]);
  const [weeklyTrending, setWeeklyTrending] = useState<Result[]>([]);
  const [search,setSearch]= useState<Search[]>([]);
  const [query,setQuery]=useState<string>("");
  const [toogle,setToogle]=useState<boolean>(true);
  const [popular, setPopular] = useState<Result[]>([]);
  const [nowPlaying, setNowPlaying] = useState<Result[]>([]);

  const [user,setUser] = useState([]);

  const [dayWeek,setDayWeek]=useState(true);
// USER API
useEffect(()=>{
     const getUserMovies =async ()=>{
         const data = await fetchUser()
         setUser (data.users)
     }
     getUserMovies()
 },[])
  // console.log("api",user);
  
// 
  useEffect(() => {
    const trendingWeekly = async () => {
      const result = await fetchWeeklyTrending();
      setWeeklyTrending(result.results);
    };
    trendingWeekly();
  }, []);

  // console.log(data);

  useEffect(() => {
    const trendingToday = async () => {

      if (dayWeek===true) {
       
        const result = await fetchTrending();
      setData(result.results);
        
        
      } else {
        const result = await fetchTrendingWeek();
        setData(result.results);
        
        
      }
      
      
    };
    trendingToday();
  }, [dayWeek]);

  useEffect(()=>{
    
    const suggestion =async()=>{
      if(query !== ""){
      const data = await fetchSearch(query);
      setSearch(data.slice(0,5))

    } else {
      setSearch([]);
    }
  };
    suggestion();

  },[query]);
  console.log(search,"hiiii");
  console.log(query,'jjjj');
  



  useEffect(() => {
    const moviesPopular = async () => {
      const result = await popularMovies();
      setPopular(result.results);
    };
    moviesPopular();
  }, []);



  const getImageUrl = (poster_path: string) => {
    return `https://image.tmdb.org/t/p/w500/${poster_path}`;
  };
  const getImg = (backdrop_path: any) => {
    return `https://image.tmdb.org/t/p/original/${backdrop_path}`;
  };
  const options = {
    margin: 30,
    // responsiveClass: true,
    
    autoplay: true,
    autoplayTimeout: 5000,
    smartSpeed: 3000,
    responsive: {
      0: {
        items: 1,
      },
    },
  };

  // carousel image
  useEffect(() => {
    const nowPlayinglist = async () => {
      const result = await nowPlayingMovies();
      setNowPlaying(result.results);
    };
    nowPlayinglist();
  }, []);

  return (

    <div className="flex h-screen w-full">

      {/* SIDE BAR */}
      <div className="w-1/5 h-screen pt-12 bg-gradient-to-l from-black to-gray-950 ">

        <h1 className="text-center text-red-500 font-extrabold text-2xl ">Cinema <span className="text-white">Prime</span></h1>
        <div className="flex h-[300px] flex-col w-full p-3 gap-5 mt-[85px]">
          <p className=" text-gray-500 font-bold">News Feed</p>
          <div className="flex items-center gap-3">
            <i><TbBrandSafari size={20} className=" text-gray-400 "/></i>
            <p className="font-bold  text-gray-400 text-xl">Browse</p>
          </div>
          <div className="flex items-center gap-3">
            <i><AiOutlineHeart size={20} className=" text-gray-400 "/></i>
            <p className="font-bold  text-gray-400 text-xl">Watchlist</p>
          </div>
          <div className="flex items-center gap-3">
            <i><SlCalender size={20} className="text-gray-400 "/></i>
            <p className="font-bold text-gray-400 text-xl">Comming Soon</p>
          </div>
          <hr className="w-full mt-[85px] h-1 border-gray-800"/>
        </div>
        {/* ---------------------------------------------------------- */}

        <h1 className="py-8 text-gray-500 ml-5 font-bold">Following</h1>
          <div className="flex h-[350px] flex-col w-full gap-3  mt-[15px] overflow-y-auto">
          
          
         
          {user.map((nme)=>(
          <div className="flex gap-6 p-4 rounded-full ">
           
            <i><img src={nme.image} className=" w-[32px] h-[30px] text-white ml-4 "/></i>
            <p className="font-bold text-white w-[100px] ml-4 text-center text-md">{nme.firstName}</p>
         
          </div>
          ))}
          <h1 className="text-white">LogOut</h1>
            
            
        </div>

      </div>
      {/* --------------------------------------------------------------------------------------------------------------------------- */}

      {/* MAIN */}  
      <div className="w-full h-full flex flex-col overflow-y-scroll bg-black">

        <div className="w-full h-[150px]">

          <nav className="navbar w-full h-[85px] flex justify-between bg-black  items-center  top-0">
            <div className="w-full h-full flex items-center gap-6">
            <div className="flex ml-5">
              <div className="left-arrow fonundefinedt-bold text-xl"><AiOutlineLeft size={25} className="text-gray-500 "/></div>
              <div className="right-arrow"><AiOutlineRight  size={25} className="text-gray-500 "/></div>
            </div>

            <div className="search-bar relative ">
              <BsSearch size={20} className="absolute top-2 mt-1 left-3"/>

              <input type="text" placeholder="Search Everything" className="pl-9 bg-gray-700 w-[560px] h-[45px] rounded-xl" onChange={(e)=>setQuery(e.target.value)} onFocus={()=>setToogle(true)} />
              {toogle && search.length > 0 &&
               <div  className="absolute border z-10 w-full h-full">
                {
              search.map((item)=>(
              <Link  to={`/moviereview/${item.id}`} className="flex h-[50px] border border-black bg-gray-700 top-3 w-full">      
                      <img src={getImageUrl(item.poster_path)} alt="" className="w-5 h-5 rounded " />  
                      <p className="text-white">{item.title}</p>
              </Link>
 
              ))
            
             
                }
                 </div>
                 }
              
              
            </div>
            </div>

            <div className="right-icons  gap-6 flex flex-row">
              <div className="icon"><AiOutlineMessage size={25} className="text-white w-[56px] h-[35px]"/></div>
              <div className="icon"> <MdNotificationsActive size={25} className="text-white w-[56px] h-[35px]"/></div>
              <div className="icon"><CgProfile size={30} className="text-white w-[55px] h-[35px]"/></div>
            </div>
          </nav>

        </div>
        {/* image */}
        <div className="flex w-full h-full bg-black">

          <OwlCarousel className="owl-theme h-full   w-full py-6" {...options}>
      {nowPlaying?.map((moviesss) => (
        <div className="relative" key={moviesss.id}>
          <div className="h-[500px] border-[3px] border-red-700 rounded-3xl overflow-hidden relative m-9">
            <img
              src={getImg(moviesss.backdrop_path)}
              alt=""
              className="h-full w-full object-cover object-top"
            />
            {/* overlay */}
            <div className="absolute  top-0 left-0 bottom-0 right-0  text-center flex items-center    text-white">
              <h1 className="p-2 text-5xl mt-6 font-extrabold ">{moviesss.title}</h1>
            </div>  
          </div>
        </div>
      ))}
    </OwlCarousel>
          
        </div>

        {/* ---------------------------------- */}
        <div className="w-full h-full bg-black flex flex-col p-5">

          {/* --------------------------------------------- */}
          <div className="flex ">

          <h1 className="text-white font-bold text-2xl w-[345px] ">Trending Movies </h1>
          <div className="w-full h-full text-white font-bold text-2xl flex gap-4 items-center">

          <button className=   {`${dayWeek?"bg-blue-600":"bg-black"} w-[110px] h-[35px] rounded-md`} onClick={()=>setDayWeek(true)}>Day </button> 

          <button className={`${dayWeek?"bg-black":"bg-blue-600"} w-[110px] h-[35px] rounded-md`} onClick={()=>setDayWeek(false)}>Week</button>
          </div>
          </div>
          {/* ------------------------------------------------------ */}
          <div className="flex overflow-x-scroll h-[490px] w-full">

            {data.map((movie, index) => (
              

              <Link to={`/moviereview/${movie.id}`} key={index} className="w-[300px] shrink-0 p-5 mt-5 h-[350px]  rounded-md relative">
                <img
                  src={getImageUrl(movie.poster_path)}
                  alt={movie.title}
                  className="h-full w-full object-cover rounded-2xl overflow-hidden"
                />
                <h1 className="mt-8 text-white font-bold text-center ">{movie.title}</h1>
                <div className="absolute top-[300px] left-8 w-12 h-12 ">
                 <ProgressStatus percentage={movie.vote_average*10}/>
                </div>
              </Link>

             
              
            ))}
          </div>
        </div>

        {/*  Popular movies */}
        <div className="w-full h-full bg-black flex flex-col p-5">
          <h1 className="text-white font-bold text-2xl">Popular Movies</h1>
          <div className="flex overflow-x-scroll h-[490px] w-full">
            {popular.map((movies, index) => (

              <Link to={`/moviereview/${movies.id}`} key={index} className="w-[300px] shrink-0 p-5 mt-5 h-[350px]  rounded-md relative" >
                <img
                  src={getImageUrl(movies.poster_path)}
                  alt={movies.title}
                  className="h-full w-full object-cover rounded-2xl overflow-hidden"
                />
                <h1 className="mt-8 text-white font-bold text-center ">{movies.title}</h1>
                <div className="absolute top-[310px] left-8 w-12 h-12 ">
                <ProgressStatus percentage={movies.vote_average*10}/>
              </div>
              </Link>

            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
