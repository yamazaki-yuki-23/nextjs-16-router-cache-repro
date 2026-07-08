import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <h1>Next.js 16 router cache repro</h1>
      <p>
        <Link href="/articles?tag=react&tag=nextjs">/articles へ移動</Link>
      </p>
    </main>
  )
}
