import { cn } from "#/lib/utils";
import type { SVGProps } from "react";


const ArrowTopRight = ({ className, ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
      {...props}
    >
      <path
        d="M8.50007 26.9166L26.9167 8.49994M9.23673 8.49994H26.9167V26.1799"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default ArrowTopRight;
