import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "../Home";

export default (
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
    </Router>
);