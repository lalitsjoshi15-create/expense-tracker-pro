import './globals.css';
import Sidebar from '@/components/Sidebar';

export const metadata = {
  title: 'Expense Tracker | Next-Gen Finance Dashboard',
  description: 'AI-powered, immersive financial tracking dashboard.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="app-layout">
          <Sidebar />
          <main className="main-content">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
