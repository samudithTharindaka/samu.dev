import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HomePage } from "./pages/HomePage/HomePage";
import { WebProjectsPage } from "./pages/WebProjectsPage/WebProjectsPage";
import { ProjectDetailPage } from "./pages/ProjectDetailPage/ProjectDetailPage";
import { GameGalleryPage } from "./pages/GameGalleryPage/GameGalleryPage";
import { JourneyPage } from "./pages/JourneyPage/JourneyPage";
import { createLenis, destroyLenis } from "./motion/lenis";
import "./styles/global.css";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppRoutes() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    document.documentElement.classList.toggle("is-home", isHome);
    document.body.style.overflow = isHome ? "hidden" : "";

    const lenis = createLenis();
    if (isHome) lenis.stop();
    else lenis.start();

    return () => {
      document.documentElement.classList.remove("is-home");
      document.body.style.overflow = "";
      destroyLenis();
    };
  }, [isHome]);

  return (
    <>
      <ScrollToTop />
      <div className="grain" aria-hidden />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/works/web" element={<WebProjectsPage />} />
        <Route path="/works/web/:slug" element={<ProjectDetailPage />} />
        <Route path="/works/games" element={<GameGalleryPage />} />
        <Route path="/journey/:type" element={<JourneyPage />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
