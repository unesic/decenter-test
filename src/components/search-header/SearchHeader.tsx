import "./search-header.scss";

import { useEffect, useRef } from "react";

import { SELECT_OPTIONS } from "@/lib/constants";
import { debounce } from "@/lib/functions";
import { CollType } from "@/lib/w3/types";
import type { SelectOption } from "@/components/select-dropdown/SelectDropdown";

import IlkIcon from "@/components/ilk-icon";
import Input from "@/components/input";
import SelectDropdown from "@/components/select-dropdown";
import { useLocation } from "react-router-dom";

type InputChangeOverload = (
  ...args:
    | ["roughCpdId", React.ChangeEvent<HTMLInputElement>]
    | ["collType", SelectOption | undefined]
) => void;

interface SearchHeaderProps {
  roughCdpId: number | string;
  setRoughCdpId: React.Dispatch<React.SetStateAction<number | string>>;
  collType: CollType;
  setCollType: React.Dispatch<React.SetStateAction<CollType>>;
}

export const SearchHeader: React.FC<SearchHeaderProps> = ({
  roughCdpId,
  setRoughCdpId,
  collType,
  setCollType,
}) => {
  const { pathname } = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);

  const isInfoPage = pathname.includes("/cdp");

  useEffect(() => {
    if (inputRef.current) inputRef.current.value = roughCdpId.toString();
  }, [roughCdpId]);

  const handleInputChange = debounce<InputChangeOverload>((type, e) => {
    if (type === "roughCpdId") setRoughCdpId(+e.target.value || "");
    else setCollType(e?.value as CollType);
  });

  return (
    <header className="search-header">
      <Input
        ref={inputRef}
        type="number"
        onChange={(e) => handleInputChange("roughCpdId", e)}
        clear={isInfoPage && !!roughCdpId}
        onClear={() => setRoughCdpId("")}
        placeholder="Start typing to search..."
        wide={isInfoPage}
      />
      {!isInfoPage && (
        <SelectDropdown
          value={collType}
          onChange={(e) => handleInputChange("collType", e)}
          options={SELECT_OPTIONS}
          displayPrefix={(e) =>
            e && <IlkIcon ilk={e.value as CollType} size="lg" className="mr-2" />
          }
        />
      )}
    </header>
  );
};
