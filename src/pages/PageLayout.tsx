import { Outlet } from "react-router-dom";
import SearchHeader from "@/components/search-header";
import { useState } from "react";
import { CDPResult, CollType } from "@/lib/w3/types";

export interface RouterContext {
  roughCdpId: number | string;
  setRoughCdpId: React.Dispatch<React.SetStateAction<number | string>>;
  collType: CollType;
  setCollType: React.Dispatch<React.SetStateAction<CollType>>;
  results: CDPResult[];
  setResults: React.Dispatch<React.SetStateAction<CDPResult[]>>;
}

export const PageLayout: React.FC = () => {
  const [roughCdpId, setRoughCdpId] = useState<number | string>("");
  const [collType, setCollType] = useState(CollType.ETH_A);
  const [results, setResults] = useState<CDPResult[]>([]);

  return (
    <div className="container py-8">
      <SearchHeader
        roughCdpId={roughCdpId}
        collType={collType}
        setCollType={setCollType}
        setRoughCdpId={setRoughCdpId}
      />

      <Outlet
        context={
          {
            roughCdpId,
            setRoughCdpId,
            collType,
            setCollType,
            results,
            setResults,
          } satisfies RouterContext
        }
      />
    </div>
  );
};
