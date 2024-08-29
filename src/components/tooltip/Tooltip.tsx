import "./tooltip.scss";

interface TooltipProps {
  tooltip: string;
  size?: "sm" | "lg";
  children: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ tooltip, size = "sm", children }) => (
  <span className={["tooltip", ...(size === "lg" ? ["tooltip--lg"] : [])].join(" ")}>
    <span className="tooltip__text">{tooltip}</span>
    <span className="tooltip__owner">{children}</span>
  </span>
);

export const WithTooltip: React.FC<Partial<TooltipProps>> = ({ tooltip, size, children }) =>
  tooltip ? (
    <Tooltip tooltip={tooltip} size={size}>
      {children}
    </Tooltip>
  ) : (
    children
  );
