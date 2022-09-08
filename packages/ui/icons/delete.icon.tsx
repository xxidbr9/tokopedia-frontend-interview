import { SVGProps } from "react"

const DeleteIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={25}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M10.5 9a1 1 0 0 1 1 1v6.5a1 1 0 1 1-2 0V10a1 1 0 0 1 1-1ZM15.5 10a1 1 0 1 0-2 0v6.5a1 1 0 1 0 2 0V10Z"
      fill="#fff"
      fillOpacity={0.85}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.145 1a1 1 0 0 0-.877.52L7.908 4H2.5a1 1 0 0 0 0 2H4v16a1 1 0 0 0 1 1h15a1 1 0 0 0 1-1V6h1.5a1 1 0 1 0 0-2h-5.402L15.77 1.527A1 1 0 0 0 14.889 1h-4.744Zm4.683 3-.537-1h-3.554l-.548 1h4.639ZM6 6v15h13V6H6Z"
      fill="#fff"
      fillOpacity={0.85}
    />
  </svg>
)

export default DeleteIcon
