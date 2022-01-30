export interface ITableColumn {
  id: string;
  numeric: boolean;
  disablePadding: boolean;
  label: string;
  hasSort: boolean;
  hidden?: boolean;
}

export interface ITableHead {
  order: "asc" | "desc";
  orderBy: string;
  onRequestSort: Function;
  columns: ITableColumn[];
  hasEdit: boolean;
  hasDelete: boolean;
}

export interface ITableRow {
  [key: string]: any;
}