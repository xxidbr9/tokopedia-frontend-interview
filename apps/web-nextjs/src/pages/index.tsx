import { useTheme } from 'ui/hooks'
import { Typography } from 'ui/components'
import React from "react";

const { Text, Title } = Typography
export default function Web() {

  const { theme } = useTheme()

  return (
    <React.Fragment>
      <Title>{theme.colors.primary}</Title>
      <Text>Hello world</Text>
    </React.Fragment>
  );
}
