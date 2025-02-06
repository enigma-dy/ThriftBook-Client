import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import {
  toggleFeatured,
  toggleBookCat,
  toggleCollective,
} from "../features/toggleNav";
import CategoriesList from "./CategoryNav";
import { IoMenuSharp } from "react-icons/io5";

const MobileNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for toggling menu
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
    <div className="bg-white shadow-md p-4">
      {/* Hamburger Icon */}
      <div
        className="flex items-center justify-between mb-4"
        onClick={() => setIsMenuOpen((prev) => !prev)} // Toggle menu visibility
      >
        <IoMenuSharp className="text-2xl cursor-pointer" />
      </div>

      {/* Menu Content */}
      {isMenuOpen && (
        <div>
          <ul className="space-y-3">
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
                className="group flex items-center justify-between px-4 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer transition"
                onMouseEnter={() => handleMouseEnter(item)}
                onMouseLeave={() => handleMouseLeave(item)}
              >
                <span className="font-medium text-gray-700 group-hover:text-gray-900">
                  {item}
                </span>
                {itemsWithIcon.includes(item) &&
                  (item === "Featured" ? (
                    featured ? (
                      <FaChevronUp className="text-gray-500" />
                    ) : (
                      <FaChevronDown className="text-gray-500" />
                    )
                  ) : item === "Books" ? (
                    book ? (
                      <div className="flex items-center space-x-2">
                        <FaChevronUp className="text-gray-500" />
                        <div className="pl-4">
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
          <p className="flex items-center justify-between px-4 py-3 mt-6 bg-blue-500 text-white font-medium rounded-lg cursor-pointer hover:bg-blue-600 transition">
            <span>Sell your Books</span>
            <FaChevronDown />
          </p>
        </div>
      )}
    </div>
  );
};

export default MobileNav;
