import React from 'react'
import Text from './typography-text'
import Title from './typography-title'

interface TypographyProps {
  Title: typeof Title
  Text: typeof Text
}

const Typography: TypographyProps = {
  Title,
  Text,
}

export default Typography