import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "./componentes/Navigation";
// import AirplaneScrollContrail from "./components/AirplaneScrollContrail"; // Descomenta isto quando criares o componente do rasto

const inter = Inter({ subsets: ["latin"] });

// O SEO do teu site!
export const metadata: Metadata = {
  title: "Lusofly Academy",
  description: "Formamos os comandantes do amanhã com tecnologia de ponta, segurança rigorosa e uma frota moderna.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} bg-slate-50 text-slate-900 overflow-x-hidden`}>
        
        <Navigation />

        {/* O rasto global do scroll */}
        {/* <AirplaneScrollContrail /> */}

        <main>
          {children}
        </main>
        
      </body>
    </html>
  );
}