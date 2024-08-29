import "./input.scss";

import { forwardRef } from "react";

import Close from "@/assets/icons/close.svg";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  wide?: boolean;
  clear?: boolean;
  onClear?: () => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, value, onChange, placeholder, wide = false, clear, onClear }, ref) => (
    <div className="input-container">
      <input
        ref={ref}
        className={["input", wide ? "input--wide" : ""].join(" ")}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {clear && (
        <button className="input__clear" onClick={onClear}>
          <Close />
        </button>
      )}
    </div>
  )
);
