import ReactDOM from "react-dom/client";
import App from "./App";
import keycloak from "./auth/keycloak";
import "./index.css";
const root = ReactDOM.createRoot(document.getElementById("root"));

keycloak
  .init({
    onLoad: "login-required",
    pkceMethod: "S256",
    checkLoginIframe: false,
  })
  .then((authenticated) => {
    console.log("Keycloak authenticated:", authenticated);

    // ✅ Make Keycloak globally available (important)
    window.keycloak = keycloak;

    root.render(
      <App keycloak={keycloak} />
    );
  })
  .catch((err) => {
    console.error("Keycloak init failed", err);

    root.render(
      <div style={{ padding: 20 }}>
        <h2>Keycloak initialization failed</h2>
        <pre>{JSON.stringify(err, null, 2)}</pre>
      </div>
    );
  });