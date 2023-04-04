import { type NextPage } from "next";
import Head from "next/head";
import { useStaticGeoLocation } from "~/hooks/useStaticGeolocation";
import { useGeolocation } from "~/hooks/useGeolocation";

const Home: NextPage = () => {

  const data = useStaticGeoLocation()
  console.log(data)
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
      </main>
    </>
  );
};

export default Home;
