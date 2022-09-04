import { useTheme } from 'ui/hooks'
import { Typography } from 'ui/components'
import React from "react";
import { useAmp } from 'next/amp';


const { Text, Title } = Typography
export default function Web() {
  
  const { theme } = useTheme()
  const isAmp = useAmp()
  
  return (
    <React.Fragment>
      <Title>{theme.colors.primary}</Title>
      <Text>Hello world</Text>
    </React.Fragment>
  );
}

export const config = { amp: true }