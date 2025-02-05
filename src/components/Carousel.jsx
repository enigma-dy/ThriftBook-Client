import React from "react";
import { useGetBooksQuery } from "../services/BookService";
import { useNavigate } from "react-router";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const Slider = () => {
  const { data, error, isLoading } = useGetBooksQuery({
    skip: 0,
    limit: 10,
    sort: "createdAt:desc",
  });

  const navigate = useNavigate();

  if (isLoading) return <div>Loading books...</div>;
  if (error) return <div>Error fetching books: {error.message}</div>;

  return (
    <div>
      <Carousel
        showArrows={true}
        showThumbs={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={2000}
      >
        {data?.data.map((book) => (
          <div
            key={book._id}
            className="relative overflow-hidden"
            onClick={() => navigate(`/book/${book._id}`)}
          >
            <img
              src={book.image.url}
              alt={book.title}
              className="w-full h-80 object-cover"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col justify-center items-center text-white p-4">
              <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
              <p className="text-sm mb-2">
                {book.description.substring(0, 100)}...
              </p>
              <p className="text-sm mb-2">Category: {book.category}</p>
              <p className="text-lg font-bold mb-2">
                ${book.newPrice.toFixed(2)}
              </p>
              {book.oldPrice && (
                <p className="text-sm line-through">
                  Old Price: ${book.oldPrice.toFixed(2)}
                </p>
              )}
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Slider;
