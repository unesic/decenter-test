import "./info-box.scss";

import { WithTooltip } from "@/components/tooltip";

type ArgType = number | string | React.ReactNode;

interface InfoBoxProps<T extends ArgType = number> {
  label?: T;
  value?: T;
  info?: T;
  tooltip?: string;
  hover?: boolean;
  onClick?: () => void;
}

export const ConditionallyWrap = () => {};

export const InfoBox = <T extends ArgType = number>({
  label,
  value,
  info,
  tooltip,
  hover = true,
  onClick,
}: InfoBoxProps<T>): React.ReactElement => {
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!onClick) return;
    if (["Space", "Enter"].includes(e.code)) onClick();
  };

  return (
    <div
      className={["info-box", ...(hover ? ["info-box--hover"] : [])].join(" ")}
      role={onClick ? "button" : "presentation"}
      onClick={onClick}
      onKeyDown={onKeyDown}
      tabIndex={onClick ? 0 : -1}
    >
      <span className="info-box__label">{label}</span>
      <WithTooltip tooltip={tooltip} size="lg">
        <span className="info-box__value">{value}</span>
      </WithTooltip>
      {info && <span className="info-box__info">{info}</span>}
    </div>
  );
};
