// components/dotted-separator.tsx
import { cn } from "@/lib/utils";

interface DottedSeparatorProps {
  className?: string;
  color?: string;
  height?: string;
  dotSize?: string;
  gapSize?: string;
  direction?: "horizontal" | "vertical";
}

export const DottedSeparator = ({
  className,
  color = "#d4d4d8",
  height = "2px",
  dotSize = "2px",
  gapSize = "6px",
  direction = "horizontal",
}: DottedSeparatorProps) => {
  const isHorizontal = direction === "horizontal";

  return (
    <div
      className={cn("w-full", className)}
      style={{
        height: isHorizontal ? height : undefined,
        width: !isHorizontal ? height : undefined,
        backgroundImage: `repeating-linear-gradient(${
          isHorizontal ? "to right" : "to bottom"
        }, ${color}, ${color} ${dotSize}, transparent ${dotSize}, transparent calc(${dotSize} + ${gapSize}))`,
      }}
    />
  );
};
