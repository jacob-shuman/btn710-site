import type { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { tw } from 'twind';
import Card from '../components/Card';
import { authenticate } from '../utils/authenticate';
import ReactPlayer from 'react-player';

export const HomePage: NextPage = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { data, error } = useSWR(
    'btn710-swr',
    async () => await authenticate()
  );

  useEffect(() => {
    return () => {
      localStorage.removeItem('btn710-password');
    };
  }, []);

  useEffect(() => {
    if (router.isReady && (data || error)) {
      if (!error && data && data.status === 200) {
        setLoading(false);
      } else {
        localStorage.removeItem('btn710-password');
        router.replace('/');
      }
    }
  }, [router, data, error]);

  return (
    <main
      className={tw(
        `h-screen w-full bg-black p-4 text-white flex flex-col space-y-8`
      )}
    >
      {loading && (
        <h1 className={tw(`text-2xl font-bold`)}>Verifying Identity</h1>
      )}

      {!loading && (
        <>
          <h1 className={tw(`text-2xl font-bold`)}>BTN710 Group 5 Site</h1>

          <section className={tw(`flex flex-col flex-wrap space-y-4`)}>
            <div className={tw(`flex flex-col space-y-2`)}>
              <h1 className={tw(`text-xl font-bold`)}>Video Presentation</h1>

              <ReactPlayer
                playing={true}
                url="https://www.youtube.com/watch?v=7cg5d96PMOc"
              />
            </div>

            <a href="/report.pdf">
              <Card className={tw(`p-8`)}>Download Report</Card>
            </a>
          </section>
        </>
      )}
    </main>
  );
};

export default HomePage;
