import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import ContactPage from "../../pages/contact";
import Dashboard from "../../pages/dashbord";
import InterventionsPage from "../../pages/intervention";

function AppContent() {
  return (
    <>
      <header className="d-flex justify-content-between header">
        <img src="/logo.png" alt="Logo" className="logo" />
        {/* <h1>Gestion des Interventions de Maintenance</h1> */}
        <nav>
          <Link to="/app/home">Accueil</Link>
          <Link to="/app/interventions">Interventions</Link>
          <Link to="/app/contact">Contact</Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="home" element={<Dashboard />} />
          <Route path="interventions" element={<InterventionsPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Routes>
      </main>
    </>
  );
}

export default AppContent;
