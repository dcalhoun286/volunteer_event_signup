import { Link } from "react-router-dom";

export const Home = () => (
  <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
    <div className="jumbotron jumbotron-fluid bg-transparent">
      <div className="container secondary-color">
        <h1 className="display-4">Volunteer Event Signup</h1>
        <p className="lead">
          Here's where you can register to give your time to help for our events, all in one place!
        </p>
        <hr className="my-4" />
        <Link
          to=""
          className="btn btn-lg custom-button"
          role="button"
        >
          Login
        </Link>
      </div>
    </div>
  </div>
);
