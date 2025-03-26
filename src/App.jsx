import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/principals/Navbar";
import Footer from "./components/principals/Footer";
import Home from "./components/index/Home.jsx";
import Noticias from "./components/noticias/Noticias.jsx";
import Descubrimientos from "./components/descubrimientos/Descubrimientos.jsx";
import Expertos from "./components/expertos/Expertos.jsx";
import PrincipalViews from "./components/uploadnews/principalviews.jsx";
function App() {
  useEffect(() => {
    document.documentElement.style.overflowY = "scroll"; // Scroll siempre visible
  }, []);

  return (
    <BrowserRouter>
      <div style={styles.container}>
        <Navbar />
        <div style={styles.content}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/noticias" element={<Noticias />} />
            <Route path="/descubrimientos" element={<Descubrimientos />} />
            <Route path="/expertos" element={<Expertos />} />
            <Route path="/uploadnews" element={<PrincipalViews />} />

          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  content: {
    flex: 1,
    padding: "20px",
  },
};

export default App;
