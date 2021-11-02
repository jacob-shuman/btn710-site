import type { NextPage } from 'next';
import { tw } from 'twind';

const Home: NextPage = () => {
  return (
    <div
      className={tw(`text-white bg-black w-full h-screen text-2xl font-bold`)}
    >
      Next.js + Typescript + Twind + Netlify Template
    </div>
  );
};

export default Home;
