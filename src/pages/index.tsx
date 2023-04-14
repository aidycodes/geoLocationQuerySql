import { type NextPage } from "next";
import Head from "next/head";
import { useStaticGeoLocation } from "~/hooks/useStaticGeolocation";
import { useGeolocation } from "~/hooks/useGeolocation";
import { useEffect, useState } from "react";
import { z } from "zod";
import { useRouter } from "next/router";
import Chat from "~/compo/chat";

const Body = z.object({
    lat: z.number(),
    lng: z.number(),
    r: z.number()
})



type Body = z.infer<typeof Body>

const Home: NextPage = () => {

  const [input, setInput] = useState('')
  const [pos, setPos] = useState({x:0, y:0})
  const [move, setMove] = useState(false)
  const [sender, setSender] = useState("");
  const router = useRouter();


  const data = useStaticGeoLocation()
  console.log(data)

  const post = async () => {
    if(data){
    try{
    const res = await fetch('/api/sendGeoPost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content:input,
        lat: 95.7129,
        lng: 37.0902,
        userId:'2'
      })
    })
    //const json = await res.json()!
   // console.log(json)
   //  lat: 59.2625564,
//        lng: 18.0857827,
  
  }catch(err){
    return err
  }
    }
  }

  interface Post {
  content: string,
  data:  object
  }

  const getGeoData = async () => {
    if(data){
   
     try{
    const res = await fetch('/api/postsnearme', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        lat:data.lat,
        lng: data.lng,
        r:100
      })
    })
    
  
    console.log(res.json())
        
  }catch(err){
    return err
  }
    }
  }
  
    const getInnerPosts = async () => {
    if(data){
     try{
    const res = await fetch('/api/getPostsInnerDistance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        lat: data.lat,
        lng: data.lng,
        r:1
      })
    })
  
    console.log(res.json())
        
  }catch(err){
    return err
  }
    }
  }


  const getOutterPosts = async () => {
    if(data){
     try{
    const res = await fetch('/api/getPostsOutterDistance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        lat: data.lat,
        lng: data.lng,
        r:1
      })
    })
  
    console.log(res.json())
        
  }catch(err){
    return err
  }
    }
  }



     const getUserPosts = async () => {  
     try{
      
    const res = await fetch('/api/getUserPosts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId:"2"
      })
    })
  
    console.log(res.json())
        
  }catch(err){
    return err
  }
    
  }

       const getPostWithReplies = async () => {  
     try{
      
    const res = await fetch('/api/getPostWithReplies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        postId:"bxc0oblkhyvpo9s5jz7jpr12"
      })
    })
  
    console.log(res.json())
        
  }catch(err){
    return err
  }
    
  }

  const getUsersRepliesAndPosts = async () => {  
     try{    
    const res = await fetch('/api/getUserRepliesAndPosts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId:"2"
      })
    })
  
    console.log(res.json())
        
  }catch(err){
    return err
  }    
}

const createUser = async () => {  
  if(data){
     try{    
    const res = await fetch('/api/createUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username:"2newnewnew",
        lat: data.lat,
        lng: data.lng,

      })
    })
     
    console.log(res.json())
        
  }catch(err){
    return err
  } 
}   
}

  const createReply = async () => {  
     try{    
    const res = await fetch('/api/makeReplieToPost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId:"2",
        postId:"bxc0oblkhyvpo9s5jz7jpr12",
        content:"new reply 2dayy"
      })
    })
  
    console.log(res.json())
        
  }catch(err){
    return err
  }    
}

  const FollowUser = async () => {  
     try{    
    const res = await fetch('/api/FollowUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId:"2",
        followingId:"33",
      })
    })
  
    console.log(res.json())
        
  }catch(err){
    return err
  }    
}

const userFeed = async () => {  
     try{    
    const res = await fetch('/api/getUserFeed', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId:"2",
        followingId:"33",
      })
    })
  
    console.log(res.json())
        
  }catch(err){
    return err
  }    
}




  useEffect(() => {
   fetch('/api/data').then((data) => data.json())
   .then((data) => console.log(data)).catch((err) => console.log(err))
  }, [])

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
       
      </Head>
      <main className="">
        GeoLocation Form   
         {JSON.stringify(data)}   
         <input onChange={(e) => setInput(e.target.value)}/>
         <button onClick={() =>{
          void post()
         }}>send data</button>
         <button onClick={() => {
          void getGeoData()}}>Get Data Near Me</button>
           <button style={{border:"black", padding:'2rem'}} onClick={() =>{
          void post()
         }}>send data</button>
         
          <div>
            <button onClick={() => {
          void getUserPosts()}}>get users Posts</button>
          </div>

            <div>
            <button onClick={() => {
          void getPostWithReplies()}}>Posts With Replies</button>
          </div>
          <div>
            <button onClick={() => {
          void getUsersRepliesAndPosts()}}>All Posts Replies For User</button>
          </div>

          <div>
            <button onClick={() => {
          void createUser()}}>Create User</button>
          </div>
          <div>
            <button onClick={() => {
          void createReply()}}>reply</button>
          </div>
           <div>
            <button onClick={() => {
          void getInnerPosts()}}>Inner Posts</button>
          </div>
              
          <div>
            <button onClick={() => {
          void getOutterPosts()}}>Outter Posts</button>
          </div>
          <div>
            <button onClick={() => {
          void FollowUser()}}>Follow User</button>
          </div>
          <div>
            <button onClick={() => {
          void userFeed()}}>User Feed</button>
          </div>
          <div>
            <h2>Username</h2>
            <input placeholder="username"  onChange={(e) => setSender(e.target.value)}></input>
       </div>
              <Chat sender={sender}/>

      </main>
    </>
  );
};

export default Home;
