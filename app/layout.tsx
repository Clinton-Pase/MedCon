import { Sidebar } from "@/components/sidebar";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="flex">
          <Sidebar />
         <main className="flex-1 min-h-screen bg-gray-50 p-4 pt-20 md:p-8 md:pt-8 md:ml-20">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}