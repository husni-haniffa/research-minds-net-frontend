import { Check } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { container, item } from '@/lib/animation'
import { usePlans } from './plan.hooks'
import PlanCardSkeleton from './Skeleton'
import { AlertError } from '@/components/ui/alert-error'

const MembershipPlanCard = () => {

    const { data, isLoading, isError, error } = usePlans()

    if(isLoading) return <PlanCardSkeleton/>

    if(isError) return <AlertError message={error?.message ?? 'Something went wrong.'}/>

  return (
    <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-9"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}>
        {data?.map((plan) => (
            <motion.div 
                className='border bg-white p-6 rounded-2xl shadow' 
                key={plan._id}
                variants={item}
            >
                <span className='uppercase text-xs lg:text-sm text-slate-950 font-semibold'>{plan.name}</span>
                <h1 className='mt-3 text-xl lg:text-2xl font-bold mb-3 text-slate-950'>
                    <span className='text-sm lg:text-base font-semibold mr-3'>{plan.currency}</span>
                    {plan.price}
                    <span className='text-xs lg:text-sm ml-1.5 text-slate-600 font-normal'>/ {plan.billing_period}</span>
                </h1>
                <span className='text-sm lg:text-base text-slate-500'>{plan.trial_days} days free</span>
                <div className='mt-3'>
                    {plan.features.map((feature, index) => (
                        <div key={index} className='flex items-center gap-3 text-sm lg:text-base'>
                            <Check className='w-5 h-5 bg-green-100 rounded-full px-0.5 py-0.5 text-green-700'/>
                            {feature}
                        </div>
                    ))}
                </div>
                <div className='mt-12 flex w-full'>
                    <Link className='bg-blue-600 text-white px-4 py-2 rounded-lg w-full text-center' href={'/'}>
                        Get Started
                    </Link>
                </div>
            </motion.div>
        ))}
    </motion.div>
  )
}

export default MembershipPlanCard