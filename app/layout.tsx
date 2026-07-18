import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
// @ts-ignore: allow side-effect css import without module declaration
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ClientProviders from "@/components/shared/ClientProviders";
import { Toaster } from "sonner";
import { VerifyUserProvider } from "@/components/shared/VerifyUserProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: ['400', '600'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Research Minds Net",
  description: "Where researchers connect, ideas grow, and innovation begins.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${poppins.className} ${geistSans.variable} ${geistMono.variable} antialiased max-w-full`}>
          <ClientProviders>
            <VerifyUserProvider>
              {children}
            </VerifyUserProvider>
          </ClientProviders>
          <Toaster position="top-center" richColors />
        </body>
      </html>
    </ClerkProvider>
  );
}
