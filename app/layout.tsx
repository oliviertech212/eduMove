
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "./_components/ClientLayout";
import { Toaster } from "@/components/ui/sonner"
import { Header } from "./_components/landing-page";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Keep metadata here
export const metadata: Metadata = {
  title: "Transforming School Transportation",
  description: "Revolutionizing the way students get to school",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-clash`}
      >
        <Toaster
          position="top-right"
        
         
          toastOptions={{
            duration: 5000,
            
          }}
         /> 

        <Header/>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
