import React, { useEffect, useState } from 'react'
import { detailsMovies } from '../API/tmbdApi';
import { useParams } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { AiOutlineLeft, AiOutlineMessage, AiOutlineRight } from 'react-icons/ai';
import { MdNotificationsActive } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';

export const Moviereview = () => {

  const[review,setReview]=useState([]) ;
  const {id} =useParams()

  useEffect(()=>{
    const detailMovie =async () =>{
      const result =await detailsMovies(id);
      setReview([result])
    };
    detailMovie();
  },[])
  console.log(review,"api");
  

  const getImg = (backdrop_path: any) => {
    return `https://image.tmdb.org/t/p/original/${backdrop_path}`;
  };


  return (
    <div className='w-screen h-screen bg-black text-white'>

      {/* NavBar  */}

       <nav className="navbar w-full h-[85px] flex justify-between bg-black  items-center  top-0">
            <div className="w-full h-full flex items-center gap-6">
            <div className="flex ml-5">
              <div className="left-arrow font-bold text-xl"><AiOutlineLeft size={25} className="text-gray-500 "/></div>
              <div className="right-arrow"><AiOutlineRight  size={25} className="text-gray-500 "/></div>
            </div>

            <div className="search-bar relative ">
              <BsSearch size={20} className="absolute top-2 mt-1 left-3"/>
              <input type="text" placeholder="Search Everything" className="pl-9 bg-gray-700 w-[560px] h-[45px] rounded-xl" />
            </div>
            </div>

            <div className="right-icons  gap-6 flex flex-row">
              <div className="icon"><AiOutlineMessage size={25} className="text-white w-[56px] h-[35px]"/></div>
              <div className="icon"> <MdNotificationsActive size={25} className="text-white w-[56px] h-[35px]"/></div>
              <div className="icon"><CgProfile size={30} className="text-white w-[55px] h-[35px]"/></div>
            </div>
          </nav>

        {/* Details Page */}

        <div className='w-screen h-[895px] bg-gray-900 relative'>
          {review?.map((mv)=>(
           <div className=' w-full h-full relative'>
              <img className='h-[600px] w-full bg-cover ' src={getImg(mv.backdrop_path)} alt="" />
            <div className=' flex   w-full h-full absolute top-0'>
                <h1 className='mt-7 text-6xl top-0  font-serif  font-bold text-white  '>{mv.title}</h1>
                {/* <p>{mv.overview}</p>
                <p>{mv.popularity}</p>
                <p>{mv.spoken_languages[0]?.name}</p> */}

                </div>
           </div>
          ))}

        </div>





    </div>
  )
}
