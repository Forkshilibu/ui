import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "text-c-content focus-visible:border-c-focus focus-visible:shadow-orange-glow disabled:bg-btn-gray-disabled disabled:text-c-content-disabled group/button inline-flex min-h-11 shrink-0 items-center justify-center rounded-full border border-transparent bg-clip-padding font-normal whitespace-nowrap transition-all outline-none select-none disabled:pointer-events-none disabled:opacity-100 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "from-btn-orange-a to-btn-orange-b text-c-contrast hover:from-btn-orange-a hover:to-btn-orange-b active:from-btn-orange-pressed-a active:to-btn-orange-pressed-b bg-linear-to-r",
        outline:
          "border-btn-gray-stroke text-c-content hover:bg-btn-gray-pressed active:bg-btn-gray-pressed aria-expanded:bg-btn-gray-pressed bg-transparent",
        secondary:
          "bg-btn-gray text-c-content hover:bg-btn-gray-pressed active:bg-btn-gray-pressed aria-expanded:bg-btn-gray-pressed",
        ghost:
          "text-c-content hover:bg-btn-gray-pressed active:bg-btn-gray-pressed aria-expanded:bg-btn-gray-pressed bg-transparent",
        destructive: "bg-c-alart text-c-contrast",
        link: "text-btn-link hover:text-btn-link-pressed min-h-auto bg-transparent no-underline underline-offset-4 hover:underline",
      },
      size: {
        default: "gap-md-compact px-lg text-label-lg min-h-11",
        xs: "gap-sm px-md text-label-sm min-h-8 [&_svg:not([class*='size-'])]:size-3",
        sm: "gap-sm px-md text-label-md min-h-9 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "gap-md-compact px-xl text-label-lg min-h-12",
        icon: "size-11 min-h-11 min-w-11 p-0",
        "icon-xs":
          "size-8 min-h-8 min-w-8 p-0 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-9 min-h-9 min-w-9 p-0",
        "icon-lg": "size-12 min-h-12 min-w-12 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
