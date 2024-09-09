import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavBar from "./components/NavBar";
import { ApiContextProvider } from "./contexts/ApiContext";
// import TestComponent from "./components/TestComponent";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "SumArit",
  description: "Juego de suma y resta aritmética",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-base-100 min-h-dvh max-h-dvh flex flex-col`}
      >
        <NavBar></NavBar>
        <ApiContextProvider>
          {/* <TestComponent></TestComponent> */}
          {children}
        </ApiContextProvider>
      </body>
    </html>
  );
}
