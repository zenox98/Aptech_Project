import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";

interface tableComponentProps {
  headers: string[];
  tableData: string[][];
}

interface handleFileUploadProps {
  event: React.ChangeEvent<HTMLInputElement>;
  setHeaders: React.Dispatch<React.SetStateAction<string[]>>;
  setTableData: React.Dispatch<React.SetStateAction<string[][]>>;
}

const handleFileUpload = (props: handleFileUploadProps) => {
  const { setHeaders, setTableData, event }: handleFileUploadProps = props;

  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e: ProgressEvent<FileReader>) => {
    if (!e.target?.result) return;

    const data = new Uint8Array(e.target.result as ArrayBuffer);
    const workbook = XLSX.read(data, { type: "array" });
    const sheetName = workbook.SheetNames[0]; // Read first sheet
    const sheet = workbook.Sheets[sheetName];

    console.log(sheet);

    const jsonData: string[][] = XLSX.utils.sheet_to_json<string[]>(sheet, {
      header: 1,
    });
    console.log('jsonData')
    console.log(jsonData);

    if (jsonData.length === 0) return 'excel file is empty';

    let columnHeaders: string[];

    if (jsonData[0].length === 1) {
      // If only one column exists in the first row, assume headers are in the first column
      columnHeaders = jsonData.map((row) => row[0] || ""); // Extract first column as headers
      setHeaders(columnHeaders);

      // Transpose data: Convert row-based data to column-based format
      const transposedData: string[][] = jsonData[0].map((_, colIndex) =>
        jsonData.map((row) => row[colIndex] || ""),
      );
      setTableData(transposedData.slice(1)); // Remove header row
    } else {
      // Otherwise, assume first row contains headers
      columnHeaders = jsonData[0].map((header) => header || "");
      setHeaders(columnHeaders);
      setTableData(jsonData.slice(1)); // Remove header row
    }
  };

  reader.readAsArrayBuffer(file);
};

const TableComponent = (props: tableComponentProps) => {
  const { headers, tableData }: tableComponentProps = props;

  return (
    <table className="border-collapse border w-full">
      <thead>
        <tr className="bg-gray-200">
          {headers.map((header, index) => (
            <th key={index} className="border p-2">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, rowIndex) => (
          <tr key={rowIndex} className="border">
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} className="border p-2">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default function Home() {
  const [headers, setHeaders] = useState<string[]>([]);
  const [tableData, setTableData] = useState<string[][]>([]);

  useEffect(() => {
    console.log("Headers :\n", headers);
    console.log("Table Data :\n", tableData);
  }, [headers, tableData]);

  return (
    <div className="w-full h-full p-2 flex flex-wrap justify-center items-center">
      {/* input box */}
      <div className="w-full h-full">
        <input
          type="file"
          accept=".xlsx, .xls, .csv"
          onChange={(event) =>
            handleFileUpload({ event, setHeaders, setTableData })
          }
          className="border border-gray-300 rounded-md px-2 py-1"
        />

        {/*<div className="w-full h-96 overflow-auto flex flex-wrap justify-start items-center">
          { tableData.length > 0 && (
            <TableComponent headers={headers} tableData={tableData} />
          )}
         </div>
        */}
        <div className="w-full h-96 overflow-auto flex flex-wrap justify-start items-center">
          {tableData.length > 0 && (
            <TableComponent headers={headers} tableData={tableData} />
          )}
        </div>
      </div>
    </div>
  );
}
