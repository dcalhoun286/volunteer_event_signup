import { Link } from "react-router-dom";

export const Login = () => {
    return (
        <>
            <h2>LOGIN PAGE</h2>
            <Link
                to="/"
                className="btn btn-lg custom-button"
                role="link"
            >
                Back to home
            </Link>
        </>
    );
};
