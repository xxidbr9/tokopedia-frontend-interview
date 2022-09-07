import * as React from "react"
import { SVGProps } from "react"

const SearchIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1 10.5a9.5 9.5 0 1 1 16.887 5.973l3.674 3.673a1 1 0 0 1-1.415 1.415l-3.673-3.674A9.46 9.46 0 0 1 10.5 20 9.5 9.5 0 0 1 1 10.5ZM10.5 3a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15Z"
      fill={props.color || "#A4A4A4"}
    />
  </svg>
)

export default SearchIcon
