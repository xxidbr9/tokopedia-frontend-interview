import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect, useRef } from "react";
import { createBreakpoint } from "react-use";
import { ThemeProvider } from "ui";
import { breakpoint } from "@/styles";
import { persistor, wrapper } from "@/redux-state";
import { AppContext } from "next/app";
import { useDispatch } from "react-redux";
import { rdxScreenAction } from "@/redux-state/features/screen";
import { ScreenType } from "@/types";
import { ToastContainer } from 'react-toastify';
import NextNProgress from "nextjs-progressbar";
import colors from "ui/theme/colors";

import { PersistGate } from "redux-persist/integration/react";
import { InstallPrompt } from '@/components/install-prompt';
import getMobileOS, { MobileDeviceOS } from '@/utils/helpers/user-device';
import { useSession } from '@/utils/hooks';


const useBreakpoint = createBreakpoint({ ...breakpoint })

const MainApp = ({ Component, pageProps }: { Component: any, pageProps: any }) => {
  const [isBrowser, setIsBrowser] = React.useState(false);
  const [mobileDevice, setMobileDevice] = React.useState<MobileDeviceOS>("unknown");
  
  
  const screenSize = useBreakpoint();
  const dispatch = useDispatch()
  
  const isMobile = screenSize === "mobile" || screenSize === "tablet"
  
  useEffect(() => {
    dispatch(rdxScreenAction.setScreenType(screenSize as ScreenType))
  }, [screenSize, dispatch])
  
  useEffect(() => {
    setIsBrowser(true)
    setMobileDevice(getMobileOS());
  }, [])
  
  // install prompt event
  const [isPromptReady, setIsPromptReady] = React.useState(false)
  const [isInstallPromptDismiss, setIsInstallPromptDismiss] = useSession("isUserDismissed", false);

  const deferredPrompt = useRef<BeforeInstallPromptEvent>(null)
  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      deferredPrompt.current = e;
      console.log(`'beforeinstallprompt' event was fired.`);
      setIsPromptReady(true)
    });
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt.current) {
      deferredPrompt.current.prompt();
      const { outcome } = await deferredPrompt.current.userChoice;
      console.log(`User response to the install prompt: ${outcome}`);
      deferredPrompt.current = null;
      setIsPromptReady(false)
      setIsInstallPromptDismiss(true)
    }
  };

  const handleDismissInstall = () => {
    setIsPromptReady(false);
    setIsInstallPromptDismiss(true)
  };

  return (
    <ThemeProvider>
      <NextNProgress color={colors.primary} options={{ showSpinner: false }} />
      {isBrowser ? (
        <PersistGate persistor={persistor} loading={"Loading..."}>
          <Component {...pageProps} />
          {isPromptReady && !isInstallPromptDismiss && (
            <InstallPrompt
              isMobile={isMobile}
              isAppleDevice={!isBrowser || mobileDevice === "iOS"}
              onDismiss={handleDismissInstall}
              onInstall={handleInstall}
            />
          )}
        </PersistGate>
      ) :
        <Component {...pageProps} />
      }
      <ToastContainer
        position={isMobile ? "bottom-center" : "bottom-left"}
        autoClose={2000}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        draggablePercent={60}
        draggableDirection="y"
        toastStyle={{
          background: colors.surface,
          ...(isMobile ? { bottom: "100px", margin: "0 20px", zIndex: 999 } : {})
        }}
        progressStyle={{
          accentColor: colors.primary,
        }}
      />
    </ThemeProvider>
  );
}

MainApp.getInitialProps = wrapper.getInitialAppProps(
  store =>
    async ({ Component, ctx }: AppContext) => {
      return {
        pageProps: {
          ...(Component.getInitialProps
            ? await Component.getInitialProps({ ...ctx, store })
            : {}),
          pathname: ctx.pathname,
        },
        creator: {
          url: 'https://github.com/xxidbr9',
          name: 'Barnando Akbarto Hidaytullah',
          email: 'barnando13@gmail.com',
        },
      }
    }
)

export default wrapper.withRedux(MainApp)

