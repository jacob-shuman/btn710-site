import type { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { tw } from 'twind';
import Card from '../components/Card';
import { authenticate } from '../utils/authenticate';

export const PasswordProtectedPage: NextPage = () => {
  const [password, setPassword] = useState<string>('');
  const [formError, setFormError] = useState<string | undefined>();
  const router = useRouter();

  return (
    <main
      className={tw(
        `h-screen w-full bg-black p-4 text-white flex flex-col space-y-8`
      )}
    >
      <div className={tw(`flex flex-col space-y-2`)}>
        <h1 className={tw(`text-2xl font-bold`)}>
          Please Login Before Continuing
        </h1>

        {formError && (
          <h3
            className={tw(
              `font-bold font-italic`,
              formError && tw`text-red-400`
            )}
          >
            {formError}
          </h3>
        )}
      </div>

      <form
        onSubmit={async (e) => {
          e.preventDefault();

          const data = await authenticate(password);

          if (data && data.status === 200) {
            localStorage.setItem('btn710-password', password);
            router.replace('/home');
          } else {
            setFormError('Invalid Credentials');
          }
        }}
      >
        <section className={tw(`flex flex-col space-y-2`)}>
          <h2
            className={tw(
              `text-lg font-semibold`,
              formError && tw`text-red-400`
            )}
          >
            Password
          </h2>

          <input
            type="password"
            placeholder="••••••••••••••"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            className={tw(
              `rounded-lg bg-transparent border-2 p-2`,
              formError && tw`border-red-400 text-red-400 placeholder-red-400`
            )}
          />

          <Card type="submit" className={tw(`px-4 py-2`)}>
            Login
          </Card>
        </section>
      </form>
    </main>
  );
};

export default PasswordProtectedPage;
