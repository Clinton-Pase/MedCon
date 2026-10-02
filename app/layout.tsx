import { Sidebar } from "@/components/sidebar";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="flex">
          <Sidebar />
          <main className="flex-1 min-h-screen bg-gray-50 p-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}