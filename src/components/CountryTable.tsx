import "react-data-grid/lib/styles.css";
import { DataGrid } from "react-data-grid";
import { useGetCountriesQuery } from "../redux/api/baseApi";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  setSearch,
  setStatus,
  setCurrentPage,
  resetFilters
} from "../redux/features/countrySlice";

const CountryTable = () => {
  const { data, isLoading } = useGetCountriesQuery();
  const dispatch = useAppDispatch();
  const { search, status, currentPage, itemsPerPage } = useAppSelector((state) => state.country);

  if (isLoading) return <div>Loading...</div>;
  if (!data || !data.data || !data.data.list) return <div>No data available</div>;

  // Filtering 
  const filteredCountries = data.data.list
    .filter((country) => country?.name)
    .filter((country) =>
      country.name.toLowerCase().includes(search.toLowerCase()) ||
      country.id?.toString().includes(search) ||
      country.code?.toLowerCase().includes(search.toLowerCase())
    )
    .filter((country) => (status === "all" ? true : country.is_active === (status === "active" ? 1 : 0)));

  // Pagination 
  const totalPages = Math.ceil(filteredCountries.length / itemsPerPage);
  const paginatedCountries = filteredCountries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Define columns for React Data Grid
  const columns = [
    { key: "name", name: "Country Name" },
    { key: "id", name: "ID" },
    { key: "code", name: "Code" },
    {
      key: "is_active",
      name: "Status",
      renderCell: ({ row }) => (row.is_active ? "Active" : "Inactive"),
    },
    { key: "action", name: "Action" },
  ];

  return (
    <div className="p-4">
      {/* Search and Filter */}
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search by Name, ID, Code"
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
          className="border px-2 py-1 rounded"
        />

        <select
          value={status}
          onChange={(e) => dispatch(setStatus(e.target.value))}
          className="border px-2 py-1 rounded"
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <button onClick={() => dispatch(resetFilters())} className="border px-4 py-1 rounded bg-red-500 text-white">
          Reset Filters
        </button>
      </div>

      {/* React Data Grid Table */}
      <div style={{ height: 400, colorScheme: "white" }}>
        <DataGrid columns={columns} rows={paginatedCountries} />
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => dispatch(setCurrentPage(Math.max(currentPage - 1, 1)))}
          disabled={currentPage === 1}
          className="border px-4 py-1 mx-2"
        >
          Prev
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => dispatch(setCurrentPage(Math.min(currentPage + 1, totalPages)))}
          disabled={currentPage === totalPages}
          className="border px-4 py-1 mx-2"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CountryTable;