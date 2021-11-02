import type { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { tw } from 'twind';
import Card from '../components/Card';
import { authenticate } from '../utils/authenticate';

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

          <section className={tw(`flex flex-wrap`)}>
            <Card className={tw(`p-8`)}>Video Presentation</Card>
          </section>
        </>
      )}
    </main>
  );
};

export default HomePage;
