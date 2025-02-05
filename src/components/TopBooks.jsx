import { useGetTopBooksQuery } from "../services/BookService";

const TopBooks = () => {
  const { data, isLoading, error } = useGetTopBooksQuery({});

  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500">Failed to load books.</p>;

  return (
    <div className="max-w-5xl p-6">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Top Purchased Books
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.data?.map((book, index) => (
          <div
            key={index}
            className="flex bg-white shadow-md rounded-lg p-4 border border-gray-300"
          >
            {book.image?.url && (
              <img
                src={book.image.url}
                alt={book.bookTitle}
                className="w-24 h-32 object-cover rounded-md"
              />
            )}
            <div className="ml-4 flex flex-col justify-between w-full">
              <h3 className="text-lg font-semibold">{book.bookTitle}</h3>
              <p className="text-gray-600 text-sm mt-2 line-clamp-3 overflow-hidden">
                {book.bookDescription}
              </p>
              <p className="mt-3 text-sm font-medium text-gray-500">
                Purchased: {book.purchaseCount} times
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopBooks;
