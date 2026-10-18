import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { MenuProvider } from "@/contexts/menuContext";
import {
  ConfirmModalProvider,
  ErrorModalProvider,
  SuccessModalProvider,
} from "@/contexts/modalContext";
import "./globals.css";
import { ConfirmModal, ErrorModal, SuccessModal } from "@/ui/feedback";
import { ParamsProvider } from "@/contexts/paramsContext";
import Script from "next/script";
import TawkChat from "@/ui/TawkChat";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <MenuProvider>
          <SuccessModalProvider>
            <ErrorModalProvider>
              <ConfirmModalProvider>
                <ParamsProvider>
                  <Header />
                  {children}
                  <TawkChat />
                  <SuccessModal />
                  <ErrorModal />
                  <ConfirmModal />
                  <Footer />
                </ParamsProvider>
              </ConfirmModalProvider>
            </ErrorModalProvider>
          </SuccessModalProvider>
        </MenuProvider>
      </body>
    </html>
  );
}
