import { ReactKeycloakProvider } from "@react-keycloak/web";
import Keycloak from "keycloak-js";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import { Footer } from "./components/Footer";
import { NavBar } from "./components/NavBar";
import { About } from "./pages/About";
import Translate from "./pages/Translate";

const keycloakEnabled = window._env_.KEYCLOAK_ENABLED;

const kc = new Keycloak({
  url: window._env_.KEYCLOAK_URL,
  realm: window._env_.KEYCLOAK_REALM,
  clientId: window._env_.KEYCLOAK_CLIENT_ID,
});

function App() {
  return (
    <ReactKeycloakProvider
      initOptions={{
        onLoad: keycloakEnabled === "false" ? null : "login-required",
        pkceMethod: "S256",
      }}
      authClient={kc}
      onTokens={({ token }) => {
        localStorage.setItem("token", token as string);
      }}
    >
      <BrowserRouter basename="/rosettastone.kh.svc">
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <NavBar />
          <Routes>
            <Route path="/" element={<Translate />} />
            <Route path="/translate" element={<Translate />} />
            <Route path="/about" element={<About />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </ReactKeycloakProvider>
  );
}

export default App;
