import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="text-center mt-5">
      <h2 className="text-danger">404 - Page Not Found</h2>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn btn-primary">Go Home</Link>
    </div>
  );
};

export default NotFound;
