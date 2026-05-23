import MembershipPlanCard from '@/features/public/membership/MembershipPlanCard'
import { container } from '@/lib/animation'
import { motion } from 'framer-motion'

const Membership = () => {
  return (
    <section className='pt-16 xl:pt-24 pb-24'>
        <header className="flex flex-col items-center gap-3 mb-16 text-center">
            <motion.p
                className="text-xs font-semibold tracking-widest text-blue-500 uppercase"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: false, amount: 0.3 }}>
                Become a member
            </motion.p>
            <motion.h2
                className="text-3xl md:text-4xl xl:text-5xl font-bold text-slate-800 leading-tight"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                viewport={{ once: false, amount: 0.3 }}>
                Our <span className="text-blue-500">Pricing</span>
            </motion.h2>
            <motion.p
                className="text-sm md:text-base text-slate-400 max-w-xl mt-1"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: false, amount: 0.3 }}>
                A collaborative platform empowering researchers, students, and academics to publish, connect, and grow together.
            </motion.p>
        </header>
        <div>
            <MembershipPlanCard/>
        </div>
    </section>
  )
}

export default Membership