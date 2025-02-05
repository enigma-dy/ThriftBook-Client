import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import BookQuery from "./pages/QueryPage";
import BookDetails from "./pages/BookDetails";
import Register from "./pages/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="book/q/" element={<BookQuery />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;
