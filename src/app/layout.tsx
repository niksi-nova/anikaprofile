import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata = { title: "My Art Portfolio" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      {/* No black background, no padding wrapper */}
      <body className="text-[rgb(36,36,36)]">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
