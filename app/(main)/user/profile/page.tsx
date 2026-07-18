'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'

const UserProfilePage = () => {
    const { isLoaded, isSignedIn, user } = useUser()
    const router = useRouter()

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            router.replace('/')
        }
    }, [isLoaded, isSignedIn, router])

    if (!isLoaded || !isSignedIn) {
        return (
            <div className="flex items-center justify-center py-24">
                <div className="relative h-12 w-12">
                    <div className="absolute inset-0 rounded-full border-4 border-blue-500/20" />
                    <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-blue-500" />
                </div>
            </div>
        )
    }

    const primaryEmail = user.primaryEmailAddress?.emailAddress
    const primaryPhone = user.primaryPhoneNumber?.phoneNumber

    return (
        <div className="container mx-auto mt-16 py-6 rounded-2xl bg-white">
            <h1 className="text-xl font-semibold text-slate-950">Your Account</h1>

            <div className="mt-6 space-y-4">
                <div className="rounded-lg border border-slate-100 p-4">
                    <p className="text-lg font-bold uppercase tracking-wide text-blue-500">Name</p>
                    <p className="mt-1 text-base text-slate-950">{user.fullName ?? '—'}</p>
                </div>

                <div className="rounded-lg border border-slate-100 p-4">
                    <p className="text-lg font-bold uppercase tracking-wide text-blue-500">Email</p>
                    <p className="mt-1 text-base text-slate-950">{primaryEmail ?? '—'}</p>
                </div>

                {primaryPhone && (
                    <div className="rounded-lg border border-slate-100 p-4">
                        <p className="text-lg font-bold uppercase tracking-wide text-blue-500">Phone number</p>
                        <p className="mt-1 text-base text-slate-950">{primaryPhone}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default UserProfilePage