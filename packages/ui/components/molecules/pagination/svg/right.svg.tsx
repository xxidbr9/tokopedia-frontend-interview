import { SVGProps } from "react"

const RightIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M8.793 5.293a1 1 0 0 1 1.414 0l6 6a1 1 0 0 1 0 1.414l-6 6a1 1 0 0 1-1.414-1.414L14.086 12 8.793 6.707a1 1 0 0 1 0-1.414Z"
      fill={props.color}
      fillOpacity={0.85}
    />
  </svg>
)

export default RightIcon
