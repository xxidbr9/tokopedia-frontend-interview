import { SVGProps } from "react"

const HomeIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M11.375 2.22a1 1 0 0 1 1.25 0l7.5 5.999 2.5 2a1 1 0 1 1-1.25 1.562l-.875-.7V21a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1v-9.92l-.875.7a1 1 0 1 1-1.25-1.56l2.5-2c0-.001 0 0 0 0l7.5-6ZM5.5 9.48l6.5-5.2 6.5 5.2V20h-3v-5.5a1 1 0 0 0-1-1h-5a1 1 0 0 0-1 1V20h-3V9.48Zm5 10.52h3v-4.5h-3V20Z"
      fill={props.color || "#A4A4A4"}
    />
  </svg>
)

export default HomeIcon
