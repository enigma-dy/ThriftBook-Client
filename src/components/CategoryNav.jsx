import React from "react";
import { useNavigate } from "react-router";
import { useGetCategoriesQuery } from "../services/BookCatService";

const CategoriesList = () => {
  const { data, isLoading, isError } = useGetCategoriesQuery();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-xl">
        Error occurred while fetching categories.
      </div>
    );
  }

  const handleGenreClick = (genre) => {
    navigate(`/book/q/?${genre}`);
  };

  const handleSubgenreClick = (genre, subgenre) => {
    navigate(`/book/q/?${genre}/${subgenre}`);
  };

  return (
    <div className="bg-white p-6 mx-auto h-[400px] overflow-x-hidden w-full sm:w-[768px] md:w-[1024px] lg:max-w-7xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {data?.data?.map((category, index) => (
          <div
            key={index}
            className="min-w-[200px]  p-4 border shadow-sm bg-gray-50"
          >
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              {category.subject}
            </h3>
            <div className="space-y-2">
              {category.genres.map((genre, idx) => (
                <div key={idx}>
                  <div
                    className="flex justify-between border-b pb-2 text-gray-700 text-sm cursor-pointer hover:text-blue-500"
                    onClick={() => handleGenreClick(genre)}
                  >
                    <span>{genre}</span>
                  </div>

                  {category.genres[genre]?.map((subgenre, subIdx) => (
                    <div
                      key={subIdx}
                      className="ml-6 text-gray-500 text-sm cursor-pointer hover:text-blue-400"
                      onClick={() => handleSubgenreClick(genre, subgenre)}
                    >
                      <span>{subgenre}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesList;
