// src/app/layout.tsx
import "./globals.css";

export const metadata = { title: "My Art Portfolio" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>

        {/* Load fonts once at layout level */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Londrina+Sketch&family=The+Girl+Next+Door&family=Libertinus+Keyboard&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="text-[rgb(36,36,36)]">
        {/* Navbar removed intentionally for new 2-page layout */}
        {children}
      </body>
    </html>
  );
}
