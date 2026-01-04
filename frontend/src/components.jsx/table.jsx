import React from "react";
import { DataGrid } from "@mui/x-data-grid/DataGrid";

export default function Table() {
  const [rows, setRows] = React.useState([
    {
      id: 1,
      name: "Aman",
      attendance: "P",
      comment: "Test Comment",
    },
  ]);
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 10,
  });
  const [filterModel, setFilterModel] = React.useState({ items: [] });
  const [sortModel, setSortModel] = React.useState([]);

  console.log(import.meta.env.VITE_API_URL); // "123"
  // console.log(VITE_API_URL);

  // React.useEffect(() => {
  //   const fetcher = async () => {
  //     // fetch data from server
  //     const data = await fetch(VITE_API_URL, {
  //       method: "GET",
  //       body: JSON.stringify({
  //         page: paginationModel.page,
  //         pageSize: paginationModel.pageSize,
  //         sortModel,
  //         filterModel,
  //       }),
  //     });
  //     setRows(data.rows);
  //   };
  //   fetcher();
  // }, [paginationModel, sortModel, filterModel]);

  const columns = [
    { field: "id", flex: 1 },
    { field: "name", flex: 1 },
    { field: "attendance", flex: 1 },
    { field: "comment", flex: 1 },
  ];

  return (
    <DataGrid
      columns={columns}
      rows={rows}
      pagination
      sortingMode="server"
      filterMode="server"
      paginationMode="server"
      onPaginationModelChange={setPaginationModel}
      onSortModelChange={setSortModel}
      onFilterModelChange={setFilterModel}
    />
  );
}
