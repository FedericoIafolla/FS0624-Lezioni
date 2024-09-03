import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MainSearch from "./components/MainSearch";
import CompanySearchResults from "./components/CompanySearchResults";
import Favourites from "./components/Favourites";
import CompanyDetailsPage from "./components/CompanyDetailsPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainSearch />} />
          <Route path="/:company" element={<CompanySearchResults />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/company-details/:company" element={<CompanyDetailsPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
