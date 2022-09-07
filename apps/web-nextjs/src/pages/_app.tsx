import React, { useEffect, useLayoutEffect } from "react";
import { createBreakpoint } from "react-use";
import { ThemeProvider } from "ui";
import { breakpoint } from "@/styles";
import { persistor, wrapper } from "@/redux-state";
import { AppContext } from "next/app";
import { useDispatch } from "react-redux";
import { rdxScreenAction } from "@/redux-state/features/screen";
import { ScreenType } from "@/types";
import NextNProgress from "nextjs-progressbar";
import colors from "ui/theme/colors";

import { PersistGate } from "redux-persist/integration/react";
const useBreakpoint = createBreakpoint({ ...breakpoint })

const MainApp = ({ Component, pageProps }: { Component: any, pageProps: any }) => {
  const [isBrowser, setIsBrowser] = React.useState(false);

  const screenSize = useBreakpoint();
  const dispatch = useDispatch()

  useLayoutEffect(() => {
    dispatch(rdxScreenAction.setScreenType(screenSize as ScreenType))
  }, [screenSize])

  useEffect(() =>{
    setIsBrowser(true)
  },[])

  return (
    <ThemeProvider>
      <NextNProgress color={colors.primary} options={{ showSpinner: false }} />
      {isBrowser ? (
        <PersistGate persistor={persistor} loading={"Loading..."}>
          <Component {...pageProps} />
        </PersistGate>
      ) :
        <Component {...pageProps} />}
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
