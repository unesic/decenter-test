import "./search-result.scss";

import { KeyboardEvent, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";

import { formatIlk, formatNumber, shortenHash } from "@/lib/functions";
import { CDPResult } from "@/lib/w3/types";

import ArrowRight from "@/assets/icons/arrow-right.svg";

import { Cell, Row } from "@/components/table";
import Tooltip from "@/components/tooltip";
import IlkIcon from "@/components/ilk-icon";

import { Loading } from "./Loading";

interface Loading extends Partial<CDPResult> {
  loading: true;
}

interface Data extends CDPResult {
  loading?: false;
}

type SearchResultProps = Loading | Data;

export const SearchResult: React.FC<SearchResultProps> = ({
  loading,
  id,
  userAddr,
  ilk,
  debt,
  collateral,
}) => {
  const navigate = useNavigate();

  const onRowSelect = (e: MouseEvent | KeyboardEvent) => {
    const isClick = e.type === "click";
    const isKeydown = e.type === "keydown";
    const allowedKey = ["Space", "Enter"].includes((e as KeyboardEvent).code);

    if (isClick || (isKeydown && allowedKey)) navigate(`/cdp/${id}`);
  };

  if (loading) return <Loading />;

  return (
    <Row
      className="search-result"
      tabIndex={0}
      aria-label={id ? `CDP ID ${id}` : "CDP Loading"}
      onClick={onRowSelect}
      onKeyDown={onRowSelect}
    >
      <Cell className="min-w-24">
        <span className="search-result__id">
          <IlkIcon ilk={ilk} /> {id}
        </span>
      </Cell>

      <Cell className="min-w-32 font-mono">
        <Tooltip tooltip={userAddr}>{shortenHash(userAddr)}</Tooltip>
      </Cell>

      <Cell className="min-w-28">{formatNumber(debt, { notation: "compact" })} DAI</Cell>

      <Cell className="min-w-32 action-cell">
        {formatNumber(collateral)} {formatIlk(ilk)}
        <span className="arrow-icon">
          <ArrowRight />
        </span>
      </Cell>
    </Row>
  );
};
