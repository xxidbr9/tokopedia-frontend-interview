import { SVGProps } from "react"

const BrandIcon = (props: SVGProps<SVGSVGElement>) =>{
  const width = props.width || 589
  const height = props.height || 638
  return (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${589} ${638}`}
    {...props}
  >
    <path
      d="M58.847 96.995C71.864 10.379 173.771-29.667 242.281 24.913l302.791 241.224c68.509 54.579 52.239 162.849-29.287 194.885L155.466 602.613C73.94 634.649-11.697 566.425 1.319 479.809L58.847 96.995Z"
      fill="#00D6FF"
      fillOpacity={0.4}
    />
    <path
      d="M7.02 152.43C-2.944 65.41 85.037.235 165.387 35.115l355.123 154.158c80.35 34.88 92.808 143.654 22.423 195.794L231.855 615.508c-70.385 52.14-170.823 8.54-180.789-78.48L7.021 152.43Z"
      fill="#009AF9"
      fillOpacity={0.6}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M172.754 405.476c-36.739-25.715-60.764-68.35-60.764-116.596 0-78.549 63.682-142.226 142.238-142.226 59.504 0 110.473 36.536 131.696 88.396 16.623 23.687 35.593 43.062 51.701 59.513 33.298 34.007 54.362 55.519 17.158 76.808-8.045 4.603-17.332 3.738-26.037 2.926-11.043-1.029-21.149-1.971-26.591 8.452-3.484 6.672-1.298 12.7.94 18.872 2.069 5.705 4.182 11.533 1.905 18.107-5.394 15.57-24.538 9.666-43.253 3.894-18.696-5.766-36.964-11.4-40.668 4.639-1.445 6.26-.262 11.038.99 16.095.923 3.73 1.884 7.611 1.855 12.35-.421 68.865-92.476 6.355-151.17-51.23Zm94.275-125.13c8.641 0 15.646-8.914 15.646-19.911 0-10.997-7.005-19.912-15.646-19.912-8.641 0-15.646 8.915-15.646 19.912s7.005 19.911 15.646 19.911Zm-95.299 0c6.284 0 11.379-6.367 11.379-14.222 0-7.855-5.095-14.223-11.379-14.223s-11.379 6.368-11.379 14.223 5.095 14.222 11.379 14.222Z"
      fill="#fff"
    />
  </svg>
)}

export default BrandIcon
