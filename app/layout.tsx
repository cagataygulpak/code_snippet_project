import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { SnippetProvider } from "./context/SnippetContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DevArchive - Kod Snippet Yöneticisi",
  description: "Kişisel kod parçacığı yöneticisi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <SnippetProvider>
          {children}
        </SnippetProvider>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          limit={3}
          theme="light" />
      </body>
    </html>
  );
}