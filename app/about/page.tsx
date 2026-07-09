import Image from 'next/image'
import Nav from '@/components/nav'
import Footer from '@/components/footer'

export const metadata = {
  title: 'About — CS Conference Alerts',
}

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-3xl px-6 py-24">
        <p className="mb-4 font-mono text-xs uppercase tracking-widest text-accent">
          About this site
        </p>
        <h1 className="mb-8 font-display text-5xl text-text-primary">
          Centre for Applied AI,<br />
          <em className="italic text-accent">Macquarie University.</em>
        </h1>
        <Image
          src="/logo.jpg"
          alt="Centre for Applied AI — Macquarie University"
          width={72}
          height={72}
          className="mb-8 rounded-xl"
        />
        <div className="space-y-4 leading-relaxed text-text-secondary">
          <p>
            CS Conference Alerts is maintained by the{' '}
            <strong className="text-text-primary">Centre for Applied AI</strong> at Macquarie University.
            We track upcoming computer science conference deadlines, venues, and CORE rankings to help
            researchers stay on top of submission windows.
          </p>
          <p>
            The site covers conferences across machine learning, computer vision, NLP, health informatics,
            data mining, security, software engineering, robotics, and cloud computing.
          </p>
          <p>
            To suggest a missing conference or report an error, please{' '}
            <a href="mailto:applied-ai@mq.edu.au" className="text-accent hover:underline">
              get in touch
            </a>
            .
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
