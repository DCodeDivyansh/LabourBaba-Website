import "./globals.css";
import FCMProvider from "@/components/FCMProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <FCMProvider>
          <div className="mobile-container">
            {children}
          </div>
        </FCMProvider>
      </body>
    </html>
  );
}