// create a custom document
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { Body } from 'ui/components';
import colors from 'ui/theme/colors';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="description" content="" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <meta name="theme-color" content={colors.surface} />
        </Head>
        <Body>
          <Main />
          <NextScript />
        </Body>
      </Html>
    );
  }
}

export default MyDocument;