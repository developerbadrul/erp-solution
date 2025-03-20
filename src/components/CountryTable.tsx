/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useGetCountriesQuery } from "../redux/api/baseApi";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

interface Country {
  name: string;
  code: string;
}

const CountryTable: React.FC = () => {
  const { data, isLoading, error } = useGetCountriesQuery();
  const countries: Country[] = data?.data?.list ?? [];

  console.log("API Response:", countries);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredCountries = countries.filter(
    (country) =>
      country?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false
  );

  const columns: ColumnDef<Country>[] = [
    {
      accessorKey: "name",
      header: () => <span>Name</span>,
    },
    {
      accessorKey: "code",
      header: () => <span>Code</span>,
    },
  ];

  const table = useReactTable({
    data: filteredCountries,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading countries</p>;

  return (
    <div>
      <input
        type="text"
        placeholder="Search countries..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 rounded"
      />
      <table className="border-collapse border w-full mt-4">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="border p-2">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border p-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CountryTable;
