import "./empty-state.scss";

import { MAX_CDPS } from "@/lib/constants";

export const EmptyState: React.FC = () => (
  <div className="empty-state">
    <p>Enter a rough CDP ID you'd like to find {MAX_CDPS} closest search results for.</p>
  </div>
);
