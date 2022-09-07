import { ROUTE_CONSTANTS } from "../constants"
import type { RoutesType } from "../constants/routes.constant"

export function slugGenerator(text: string): string {
  text = text.replace(/^\s+|\s+$/g, '')
  text = text.toLowerCase()
  text = text
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
  return text
}

export default slugGenerator

export const createSlugLink = (
  path: RoutesType = ROUTE_CONSTANTS.HOME,
  title: string,
  id: string | number
) => {

  let slugPath = `/${slugGenerator(title)}/${id}`

  const result = path === ROUTE_CONSTANTS.HOME ? slugPath : path + slugPath
  return result
}