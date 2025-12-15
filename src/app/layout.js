import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Goodreads Reimagined",
  description: "A modern redesign built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        
        {/* Detailed Footer with Mock Notice */}
        <footer className="bg-primary-dark/30 border-t border-white/5 mt-20">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <h4 className="text-white font-bold mb-4">Goodreads Redesign</h4>
                <p className="text-sm text-primary-light leading-relaxed">
                  A conceptual reimagining of the world's largest site for readers and book recommendations. Built with Next.js, Tailwind CSS, and Firebase.
                </p>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4">Connect</h4>
                <ul className="text-sm text-primary-light space-y-2">
                  <li><a href="#" className="hover:text-accent">GitHub Repo</a></li>
                  <li><a href="#" className="hover:text-accent">Portfolio</a></li>
                  <li><a href="#" className="hover:text-accent">Contact Developer</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4">Disclaimer</h4>
                <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                  <p className="text-xs text-primary-light italic">
                    This is a <strong>mock project</strong> created for portfolio purposes. 
                    It is not affiliated with, endorsed by, or connected to Goodreads, Inc. or Amazon. 
                    All book covers and data are used for demonstration only.
                  </p>
                </div>
              </div>
            </div>
            <div className="text-center pt-8 border-t border-white/5 text-xs text-primary-light/50">
              © {new Date().getFullYear()} Mock Project. Designed & Developed by You.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}