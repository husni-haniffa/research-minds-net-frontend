// hooks/useEnsureUser.ts
'use client';
import { useAuth } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';

export function useVerifyUser() {
    const { isLoaded, isSignedIn, getToken, userId } = useAuth();

    return useQuery({
        queryKey: ['verify-user', userId],
        queryFn: async () => {
            const token = await getToken();
            const res = await fetch(`${process.env.NEXT_PUBLIC_API}/users/verify`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error('Failed to ensure user');
            return res.json();
        },
        enabled: isLoaded && isSignedIn,
        staleTime: Infinity,
        gcTime: Infinity,
        retry: 2,
    });
}