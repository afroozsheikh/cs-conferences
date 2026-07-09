import Nav from '@/components/nav'
import Footer from '@/components/footer'
import SubscribeForm from '@/components/subscribe-form'

export const metadata = {
  title: 'Get Email Alerts — CS Conference Alerts',
  description:
    'Subscribe to receive email reminders two weeks before CS conference deadlines.',
}

export default function SubscribePage() {
  return (
    <>
      <Nav />
      <main className="dot-field min-h-screen bg-bg">
        <div className="relative mx-auto max-w-3xl px-6 py-24">
          <div className="mb-16 text-center">
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-accent">
              Never miss a deadline
            </p>
            <h1 className="mb-4 font-display text-5xl text-text-primary">
              Get email <em className="italic text-accent">alerts.</em>
            </h1>
            <p className="mx-auto max-w-md text-text-secondary">
              We&rsquo;ll email you two weeks before each paper deadline for the conferences you select.
              No spam, unsubscribe anytime.
            </p>
          </div>
          <SubscribeForm />
        </div>
      </main>
      <Footer />
    </>
  )
}
