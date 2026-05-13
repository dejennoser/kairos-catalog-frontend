import { useEffect, useState } from "react";
import { apiV1 } from "../api/api";

export default function ProductList({ token, reload }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // ✅ FIX: use apiV1, not api
    apiV1(token)
      .get("/products", {
        headers: { "Accept-Language": "de" },
      })
      .then((res) => setProducts(res.data))
      .catch((err) => {
        console.error("Failed to load products:", err);
      });
  }, [reload, token]);

  return (
    <div>
      <h2>Products</h2>

      {products.length === 0 && <p>No products available.</p>}

      {products.map((p) => (
        <div key={p.id} className="card">
          <h3>{p.translatedName ?? p.name}</h3>

          {(p.translatedDescription || p.description) && (
            <p>{p.translatedDescription ?? p.description}</p>
          )}

          <strong>{p.price} CHF</strong>

          {Array.isArray(p.imageUrls) && p.imageUrls.length > 0 && (
            <div
              style={{
                marginTop: 10,
                display: "flex",
                gap: 10,
                flexWrap: "wrap",
              }}
            >
              {p.imageUrls.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt={p.name}
                  style={{
                    width: "150px",
                    height: "auto",
                    borderRadius: 6,
                    objectFit: "cover",
                    border: "1px solid #ddd",
                  }}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}