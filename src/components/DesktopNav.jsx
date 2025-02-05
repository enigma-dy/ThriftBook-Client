import { useSelector, useDispatch } from "react-redux";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import {
  toggleFeatured,
  toggleBookCat,
  toggleCollective,
} from "../features/toggleNav";
import CategoriesList from "./CategoryNav";

const Navigation = () => {
  const itemsWithIcon = ["Featured", "Books", "Collective Books"];
  const dispatch = useDispatch();

  const { featured, book, collective } = useSelector(
    (state) => state.toggleNav
  );

  const handleMouseEnter = (item) => {
    if (item === "Featured") dispatch(toggleFeatured());
    if (item === "Books") dispatch(toggleBookCat());
    if (item === "Collective Books") dispatch(toggleCollective());
  };

  const handleMouseLeave = (item) => {
    if (item === "Featured") dispatch(toggleFeatured());
    if (item === "Books") dispatch(toggleBookCat());
    if (item === "Collective Books") dispatch(toggleCollective());
  };

  return (
    <div className="relative flex flex-wrap items-center justify-between bg-white p-4">
      <ul className="flex flex-wrap space-x-4 md:space-x-6">
        {[
          "Featured",
          "Books",
          "Collective Books",
          "Entertainment",
          "Gifts",
          "e-Gift Cards",
        ].map((item, index) => (
          <li
            key={index}
            className="flex items-center space-x-2 cursor-pointer px-3 py-2 transition-transform transform hover:scale-105 hover:bg-gray-100 rounded-lg"
            onMouseEnter={() => handleMouseEnter(item)}
            onMouseLeave={() => handleMouseLeave(item)}
          >
            <span>{item}</span>
            {itemsWithIcon.includes(item) &&
              (item === "Featured" ? (
                featured ? (
                  <FaChevronUp className="text-gray-500" />
                ) : (
                  <FaChevronDown className="text-gray-500" />
                )
              ) : item === "Books" ? (
                book ? (
                  <div className="relative">
                    <FaChevronUp className="text-gray-500" />
                    <div className="absolute w-full top-5 right-20 bg-white shadow-lg">
                      <CategoriesList />
                    </div>
                  </div>
                ) : (
                  <FaChevronDown className="text-gray-500" />
                )
              ) : item === "Collective Books" ? (
                collective ? (
                  <FaChevronUp className="text-gray-500" />
                ) : (
                  <FaChevronDown className="text-gray-500" />
                )
              ) : null)}
          </li>
        ))}
      </ul>
      <p className="flex items-center space-x-2 cursor-pointer px-3 py-2 transition-transform transform hover:scale-105 hover:bg-gray-100 rounded-lg">
        <span>Sell your Books</span>
        <FaChevronDown className="text-gray-500" />
      </p>
    </div>
  );
};

export default Navigation;
