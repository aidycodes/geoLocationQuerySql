import { type NextPage } from "next";
import Head from "next/head";
import { useStaticGeoLocation } from "~/hooks/useStaticGeolocation";
import { useGeolocation } from "~/hooks/useGeolocation";
import { useEffect, useState } from "react";
import { z } from "zod";

const Body = z.object({
    lat: z.number(),
    lng: z.number(),
    r: z.number()
})

type Body = z.infer<typeof Body>

const Home: NextPage = () => {

  const [input, setInput] = useState('')

  const data = useStaticGeoLocation()
  console.log(data)

  const post = async () => {

    try{
    const res = await fetch('http://localhost:3000/api/geo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        input,
        data
      })
    })
    //const json = await res.json()!
   // console.log(json)
    
  }catch(err){
    return err
  }

  }

  interface Post {
  content: string,
  data:  object
  }

  const getGeoData = async () => {
     try{
    const res = await fetch('http://localhost:3000/api/postsnearme', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        lat: data.lat,
        lng: data.lng,
        r:100
      })
    })
     
    console.log(res.json())
     
  }catch(err){
    return err
  }

  }
  


  

  useEffect(() => {
   fetch('http://localhost:3000/api/data').then((data) => data.json())
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
      </main>
    </>
  );
};

export default Home;
