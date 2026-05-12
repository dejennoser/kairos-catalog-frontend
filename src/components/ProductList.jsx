import { useEffect, useState } from "react";
import { api } from "../api/api";

export default function ProductList({ token, reload }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api(token)
      .get("/products", {
        headers: { "Accept-Language": "de" },
      })
      .then((res) => setProducts(res.data))
      .catch((err) => {
        console.error("Failed to load products:", err);
      });
  }, [reload, token]); // ✅ re-fetch when reload or token changes

  return (
    <div>
      <h2>Products</h2>

      {products.length === 0 && <p>No products available.</p>}

      {products.map((p) => (
        <div key={p.id} className="card">
          {/* ✅ Product name */}
          <h3>{p.translatedName ?? p.name}</h3>

          {/* ✅ Product description */}
          {(p.translatedDescription || p.description) && (
            <p>{p.translatedDescription ?? p.description}</p>
          )}

          {/* ✅ Price */}
          <strong>{p.price} CHF</strong>

          {/* ✅ Images */}
          {p.imageUrls && p.imageUrls.length > 0 && (
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