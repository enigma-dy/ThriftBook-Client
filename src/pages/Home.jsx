import React from "react";
import { useGetBooksQuery } from "../services/BookService";
import { useNavigate } from "react-router";
import Slider from "../components/Carousel";
import TopBooks from "../components/TopBooks";

const Home = () => {
  const { data, error, isLoading } = useGetBooksQuery({
    skip: 0,
    limit: 30,
    sort: "createdAt:desc",
  });

  const navigate = useNavigate();

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-3xl font-bold text-gray-700 animate-pulse">
          Loading books...
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-3xl font-bold text-red-600">
          Error fetching books: {error.message}
        </div>
      </div>
    );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="">
        <Slider />
      </div>

      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data?.data.map((book) => (
          <div
            key={book._id}
            className="relative bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden cursor-pointer hover:scale-105 w-64 h-64"
            onClick={() => navigate(`/book/${book._id}`)}
          >
            <div
              className="w-full h-1/2 bg-cover bg-center rounded-t-lg"
              style={{ backgroundImage: `url(${book.image.url})` }}
            ></div>
            <div className="p-2 h-1/2">
              <h2 className="text-lg font-bold text-gray-900 mb-1">
                {book.title}
              </h2>
              <p className="text-gray-600 text-xs mb-2">
                {book.description.substring(0, 50)}...
              </p>
              <div className="text-xs text-gray-700 space-y-1">
                <p>
                  Category:{" "}
                  <span className="font-medium text-blue-600">
                    {book.category}
                  </span>
                </p>
                <p>
                  Price:{" "}
                  <span className="font-medium text-red-600">
                    ${book.newPrice.toFixed(2)}
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <TopBooks />
      </div>
    </div>
  );
};

export default Home;
