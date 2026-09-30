import { cn } from "#/lib/utils";
import type { SVGProps } from "react";


const Close = ({ className, ...props}: SVGProps<SVGSVGElement> ) => {

  return (
    <svg
        width="24"
        height="24"
        viewBox="-0.5 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(className)}
        {...props}
      >
        <path
          d="M3 21.32L21 3.32001"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3 3.32001L21 21.32"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
  );
};

export default Close;
