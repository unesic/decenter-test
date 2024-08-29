import "./search-results.scss";

import { useMemo } from "react";

import { CDPResult } from "@/lib/w3/types";
import { msToSec } from "@/lib/functions";

import { MAX_CDPS } from "@/lib/constants";

import { SearchResult } from "@/components/search-result/SearchResult";
import { Cell, Row, Rowgroup, Table } from "@/components/table";

interface SearchResultsProps {
  results: CDPResult[];
  loading: boolean;
  timeTaken: number;
  count: number;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  loading,
  timeTaken,
  count,
}) => {
  const loadingRows = useMemo(() => {
    if (!loading) return;
    const diff = MAX_CDPS - results.length;
    return new Array(diff < 0 ? 0 : diff).fill(1);
  }, [results, loading]);

  if (!loading && !results.length) return;

  return (
    <div className="search-results">
      <Table>
        <Rowgroup type="thead">
          <Row>
            <Cell as="th" className="min-w-24">
              ID
            </Cell>
            <Cell as="th" className="min-w-32">
              Owner
            </Cell>
            <Cell as="th" className="min-w-28">
              Debt
            </Cell>
            <Cell as="th" className="min-w-32">
              Collateral
            </Cell>
          </Row>
        </Rowgroup>

        <Rowgroup type="tbody" className="text-sm">
          {results.map((cdp) => (
            <SearchResult key={cdp.id} {...cdp} />
          ))}
          {loadingRows?.map((_, idx) => (
            <SearchResult key={idx} {..._} loading={loading} />
          ))}
        </Rowgroup>
      </Table>

      {!loading && (
        <p className="search-results__info">
          Searched through <span>{count}</span> IDs in <span>{msToSec(timeTaken)}</span> seconds
        </p>
      )}
    </div>
  );
};
