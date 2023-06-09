"use client";
import Image from "next/image";
import { useTheme } from "next-themes";

import { useState, useEffect } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const image =
    theme != "dark" ? "/images/light-bg.jpg" : "/images/dark-bg.png";
  // const image = "/images/manutencao.jpg";

  return (
    <main
      className="relative flex flex-1 flex-col overflow-hidden px-4 py-8 sm:px-6 lg:px-8 bg-cover bg-center-top min-h-full"
      style={{ backgroundImage: `url(${image})` }}
    >
      {children}
    </main>
  );
}
