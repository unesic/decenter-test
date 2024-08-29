import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";

import { getCdps, getIlkInfo } from "@/lib/w3";
import { CollType } from "@/lib/w3/types";
import { correctCycleWeights, getCycleWeights, setAbort, sleep, weighIds } from "@/lib/functions";
import { BASE_WEIGHTS, MAX_CDPS } from "@/lib/constants";

import { Context } from "@/lib/context/Context";
import { RouterContext } from "@/pages/PageLayout";

import SearchResults from "@/components/search-results";
import LoadingState from "@/components/loading-state";
import EmptyState from "@/components/empty-state";

type SearchCdps = (
  ...args: [
    id: number,
    ilk: CollType,
    prevMax?: number,
    prevMin?: number,
    cycle?: number,
    found?: number
  ]
) => void;

export const Home: React.FC = () => {
  const { roughCdpId, collType, results, setResults } = useOutletContext<RouterContext>();
  const { cdpContract, ilkContract, ilkRate, setIlkRate } = useContext(Context);

  const timeRef = useRef(Date.now());
  const [loading, setLoading] = useState(false);
  const [searchCount, setSearchCount] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);

  useEffect(() => {
    if (!ilkContract) return;
    getIlkInfo(ilkContract, collType).then(({ rate }) => setIlkRate(rate));
  }, [collType, ilkContract, setIlkRate]);

  const searchCdps: SearchCdps = useCallback(
    async (id, ilk, prevMax, prevMin, cycle = 0, found = 0) => {
      if (!cdpContract || !ilkContract || typeof ilkRate !== "number") return;

      let weights: number[] = [];
      let max = prevMax ?? (BASE_WEIGHTS.at(1) as number);
      let min = prevMin ?? (BASE_WEIGHTS.at(-2) as number);

      const pivot = !(cycle % 2);
      const maxLen = MAX_CDPS - found;

      /**
       * Up until this point we searched in both directions. When/if we reach
       * the point where we search just for one ID at the time, we still want
       * to oscilate between sides one at the time.
       */
      if (maxLen === 1) weights = [pivot ? ++max : --min];
      else weights = getCycleWeights(cycle, pivot, maxLen > 2, max, min);

      /**
       * Since we want to give both sides fair advantage, the algorithm
       * will sometimes provide more weights than we actually need in
       * the current cycle. We get only the weights we need, starting
       * from middle and going to both sides of the spectrum.
       */
      if (weights.length > maxLen) {
        const start = Math.floor(weights.length / 2) - (Math.floor(maxLen / 2) || 1);
        weights = weights.slice(start, start + maxLen);
      }

      if (maxLen > 1) {
        max = weights.at(0) as number;
        min = weights.at(-1) as number;
      }

      /**
       * Making sure we don't hit invalid ID of 0 or less
       */
      let cdpIds = weighIds(weights, id);
      if (Math.min(...cdpIds) < 1) {
        weights = correctCycleWeights(weights, id);
        cdpIds = weighIds(weights, id);
        max = weights.at(-1) as number;
      }

      if (window.abort[id]) return;

      const results = await getCdps(cdpIds, ilk, cdpContract, ilkRate);
      const filtered = results.filter((r) => !!r);

      setResults((r) => r.concat(filtered));
      setSearchCount((p) => p + cdpIds.length);

      if (found < MAX_CDPS && !window.abort[id]) {
        await sleep();
        searchCdps(id, ilk, max, min, cycle + 1, found + filtered.length);
      } else {
        setLoading(false);
        return;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cdpContract, ilkContract, ilkRate]
  );

  useEffect(() => {
    if (loading) timeRef.current = Date.now();
    else {
      setTimeTaken(Date.now() - timeRef.current);
      timeRef.current = Date.now();
    }
  }, [loading]);

  useEffect(() => {
    setResults([]);
    setSearchCount(0);

    if (typeof roughCdpId !== "number") return;

    setAbort(roughCdpId);
    setLoading(true);
    searchCdps(roughCdpId, collType);

    return () => {
      setAbort();
      setResults([]);
      setSearchCount(0);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roughCdpId, collType]);

  return (
    <div className="container py-8">
      {loading && <LoadingState found={results.length} />}

      {results.length ? (
        <SearchResults
          results={results}
          loading={loading}
          timeTaken={timeTaken}
          count={searchCount}
        />
      ) : (
        <EmptyState />
      )}
    </div>
  );
};
