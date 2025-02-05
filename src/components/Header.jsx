import { FaStar, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useGetCurrentUserQuery } from "../services/userService";
import Avatar from "react-avatar";

const Header = () => {
  const { data: currentUser, isLoading } = useGetCurrentUserQuery(undefined, {
    credentials: "include",
  });
  const navigate = useNavigate();

  console.log(currentUser);
  const handleLoginBtn = () => {
    navigate("/login");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };
  const navigateToHome = () => {
    navigate("/");
  };

  return (
    <header className="bg-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between flex-wrap">
        <div
          className="text-lg font-bold text-blue-500 flex-shrink-0 cursor-pointer select-none"
          onClick={navigateToHome}
        >
          ThriftBooks
        </div>

        <div className="flex-1 mx-4 hidden md:block">
          <input
            type="search"
            placeholder="Search..."
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center space-x-4 mt-2 md:mt-0">
          <FaStar className="text-yellow-500 text-xl" />
          <FaShoppingCart className="text-gray-700 text-xl" />

          {!isLoading ? (
            currentUser ? (
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={handleProfileClick}
              >
                <Avatar
                  name={currentUser?.data?.fullName}
                  size="30"
                  round={true}
                />
              </div>
            ) : (
              <button
                className="text-blue-500 font-medium"
                onClick={handleLoginBtn}
              >
                Log in
              </button>
            )
          ) : (
            <span className="text-gray-500">Loading...</span>
          )}
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="block md:hidden mt-4">
        <input
          type="search"
          placeholder="Search..."
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </header>
  );
};

export default Header;
