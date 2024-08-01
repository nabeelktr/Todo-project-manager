import { Barlow } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ModalProvider } from "../hooks/useModal";
import { SocketProvider } from "../providers/socketProvider";
import { ReduxProvider } from "../providers/reduxProvider";
import { DrawerProvider } from "@/contexts/DrawerContext";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Barlow",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${barlow.variable}`}>
        <ReduxProvider>
          <div className="min-w-full min-h-screen overflow-hidden text-black">
            <ModalProvider>
              <SocketProvider>
                <DrawerProvider>
                  {children}
                  <Toaster position="top-center" />
                </DrawerProvider>
              </SocketProvider>
            </ModalProvider>
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
