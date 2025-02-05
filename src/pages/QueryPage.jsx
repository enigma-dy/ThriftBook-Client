import React, { useState, useEffect } from "react";
import { useGetBooksQuery } from "../services/BookService";
import { useGetCategoriesQuery } from "../services/BookCatService";
import { buildQueryParams } from "../utils/buildQueryParams";

const BookQuery = () => {
  const [filters, setFilters] = useState({
    category: "",
    genres: [],
    minPrice: "",
    maxPrice: "",
    trending: "",
    author: "",
    search: "",
    dateFrom: "",
    dateTo: "",
    sortBy: "createdAt",
    sortOrder: "desc",
    page: 1,
    limit: 10,
  });

  const queryParams = buildQueryParams({
    ...filters,
    genres: filters.genres.join(","),
  }); // Convert genres array to a comma-separated string
  const { data: books, isLoading, isError } = useGetBooksQuery(queryParams);
  const { data: categories } = useGetCategoriesQuery();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleGenreChange = (genre) => {
    setFilters((prevFilters) => {
      const newGenres = prevFilters.genres.includes(genre)
        ? prevFilters.genres.filter((g) => g !== genre) // Remove genre if already selected
        : [...prevFilters.genres, genre]; // Add genre if not selected
      return { ...prevFilters, genres: newGenres };
    });
  };

  const handlePageChange = (page) => {
    setFilters({ ...filters, page });
  };

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (isError)
    return (
      <div className="text-center py-10 text-red-500">Error loading books.</div>
    );

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Filters Section */}
        <div className="filters bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Filters</h3>
          <input
            type="text"
            name="search"
            placeholder="Search by title or description"
            value={filters.search}
            onChange={handleInputChange}
            className="w-full mb-4 p-2 border rounded-lg"
          />
          <input
            type="text"
            name="author"
            placeholder="Author"
            value={filters.author}
            onChange={handleInputChange}
            className="w-full mb-4 p-2 border rounded-lg"
          />
          <select
            name="category"
            value={filters.category}
            onChange={handleInputChange}
            className="w-full mb-4 p-2 border rounded-lg"
          >
            <option value="">All Categories</option>
            {categories?.data?.map((cat) => (
              <option key={cat.subject} value={cat.subject}>
                {cat.subject}
              </option>
            ))}
          </select>
          <div className="genres mb-4">
            <h4 className="text-lg font-semibold mb-2">Genres</h4>
            {categories?.data
              ?.find((cat) => cat.subject === filters.category)
              ?.genres.map((genre) => (
                <div key={genre} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={genre}
                    checked={filters.genres.includes(genre)}
                    onChange={() => handleGenreChange(genre)}
                    className="mr-2"
                  />
                  <label htmlFor={genre}>{genre}</label>
                </div>
              ))}
          </div>
          <input
            type="number"
            name="minPrice"
            placeholder="Min Price"
            value={filters.minPrice}
            onChange={handleInputChange}
            className="w-full mb-4 p-2 border rounded-lg"
          />
          <input
            type="number"
            name="maxPrice"
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={handleInputChange}
            className="w-full mb-4 p-2 border rounded-lg"
          />
          <label className="block mb-4">
            Trending:
            <select
              name="trending"
              value={filters.trending}
              onChange={handleInputChange}
              className="w-full mt-2 p-2 border rounded-lg"
            >
              <option value="">All</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </label>
          <input
            type="date"
            name="dateFrom"
            value={filters.dateFrom}
            onChange={handleInputChange}
            className="w-full mb-4 p-2 border rounded-lg"
          />
          <input
            type="date"
            name="dateTo"
            value={filters.dateTo}
            onChange={handleInputChange}
            className="w-full mb-4 p-2 border rounded-lg"
          />
          <select
            name="sortBy"
            value={filters.sortBy}
            onChange={handleInputChange}
            className="w-full mb-4 p-2 border rounded-lg"
          >
            <option value="createdAt">Date Created</option>
            <option value="newPrice">Price</option>
          </select>
          <select
            name="sortOrder"
            value={filters.sortOrder}
            onChange={handleInputChange}
            className="w-full mb-4 p-2 border rounded-lg"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>

        {/* Books Section */}
        <div className="books md:col-span-3">
          <h3 className="text-xl font-semibold mb-4">Books</h3>
          {books?.data?.length === 0 ? (
            <p className="text-center text-gray-500">No books found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {books.data.map((book) => (
                <div
                  key={book._id}
                  className="book-card bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <img
                    src={book.image.url}
                    alt={book.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="font-semibold text-lg mb-2">{book.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      {book.description}
                    </p>
                    <p className="text-sm text-gray-800 mb-1">
                      Author: {book.author?.name || "Unknown"}
                    </p>
                    <p className="text-sm text-gray-800 mb-1">
                      Category: {book.category}
                    </p>
                    <p className="text-sm text-gray-800 mb-1">
                      Genre: {book.genre}
                    </p>
                    <p className="text-sm font-bold text-green-600">
                      Price: ${book.newPrice}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Pagination Section */}
      <div className="pagination flex justify-center items-center mt-10 space-x-4">
        <button
          disabled={filters.page === 1}
          onClick={() => handlePageChange(filters.page - 1)}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400"
        >
          Previous
        </button>
        <span className="font-semibold">Page {filters.page}</span>
        <button
          disabled={filters.page === books.totalPages}
          onClick={() => handlePageChange(filters.page + 1)}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BookQuery;
