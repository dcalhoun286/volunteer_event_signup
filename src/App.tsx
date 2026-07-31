import Routes from "./routes/index";
import { Header } from "./components/layout/header";
import { Main } from "./components/layout/main";
import { Footer } from "./components/layout/footer";

export default (_props: any) => {
    return (
        <div className="vw-100 vh-100 primary-color d-flex justify-content-center">
            <div className="vw-100 vh-100 container secondary-color">
                <Header />
                <Main>
                    {Routes}
                </Main>
                <Footer />
            </div>
        </div>
    );
};
