import Nav from '@/components/nav'
import Hero from '@/components/hero'
import Footer from '@/components/footer'
import HomeClient from '@/components/home-client'
import SubscribeForm from '@/components/subscribe-form'
import { conferences } from '@/data/conferences'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <HomeClient conferences={conferences} />

        {/* Email alerts section */}
        <section className="dot-field mt-8 border-t border-border bg-bg">
          <div className="relative mx-auto max-w-3xl px-6 py-24 text-center">
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-accent">
              Never miss a deadline
            </p>
            <h2 className="mb-4 font-display text-4xl text-text-primary">
              Get email <em className="italic text-accent">alerts.</em>
            </h2>
            <p className="mx-auto mb-10 max-w-md text-text-secondary">
              We&rsquo;ll email you two weeks before each paper deadline for the conferences you care about.
            </p>
            <SubscribeForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
