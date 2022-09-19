import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AppProps } from 'next/app';
import { Navbar } from '../components/Navbar';

import '../styles/variables.css';
import '../styles/globals.css';
import '../styles/fonts.css';

import styles from './_app.module.css';
import { MetaTags } from '../components/MetaTags/MetaTags';

const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => (
  <QueryClientProvider client={queryClient}>
    <MetaTags />

    <div className={styles.pageWrapper}>
      <Navbar />
      <div className={styles.content}>
        <Component {...pageProps} />
      </div>
    </div>
  </QueryClientProvider>
);

export default App;
