import { useState } from "react";
import { api } from "../api/api";

export default function CreateProductForm({ token }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    enName: "",
    enDescription: "",
    deName: "",
    deDescription: "",
  });

  const [images, setImages] = useState([]);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onImagesChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const submit = async (e) => {
    e.preventDefault();

    const product = {
      name: form.name,
      description: form.description,
      price: Number(form.price),
      category: form.category,
      stock: Number(form.stock),
      translations: {
        en: {
          name: form.enName,
          description: form.enDescription,
        },
        de: {
          name: form.deName,
          description: form.deDescription,
        },
      },
    };

    const formData = new FormData();
    formData.append("product", JSON.stringify(product));
    images.forEach((img) => formData.append("images", img));

    try {
      // ✅ VERY IMPORTANT: refresh token before POST
      await window.keycloak.updateToken(30);

      await api(window.keycloak.token).post(
        "/products/with-images",
        formData,
        {
          headers: {
            "Accept-Language": "de",
          },
        }
      );

     
      alert("✅ Product created successfully");
      onCreated(); // ✅ refresh product list

      // reset form
      setForm({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        enName: "",
        enDescription: "",
        deName: "",
        deDescription: "",
      });
      setImages([]);
    } catch (err) {
      console.error("Create product error:", err);

      alert(
        err.response
          ? `❌ ${err.response.status}: ${JSON.stringify(err.response.data)}`
          : "❌ Failed to create product"
      );
    }
  };

  return (
    <form onSubmit={submit} style={{ marginTop: 30 }}>
      <h2>Create Product (ADMIN)</h2>

      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={onChange}
        required
      />
      <br />

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={onChange}
        required
      />
      <br />

      <input
        name="price"
        type="number"
        step="0.01"
        placeholder="Price"
        value={form.price}
        onChange={onChange}
        required
      />
      <br />

      <input
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={onChange}
        required
      />
      <br />

      <input
        name="stock"
        type="number"
        placeholder="Stock"
        value={form.stock}
        onChange={onChange}
        required
      />
      <br />

      <h3>Translations</h3>

      <input
        name="enName"
        placeholder="EN Name"
        value={form.enName}
        onChange={onChange}
      />
      <br />

      <textarea
        name="enDescription"
        placeholder="EN Description"
        value={form.enDescription}
        onChange={onChange}
      />
      <br />

      <input
        name="deName"
        placeholder="DE Name"
        value={form.deName}
        onChange={onChange}
      />
      <br />

      <textarea
        name="deDescription"
        placeholder="DE Description"
        value={form.deDescription}
        onChange={onChange}
      />
      <br />

      <h3>Images</h3>
      <input type="file" multiple onChange={onImagesChange} />

      <br />
      <br />

      <button type="submit">Create Product</button>
    </form>
  );
}