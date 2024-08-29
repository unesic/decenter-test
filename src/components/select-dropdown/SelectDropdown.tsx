import "./select-dropdown.scss";

import { ReactNode, useEffect, useRef, useState } from "react";
import { usePrevious, useVisible } from "@/lib/hooks";

export interface SelectOption {
  label: string;
  value: string | number;
  icon?: string;
}

const isOption = (value: any): value is SelectOption => "value" in value;

type NullableEl = HTMLElement | null;

interface SelectDropdownProps {
  placeholder?: string;
  value?: string | SelectOption;
  options: SelectOption[];
  onChange?: (e?: SelectOption) => void;
  disabled?: boolean;
  displayPrefix?: (e?: SelectOption) => ReactNode;
}

export const SelectDropdown: React.FC<SelectDropdownProps> = ({
  placeholder = "Select one",
  value,
  options,
  onChange,
  disabled,
  displayPrefix,
}) => {
  const [internalValue, setInternalValue] = useState<SelectOption>();

  const [toggleRef, open, setOpen] = useVisible<HTMLButtonElement>(false);
  const prevOpen = usePrevious(open);
  const optionsRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (typeof value === "string") {
      const val = options.find((o) => o.value === value);
      setInternalValue(val);
    }
    if (value && typeof value === "object" && isOption(value)) setInternalValue(value);
  }, [value, options]);

  useEffect(() => {
    if (internalValue) onChange?.(internalValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [internalValue]);

  useEffect(() => {
    if (!open && prevOpen) {
      toggleRef.current?.focus();
      return;
    }

    const currEl = optionsRef.current?.querySelector('[aria-selected="true"]');
    const firstEl = optionsRef.current?.firstElementChild;

    const el = (currEl ?? firstEl) as NullableEl;
    el?.focus();
  }, [open, prevOpen, optionsRef, toggleRef]);

  const toggleDropdown = () => {
    setOpen((open) => !open);
  };

  const onDropdownKeyDown = (e: React.KeyboardEvent) => {
    const openKeys = ["Enter", "Space", "ArrowDown", "ArrowUp"];
    if (openKeys.includes(e.code)) {
      e.preventDefault();
      toggleDropdown();
    }
  };

  const onOptionKeyDown = (o: SelectOption) => (e: React.KeyboardEvent) => {
    const { code, shiftKey } = e;

    if (code === "Escape") {
      e.preventDefault();
      toggleDropdown();
      return;
    }

    if (["Space", "Enter"].includes(code)) {
      e.preventDefault();
      setInternalValue(o);
      toggleDropdown();
      return;
    }

    const { previousElementSibling, nextElementSibling, parentElement } = e.target as HTMLElement;
    const { firstElementChild, lastElementChild } = parentElement as HTMLElement;

    const focusNext = (nextElementSibling ?? firstElementChild) as NullableEl;
    const focusPrev = (previousElementSibling ?? lastElementChild) as NullableEl;

    if ((code === "Tab" && !shiftKey) || code === "ArrowDown") {
      e.preventDefault();
      focusNext?.focus();
    } else if ((code === "Tab" && shiftKey) || code === "ArrowUp") {
      e.preventDefault();
      focusPrev?.focus();
    }
  };

  return (
    <div className={["select-dropdown", disabled && "select-dropdown--disabled"].join(" ")}>
      <button
        ref={toggleRef}
        className="select-dropdown__display"
        onClick={toggleDropdown}
        onKeyDown={onDropdownKeyDown}
        role="combobox"
        aria-label={internalValue?.label ?? placeholder}
        aria-expanded={open}
        aria-controls="select-panel"
        aria-haspopup="true"
      >
        <span className="select-dropdown__display__text">
          {displayPrefix?.(internalValue)}
          {internalValue?.label ?? <span className="placeholder">{placeholder}</span>}
        </span>
      </button>
      <div className="select-dropdown__panel">
        <ul role="listbox" id="select-panel" ref={optionsRef} className="select-dropdown__list">
          {options.map(({ icon: Icon, ...o }) => (
            <li
              className="select-dropdown__list__item"
              key={o.value}
              onClick={() => setInternalValue(o)}
              onKeyDown={onOptionKeyDown(o)}
              tabIndex={0}
              role="option"
              aria-selected={o.value === internalValue?.value}
            >
              {Icon && <Icon className="w-4 h-4" />}
              {o.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
