import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "#/lib/utils"

const textVariants = cva(
  "",
  {
    variants: {
      color: {
        default: "text-grey-70",
        "grey-20": "text-grey-20",
        "grey-10": "text-grey-10",
        "grey-11": "text-grey-10",
        "grey-30": "text-grey-30",
        "grey-35": "text-grey-35",
        "grey-40": "text-grey-40",
        "grey-60": "text-grey-60",
        "grey-70": "text-grey-70",
        "green-60": "text-green-60",
        "white": "text-white",
        "white-90": "text-white-90",
      },
      size: {
        default: "text-[14px] md:text-[16px] 3xl:text-[18px]",
        xs: "text-[14px] md:text-[14px] 3xl:text-[18px]",
        xs1: "text-[18px] md:text-[18px] 3xl:text-[20px]",
        sm: "text-[18px] md:text-[20px] 3xl:text-[24px]",
        sm1: "text-[20px] md:text-[24px] 3xl:text-[30px]",
        sm2: "text-[24px] md:text-[30px] 3xl:text-[40px]",
        sm3: "text-[26px] md:text-[32px] 3xl:text-[38px]",
        lg: "text-[28px] md:text-[38px] 3xl:text-[48px]",
        xl: "text-[30px] md:text-[40px] 3xl:text-[58px]",
        xl1: "text-[28px] md:text-[48px] 3xl:text-[58px]",
      },
      leading: {
        default: "leading-[150%]",
        "leading-120": "leading-[120%]",
        "leading-130": "leading-[130%]",
      },
      font: {
        default: "font-lexend",
      }
    },
    defaultVariants: {
      color: "default",
      size: "default",
      leading: "default",
      font: "default",
    },
  }
)

function Text({
  className,
  color = "default",
  size = "default",
  leading = "default",
  font = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"p"> &
  VariantProps<typeof textVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "p"

  return (
    <Comp
      data-slot="p"
      data-color={color}
      data-size={size}
      className={cn(textVariants({ color, size, leading, font, className }))}
      {...props}
    />
  )
}

export { Text, textVariants }
