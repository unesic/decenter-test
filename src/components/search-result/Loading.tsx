import LoadingPlaceholder from "@/components/loading-placeholder";
import { Cell, Row } from "@/components/table";

export const Loading: React.FC = () => (
  <Row className="search-result loading">
    <Cell className="min-w-24">
      <LoadingPlaceholder isCell />
    </Cell>
    <Cell className="min-w-32">
      <LoadingPlaceholder isCell wide />
    </Cell>
    <Cell className="min-w-28">
      <LoadingPlaceholder isCell />
    </Cell>
    <Cell className="min-w-32">
      <LoadingPlaceholder isCell />
    </Cell>
  </Row>
);
