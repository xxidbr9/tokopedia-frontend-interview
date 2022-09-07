import React from "react";
import { useAmp } from 'next/amp';
import { withApollo } from '@/utils/hooks/useApollo';
import Head from 'next/head';
import { HomeTemplate } from '@/components/templates';
import Meta from "@/components/meta";

type HomePageProps = {
  randomTrendPage: number
}

function HomePage(props: HomePageProps) {
  const isAmp = useAmp()

  return (
    <React.Fragment>
      <Meta />
      <HomeTemplate randomTrendPage={props.randomTrendPage} page={1} />
    </React.Fragment>
  )
}

HomePage.getInitialProps = async () => {
  const randomTrendPage = Math.floor(Math.random() * 10) + 1 | 1
  return { randomTrendPage }
}

export const config = { amp: 'hybrid' }
export default withApollo(HomePage);
