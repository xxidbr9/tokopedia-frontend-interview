import { SVGProps } from "react"

const LeftIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M16.207 5.293a1 1 0 0 1 0 1.414L10.914 12l5.293 5.293a1 1 0 0 1-1.414 1.414l-6-6a1 1 0 0 1 0-1.414l6-6a1 1 0 0 1 1.414 0Z"
      fill={props.color}
      fillOpacity={0.85}
    />
  </svg>
)

export default LeftIcon
