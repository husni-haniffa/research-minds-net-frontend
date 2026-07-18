import { Mail, MessageCircle, AlertTriangle, MessageSquare, HelpCircle } from 'lucide-react'

const categories = [
  {
    icon: AlertTriangle,
    title: 'Technical Issue',
    description:
      'Something not working as expected — a broken submission, login trouble, or an error on the platform.',
    email: 'researchmindsnetlk@gmail.com',
    whatsapp: '94713320561',
  },
  {
    icon: MessageSquare,
    title: 'Feedback',
    description:
      'Suggestions on how we can improve the platform, or news and events you\'d like to see featured.',
    email: 'researchmindsnetlk@gmail.com',
    whatsapp: '94713320561',
  },
  {
    icon: HelpCircle,
    title: 'General Question',
    description:
      'Anything about how ResearchMindsNet works, submission guidelines, or your account.',
    email: 'researchmindsnetlk@gmail.com',
    whatsapp: '94713320561',
  },
]

const HelpPage = () => {
  return (
    <section className="mx-auto max-w-3xl px-6 pt-16 pb-24">
      <header className="text-center">
        <p className="text-xs font-semibold tracking-widest text-blue-500 uppercase">
          We&apos;re here to help
        </p>
        <h1 className="mt-3 text-3xl md:text-4xl font-bold text-slate-950">
          Help &amp; Feedback
        </h1>
        <p className="mt-3 text-sm md:text-base text-slate-500 max-w-xl mx-auto">
          Whatever brought you here, reach out directly and our team will get back to you.
        </p>
      </header>

      <div className="mt-14 grid gap-4 sm:grid-cols-3">
        {categories.map(({ icon: Icon, title, description, email, whatsapp }) => (
          <div
            key={title}
            className="flex flex-col rounded-xl border border-slate-100 p-5 text-center"
          >
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
              <Icon className="h-5 w-5 text-blue-500" />
            </div>
            <h3 className="mt-3 text-sm font-semibold text-slate-950">{title}</h3>
            <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">{description}</p>

            <div className="mt-4 flex flex-col gap-2 pt-1 mt-auto">
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-blue-200 bg-white px-3 py-2 text-xs font-medium text-blue-600 transition-colors hover:bg-blue-50"
              >
                <Mail className="h-3.5 w-3.5" />
                <span>Email</span>
              </a>

              <a
                href={`https://wa.me/${whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-emerald-500 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-emerald-600"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        ))}
      </div>

  <p className="mt-8 text-center text-xs text-slate-400">
    We typically respond within 1–2 business days.
  </p>
    </section >
  )
}

export default HelpPage