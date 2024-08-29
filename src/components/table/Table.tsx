import "./table.scss";

interface Base {
  className?: string;
  children: React.ReactNode;
}

interface RowProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Row: React.FC<RowProps> = ({ className, children, ...rest }) => (
  <div role="row" className={["tr", className].join(" ")} {...rest}>
    {children}
  </div>
);

interface CellProps extends Base {
  as?: "td" | "th";
}

export const Cell: React.FC<CellProps> = ({ as = "td", className, children }) =>
  as === "td" ? (
    <div role="cell" className={["td", className].join(" ")}>
      {children}
    </div>
  ) : (
    <div role="columnheader" className={["th", className].join(" ")}>
      {children}
    </div>
  );

interface RowgroupProps extends Base {
  type: "thead" | "tbody";
}

export const Rowgroup: React.FC<RowgroupProps> = ({ type, className, children }) => (
  <div role="rowgroup" className={[type, className].join(" ")}>
    {children}
  </div>
);

interface TableProps extends Base {}

export const Table: React.FC<TableProps> = ({ className, children }) => (
  <div role="table" className={["c-table", className].join(" ")}>
    {children}
  </div>
);
