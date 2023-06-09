import { ThemeTypeProvider } from '@/contexts/ThemeContext';
import { GlobalsTypeProvider } from '@/contexts/GlobalsContext';

import "./globals.css";

export const metadata = {
  title: 'Sistema de Gerenciamento - Redefrete',
  description: 'Rede Frete',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //
  return (
    <html lang="pt-br" className="h-full">
      <body className="font-sans antialiased  text-gray-600 min-h-full h-full flex flex-col [overflow-anchor:none]">
        <ThemeTypeProvider>
          <GlobalsTypeProvider>{children}</GlobalsTypeProvider>
        </ThemeTypeProvider>
      </body>
    </html>
  );
}
