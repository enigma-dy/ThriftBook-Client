import { Outlet } from "react-router";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import DesktopNavigation from "./DesktopNav.jsx";
import MobileNav from "./MobileNav.jsx";
import { useMediaQuery } from "react-responsive";

const Layout = () => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  return (
    <div className="relative min-h-screen flex flex-col">
      <Header />

      <div className="relative z-10 bg-white shadow-md">
        {isTabletOrMobile ? (
          <MobileNav aria-hidden={!isTabletOrMobile} />
        ) : (
          <DesktopNavigation aria-hidden={isTabletOrMobile} />
        )}
      </div>

      <main className="flex-grow relative z-0">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
