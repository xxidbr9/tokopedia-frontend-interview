export const cutString = (
  title: string,
  length: number = 10,
  endText = '....'
): string => (title.length >= length ? title.slice(0, length) + endText : title)
