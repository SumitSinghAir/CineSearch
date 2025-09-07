import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app'

import '../styles/globals.css';
import "@/components/Navbar.css";
import "@/components/MovieList.css";

export default function App({ 
  Component, 
  pageProps: {
    session,
    ...pageProps
  }
}: AppProps) {
  return (
    <SessionProvider session={session}>
        <Component {...pageProps} />
    </SessionProvider>
  )
}
