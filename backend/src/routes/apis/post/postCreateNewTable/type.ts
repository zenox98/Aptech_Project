export interface headerProps {
  colName: string,
  dataType: string,
}

export interface createNewTableProps {
  name : string,
  Headers : headerProps[]
}
