import "./loading-placeholder.scss";

interface LoadingPlaceholderProps {
  w?: "sm" | "md" | "lg" | "xl";
  h?: "sm" | "md" | "lg" | "xl";
  isCell?: boolean;
  wide?: boolean;
}

export const LoadingPlaceholder: React.FC<LoadingPlaceholderProps> = ({
  w = "md",
  h = "md",
  isCell = false,
  wide = false,
}) => {
  return (
    <span
      className={[
        "loading-placeholder",
        ...(w === "sm" ? ["loading-placeholder--w-sm"] : []),
        ...(w === "lg" ? ["loading-placeholder--w-lg"] : []),
        ...(w === "xl" ? ["loading-placeholder--w-xl"] : []),
        ...(h === "sm" ? ["loading-placeholder--h-sm"] : []),
        ...(h === "lg" ? ["loading-placeholder--h-lg"] : []),
        ...(h === "xl" ? ["loading-placeholder--h-xl"] : []),
        ...(isCell ? ["loading-placeholder--cell"] : []),
        ...(isCell && wide ? ["loading-placeholder--cell-wide"] : []),
      ].join(" ")}
    ></span>
  );
};
