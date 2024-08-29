import { COLLATERAL_TYPE_ICON_MAP } from "@/lib/constants";
import { CollType } from "@/lib/w3/types";

interface IlkIconProps {
  ilk: CollType;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export const IlkIcon: React.FC<IlkIconProps> = ({ ilk, size = "md", className }) => {
  const IconComponent = COLLATERAL_TYPE_ICON_MAP[ilk];
  return (
    <IconComponent
      className={[
        ...(size === "sm" ? ["w-3 h-3"] : []),
        ...(size === "md" ? ["w-4 h-4"] : []),
        ...(size === "lg" ? ["w-6 h-6"] : []),
        ...(size === "xl" ? ["w-8 h-8"] : []),
        className,
      ].join(" ")}
    />
  );
};
