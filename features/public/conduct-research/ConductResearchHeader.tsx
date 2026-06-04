"use client"
import { motion } from 'framer-motion'

const ConductResearchHeader = () => {
  return (
   <header className="flex flex-col items-center gap-3 mb-16 text-center">
  <motion.p
    className="text-xs font-semibold tracking-widest text-blue-500 uppercase"
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: false, amount: 0.3 }}>
      Explore Opportunities
  </motion.p>

  <motion.h2
    className="text-3xl md:text-4xl xl:text-5xl font-bold text-slate-800 leading-tight"
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay: 0.1 }}
    viewport={{ once: false, amount: 0.3 }}>
        Our <span className="text-blue-500">Research Hub</span>
  </motion.h2>

  <motion.p
    className="text-sm md:text-base text-slate-500 max-w-xl mt-1"
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay: 0.2 }}
    viewport={{ once: false, amount: 0.3 }}>
        Submit your ideas, find academic placements, connect with supervisors or student collaborators,
        and access the funding or tools you need to support your research.
  </motion.p>
</header>
  )
}

export default ConductResearchHeader