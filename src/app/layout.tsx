import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CYBERVERSE | Global Cyber Defense Metropolis",
  description:
    "The World's First Interactive 3D Cyber Defense Metropolis. Step into the future of cybersecurity.",
  keywords: [
    "cybersecurity",
    "3D website",
    "cyber defense",
    "metaverse",
    "portfolio",
    "Three.js",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="h-full overflow-hidden bg-[#050508]">
        {children}
      </body>
    </html>
  );
}
