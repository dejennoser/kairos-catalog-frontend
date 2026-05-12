import { useState } from "react";
import ProductList from "./components/ProductList";
import CreateProductForm from "./components/CreateProductForm";

export default function App({ keycloak }) {
  const [reload, setReload] = useState(0);
  const roles = keycloak.tokenParsed.realm_access.roles;

  return (
    <div className="container">
      <h1>Kairos Frontend</h1>

      <p>
        Logged in as:{" "}
        <strong>{keycloak.tokenParsed.preferred_username}</strong>
      </p>

      {/* ✅ Product list card */}
      <div className="card">
        <ProductList token={keycloak.token} reload={reload} />
      </div>

      {/* ✅ Admin-only create form card */}
      {roles.includes("ADMIN") && (
        <div className="card">
          <CreateProductForm
            token={keycloak.token}
            onCreated={() => setReload((r) => r + 1)}
          />
        </div>
      )}

      <button onClick={() => keycloak.logout()}>Logout</button>
    </div>
  );
}