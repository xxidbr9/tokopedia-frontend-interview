// create _app nextjs component in typescript
import React from "react";
import { ThemeProvider } from "ui";

const App = ({ Component, pageProps }: { Component: any, pageProps: any }) => {
  return (
    <ThemeProvider>
        <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default App;
