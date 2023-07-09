import axios from "axios"


const API_KEY=import.meta.env.VITE_API_KEY

export const fetchTrending = async()=>{
   
try{
   const {data}=await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`)
   return data;
   console.log(data);
   
}catch(err){
 console.log(err);
 
}

}
export const fetchTrendingWeek = async()=>{
    
try{
   const {data}=await axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`)
   return data;
   console.log(data);
   
}catch(err){
 console.log(err);
 
}

}

// Weeeklytrending movies

export const fetchWeeklyTrending =async()=>{
    const API_KEY="5b4ddce292ad0b69797b0d0386f0ad0c"
    try{
        const {data} =await axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`);
        return data;


    }catch(err){
        console.log(err);
        
    }

}

// popular movies api

export const popularMovies =async()=>{
      const API_KEY="5b4ddce292ad0b69797b0d0386f0ad0c";
      try{
        const {data} =await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
        return data;

      }catch(err){
        console.log(err);
        
      }


}

// now palying movies 

export const nowPlayingMovies =async ()=>{
    const API_KEY="5b4ddce292ad0b69797b0d0386f0ad0c";
    try{
        const {data} =await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`)
        return data;

    }catch(err){
        console.log(err);
        
    }
}
// users api fetching


export const fetchUser = async ()=>{
    try {
      const {data} = await axios.get(`https://dummyjson.com/users`)
    //   console.log(data,"ffffffff");
      return data
    } catch (error) {
      console.log(error);
    }
  }

// movies details

export const detailsMovies =async (id:number)=>{
  const API_KEY="5b4ddce292ad0b69797b0d0386f0ad0c";
  try{
    const {data} =await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
    return data

  }catch(err){
    console.log(err);
    
  }
}