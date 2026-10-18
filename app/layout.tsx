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
                  <Script id="tawk-to" strategy="afterInteractive">
                    {`var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/6ad3f70dceb41f34ca74923d/1k55vq3ks';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();`}
                  </Script>
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
