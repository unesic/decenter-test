import LoadingPlaceholder from "@/components/loading-placeholder";
import { Cell, Row } from "@/components/table";

export const Loading: React.FC = () => (
  <Row className="search-result loading">
    <Cell>
      <LoadingPlaceholder isCell />
    </Cell>
    <Cell>
      <LoadingPlaceholder isCell wide />
    </Cell>
    <Cell>
      <LoadingPlaceholder isCell />
    </Cell>
    <Cell>
      <LoadingPlaceholder isCell />
    </Cell>
  </Row>
);
