interface Row {
  createdAt: string;
  _id: string;
  values: string[];
}

export interface TableData {
  columns: string[];
  rows: Row[];
}
