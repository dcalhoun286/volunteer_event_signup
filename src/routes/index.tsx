import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "../Home";
import { Login } from "./login/login";
import { Header } from "../components/layout/header";
import { Main } from "../components/layout/main";
import { Footer } from "../components/layout/footer";

export default (
    <Router>
        <div className="vw-100 vh-100 primary-color d-flex justify-content-center">
            <div className="vw-100 vh-100 container secondary-color">
                <Header />
                <Main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </Main>
                <Footer />
            </div>
        </div>
    </Router>
);
