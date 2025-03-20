/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetCountriesQuery } from "../redux/api/baseApi";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

import {
    setSearch,
    setStatus,
    setCountryName,
    setViewMode,
    setItemsPerPage,
    setCurrentPage,
    resetFilters
} from ".././redux/features/countrySlice";



const CountryList = () => {
    const { data, isLoading } = useGetCountriesQuery();
    const dispatch = useAppDispatch();
    const { search, status, countryName, viewMode, itemsPerPage, currentPage } = useAppSelector((state: { country: any; }) => state.country);

    if (isLoading) return <div>Loading...</div>;
    if (!data || !data.data || !data.data.list) return <div>No data available</div>;

    // Filtering Logic
    const filteredCountries = data.data.list
        .filter((country: any) => country?.name)
        .filter((country: any) =>
            country.name.toLowerCase().includes(search.toLowerCase()) ||
            country.id?.toString().includes(search) ||
            country.code?.toLowerCase().includes(search.toLowerCase())
        )
        .filter((country: any) => (status === "all" ? true : country.is_active === (status === "active" ? 1 : 0)))
        .filter((country: any) =>
            countryName ? country.name.toLowerCase().includes(countryName.toLowerCase()) : true
        );


    // Pagination Logic

    const totalPages = Math.ceil(filteredCountries.length / itemsPerPage)
    const paginatedCountries = filteredCountries.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    console.log(filteredCountries);


    return (
        <div>
            <div className="flex justify-between mb-4">
                {/* Search Input */}
                <input
                    type="text"
                    placeholder="Search by Name, ID, Code"
                    value={search}
                    onChange={(e) => dispatch(setSearch(e.target.value))}
                    className="border px-2 py-1 rounded"
                />

                {/* View Toggle */}
                <button onClick={() => dispatch(setViewMode(viewMode === "list" ? "grid" : "list"))}>
                    Toggle View
                </button>

                {/* Reset Filter */}
                <button onClick={() => dispatch(resetFilters())}>Reset Filters</button>
            </div>

            {/* Country List/Grid View */}
            <div className={viewMode === "list" ? "list-view" : "grid-view"}>
                {paginatedCountries.map((country: any) => (
                    <div key={country.id} className="border p-2">
                        <h3>{country.name}</h3>
                        <p>ID: {country.id} | Code: {country.code}</p>
                        <p>Status: {country.is_active ? "Active" : "Inactive"}</p>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-4">
                <button onClick={() => dispatch(setCurrentPage(Math.max(currentPage - 1, 1)))}>
                    Prev
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={() => dispatch(setCurrentPage(Math.min(currentPage + 1, totalPages)))}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default CountryList;