import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "../Home";
import { Login } from "./login/login";

export default (
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    </Router>
);