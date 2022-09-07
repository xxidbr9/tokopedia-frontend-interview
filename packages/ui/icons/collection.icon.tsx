import { SVGProps } from "react"

const CollectionIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M3 2a1 1 0 0 1 1-1h13a1 1 0 0 1 1 1v2h2a1 1 0 0 1 1 1v17a1 1 0 0 1-1.435.9L13.5 19.975l-6.065 2.927A1 1 0 0 1 6 22v-2.882l-1.553.776A1 1 0 0 1 3 19V2Zm5 4h11v14.407l-5.065-2.444a1 1 0 0 0-.87 0L8 20.407V6Zm8-2H7a1 1 0 0 0-1 1v11.882l-1 .5V3h11v1Z"
      fill={props.color || "#A4A4A4"}
    />
  </svg>
)

export default CollectionIcon
