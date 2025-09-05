import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata = { title: "My Art Portfolio" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Tailwind CDN (you had this already) */}
        <script src="https://cdn.tailwindcss.com"></script>

        {/* Preconnect + Google Fonts (Libertinus Keyboard + The Girl Next Door) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Libertinus+Keyboard&family=The+Girl+Next+Door&display=swap"
          rel="stylesheet"
        />
      </head>

      {/* Do not set a background color here — pages control their own backgrounds */}
      <body className="text-[rgb(36,36,36)]">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
