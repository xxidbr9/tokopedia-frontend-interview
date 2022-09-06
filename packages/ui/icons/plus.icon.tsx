import { SVGProps } from "react"

const PlusIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M12.032 4a1 1 0 0 1 .998 1.001L13.023 11H19a1 1 0 1 1 0 2h-5.98l-.008 6.001a1 1 0 1 1-2-.002L11.02 13H5a1 1 0 1 1 0-2h6.023l.007-6.001A1 1 0 0 1 12.032 4Z"
      fill={props.color || "#fff"}
      fillOpacity={0.85}
    />
  </svg>
)

export default PlusIcon
