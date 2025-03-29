import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark p-3">
      <Link to="/" className="navbar-brand text-white">
        📚 Book Inventory
      </Link>
    </nav>
  );
};

export default Navbar;
