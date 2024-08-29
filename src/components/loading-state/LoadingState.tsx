import "./loading-state.scss";

import { MAX_CDPS } from "@/lib/constants";

interface LoadingStateProps {
  found: number;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ found }) => (
  <div className="loading-state">
    <p className="loading-state__text">Searching..</p>
    <div className="loading-state__progress">
      <div
        className="loading-state__progress__bar"
        style={{ width: `${(found / MAX_CDPS) * 100}%` }}
      ></div>
    </div>
    <p className="loading-state__found">
      Found {found} of {MAX_CDPS}
    </p>
  </div>
);
