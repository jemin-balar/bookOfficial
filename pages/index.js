import { SectionOne } from '@/Components/SectionOne'
import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>BookOfficial</title>
        <meta name="description" content="Welcome to BookOfficial" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen">
        <SectionOne />
      </main>
    </div>
  )
} 