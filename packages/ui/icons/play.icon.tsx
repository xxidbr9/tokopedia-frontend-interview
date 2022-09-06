/* eslint-disable */
import * as React from "react"
import { SVGProps } from "react"

const PlayIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8.5 5.072a1 1 0 0 0-1.5.866v12.124a1 1 0 0 0 1.5.866L19 12.866a1 1 0 0 0 0-1.732L8.5 5.072Z"
      fill={props.color || "#fff"}
      fillOpacity={0.85}
    />
  </svg>
)

export default PlayIcon
