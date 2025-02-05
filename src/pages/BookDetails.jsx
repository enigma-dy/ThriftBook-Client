import React from "react";
import { useParams } from "react-router";
import {
  useGetSingleBookQuery,
  useInitiatePaymentMutation,
} from "../services/BookService";
import { useGetCurrentUserQuery } from "../services/userService";

const BookDetails = () => {
  const { id } = useParams();
  const { data: currentUser, isLoadingUser } = useGetCurrentUserQuery(
    undefined,
    {
      credentials: "include",
    }
  );
  const { data, error, isLoading } = useGetSingleBookQuery({ id });
  const [initiatePayment] = useInitiatePaymentMutation();

  if (isLoading)
    return (
      <div className="text-center text-lg font-semibold py-4">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  if (error)
    return (
      <div className="text-center text-lg font-semibold py-4 text-red-500">
        Error fetching book details: {error.message}
      </div>
    );

  const book = data?.data;

  const handlePayment = async () => {
    try {
      if (!currentUser) {
        return alert("Login to make payment URL.");
      }
      const response = await initiatePayment({
        amount: book.newPrice,
        bookId: id,
      }).unwrap();
      console.log("Payment response:", response);

      const { authorization_url } = response.data;
      console.log("Redirecting to:", authorization_url);

      if (authorization_url) {
        window.location.href = authorization_url;
      } else {
        alert("Failed to get payment URL.");
      }
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Failed to initiate payment. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-6 pt-12 md:pt-24">
      <div className="flex flex-col items-center mb-12">
        <h1 className="text-5xl font-bold text-center mb-4 text-blue-600">
          {book.title}
        </h1>
        <p className="text-lg text-gray-500 text-center">
          Discover the story behind {book.title}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-100 rounded-lg shadow-lg">
          <img
            src={book.image.url}
            alt={book.title}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <p className="text-lg text-gray-700 mb-4">{book.description}</p>
            <div className="flex flex-wrap mb-4">
              <p className="text-sm text-gray-500 mr-4">
                Category: <span className="font-medium">{book.category}</span>
              </p>
              <p className="text-sm text-gray-500 mr-4">
                Genre: <span className="font-medium">{book.genre}</span>
              </p>
              <p className="text-sm text-gray-500">
                Trending:{" "}
                <span
                  className={`font-medium ${
                    book.trending ? "text-green-500" : "text-gray-500"
                  }`}
                >
                  {book.trending ? "Yes" : "No"}
                </span>
              </p>
            </div>
          </div>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-4">
              <p className="text-2xl font-bold text-red-600">
                ${book.newPrice.toFixed(2)}
              </p>
              {book.oldPrice && (
                <p className="text-sm text-gray-400 line-through">
                  ${book.oldPrice.toFixed(2)}
                </p>
              )}
            </div>
            <button
              onClick={handlePayment}
              className="px-6 py-3 bg-green-600 text-white text-lg font-semibold rounded-lg shadow hover:bg-green-700"
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
