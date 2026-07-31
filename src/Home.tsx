import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <Link
      to="/login"
      className="btn btn-lg custom-button"
      role="link"
    >
      Login
    </Link>
  );
};
