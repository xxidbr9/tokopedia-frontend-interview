import * as React from "react"
import { SVGProps } from "react"

const EditIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M16.184 2c.332 0 .65.132.884.366l4.566 4.568a1.25 1.25 0 0 1 0 1.767L8.707 21.634a1.25 1.25 0 0 1-.884.366H3.25C2.56 22 2 21.44 2 20.75V16.2c0-.331.131-.649.366-.883L15.3 2.367A1.25 1.25 0 0 1 16.184 2Zm0 3.018L4.5 16.718V19.5h2.805L18.983 7.818l-2.798-2.8Z"
      fill="#fff"
      fillOpacity={0.85}
    />
  </svg>
)

export default EditIcon
