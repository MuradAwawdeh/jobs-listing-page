import Head from 'next/head';
import Header from './partials/Header';
import styles from '@/styles/Layout.module.scss';

export default function Layout({ children }) {
    return (
      <>
        <Head>
          <title>Jobs Page Listings</title>
          <meta name="description" content="Jobs Page Listings" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className={styles.container}>
          <Header />
          <main>{children}</main>
        </div>
      </>
    )
  }