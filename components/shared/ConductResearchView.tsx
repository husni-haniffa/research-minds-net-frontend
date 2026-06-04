import Link from 'next/link'

const ExternalLinkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
)

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
    <h6 className="text-xs font-semibold uppercase tracking-widest text-slate-950 mb-3">
        {children}
    </h6>
)

const NotProvided = () => (
    <span className="text-slate-900 italic">Not provided</span>
)

const Divider = () => <hr className="border-slate-100" />

// ── Reusable contact info block ──────────────────────────────────────
export const ContactInfoSection = ({ mobile, whatsapp }: { mobile?: string; whatsapp?: string }) => (
    <div>
        <SectionLabel>Contact Info</SectionLabel>
        <div className="space-y-2">
            {[
                { label: 'Phone Number', value: mobile },
                { label: 'WhatsApp Number', value: whatsapp },
            ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between">
                    <span className="text-sm text-slate-900">{label}</span>
                    <span className="text-sm font-medium text-slate-950">
                        {value || <NotProvided />}
                    </span>
                </div>
            ))}
        </div>
    </div>
)

// ── Reusable social media block ──────────────────────────────────────
export const SocialMediaSection = ({
    email, linkedin, researchgate, orcid, scholar,
}: {
    email?: string; linkedin?: string; researchgate?: string; orcid?: string; scholar?: string;
}) => {
    const links = [
        { label: 'Email', href: email ? `mailto:${email}` : null },
        { label: 'LinkedIn', href: linkedin || null },
        { label: 'ResearchGate', href: researchgate || null },
        { label: 'ORCID', href: orcid || null },
        { label: 'Scholar', href: scholar || null },
    ]

    return (
        <div>
            <SectionLabel>Social Media</SectionLabel>
            <div className="flex flex-wrap gap-2">
                {links.map(({ label, href }) =>
                    href ? (
                        <Link
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-medium bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 px-3 py-1.5 rounded-full transition-colors"
                        >
                            {label}
                            <ExternalLinkIcon />
                        </Link>
                    ) : (
                        <span
                            key={label}
                            title="Not provided"
                            className="inline-flex items-center text-xs font-medium bg-slate-100 text-slate-400 px-3 py-1.5 rounded-full cursor-not-allowed"
                        >
                            {label}
                        </span>
                    )
                )}
            </div>
        </div>
    )
}

// ── Generic text field block ─────────────────────────────────────────
export const InfoField = ({ label, value }: { label: string; value?: string }) => (
    <div>
        <SectionLabel>{label}</SectionLabel>
        {value
            ? <p className="text-sm text-slate-950 leading-relaxed">{value}</p>
            : <p className="text-sm"><NotProvided /></p>
        }
    </div>
)

export { Divider }