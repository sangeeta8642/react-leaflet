// src/app/page.js

import Head from 'next/head';
import MapComponent from './components/Map';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Map with React Leaflet</title>
        <meta name="description" content="Map with React Leaflet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/* <h1>React Leaflet Map</h1> */}
        <MapComponent />
      </main>

      <footer>
        {/* <p>Powered by Next.js</p> */}
      </footer>
    </div>
  );
}
