import Head from 'next/head';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.scss';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <main className={`${styles.main} ${inter.className}`}>
        <Link href="/jobs">
          <button className="btn btn-primary">Go to jobs page</button>
        </Link>
      </main>
    </>
  )
}
