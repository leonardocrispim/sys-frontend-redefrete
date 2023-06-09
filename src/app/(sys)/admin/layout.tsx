import MobileSidebar from './_layouts/MobileSidebar';
import DesktopSidebar from './_layouts/DesktopSidebar';
import TopBar from './_layouts/TopBar';

import '@app/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white">
      <MobileSidebar />
      <DesktopSidebar />

      <div className="lg:pl-72">
        <TopBar />
        <main className="py-5">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
