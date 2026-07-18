// components/EnsureUserProvider.tsx
'use client';

import { useVerifyUser } from "@/hooks/verifyUser";

export function VerifyUserProvider({ children }: { children: React.ReactNode }) {
    useVerifyUser();
    return <>{children}</>;
}