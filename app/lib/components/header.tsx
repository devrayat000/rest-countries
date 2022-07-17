import { Link } from "@remix-run/react";
import ThemeButton from "./theme-button";

const Header = () => {
  return (
    <header className="sticky z-50 bg-light-card dark:bg-dark-card top-0 px-5 py-7 shadow-md">
      <div className="flex justify-between items-center">
        <Link to="/" className="no-underline font-bold my-0 text-inherit">
          Where in the world?
        </Link>
        <ThemeButton />
      </div>
    </header>
  );
};

export default Header;
