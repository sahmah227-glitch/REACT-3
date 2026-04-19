import { useState, useRef } from "react";
import "../styles/product.css";

export default function ProductApp() {
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [mode, setMode] = useState("controlled"); // switch

  // controlled
  const [form, setForm] = useState({
    name: "",
    price: "",
    quantity: "",
    category: "",
    freeShipping: false,
  });

  // uncontrolled refs
  const nameRef = useRef();
  const priceRef = useRef();
  const quantityRef = useRef();
  const categoryRef = useRef();
  const shippingRef = useRef();

  // controlled change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // get data depending on mode
  const getData = () => {
    if (mode === "controlled") {
      return { ...form };
    } else {
      return {
        name: nameRef.current.value,
        price: priceRef.current.value,
        quantity: quantityRef.current.value,
        category: categoryRef.current.value,
        freeShipping: shippingRef.current.checked,
      };
    }
  };

  const clearForm = () => {
    setForm({
      name: "",
      price: "",
      quantity: "",
      category: "",
      freeShipping: false,
    });

    if (nameRef.current) {
      nameRef.current.value = "";
      priceRef.current.value = "";
      quantityRef.current.value = "";
      categoryRef.current.value = "";
      shippingRef.current.checked = false;
    }
  };

  const handleAdd = () => {
    const newProduct = {
      id: Date.now(),
      ...getData(),
    };

    setProducts([...products, newProduct]);
    clearForm();
  };

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleEdit = (p) => {
    setEditId(p.id);

    if (mode === "controlled") {
      setForm(p);
    } else {
      nameRef.current.value = p.name;
      priceRef.current.value = p.price;
      quantityRef.current.value = p.quantity;
      categoryRef.current.value = p.category;
      shippingRef.current.checked = p.freeShipping;
    }
  };

  const handleUpdate = () => {
    const updated = {
      id: editId,
      ...getData(),
    };

    setProducts(products.map((p) => (p.id === editId ? updated : p)));

    setEditId(null);
    clearForm();
  };

  return (
    <div className="page">
      <h2 className="title">Product List</h2>

     
      <div className="form-container">
        <label>Product Name</label>
        <input
          name="name"
          placeholder="Enter Product Name"
          value={mode === "controlled" ? form.name : undefined}
          onChange={mode === "controlled" ? handleChange : undefined}
          ref={mode === "uncontrolled" ? nameRef : null}
        />

        <label>Product Price</label>
        <input
          name="price"
          placeholder="Enter Product Price"
          value={mode === "controlled" ? form.price : undefined}
          onChange={mode === "controlled" ? handleChange : undefined}
          ref={mode === "uncontrolled" ? priceRef : null}
        />

        <label>Product Quantity</label>
        <input
          name="quantity"
          placeholder="Quantity"
          value={mode === "controlled" ? form.quantity : undefined}
          onChange={mode === "controlled" ? handleChange : undefined}
          ref={mode === "uncontrolled" ? quantityRef : null}
        />

        <label>Product Category</label>
        <input
          name="category"
          placeholder="Category"
          value={mode === "controlled" ? form.category : undefined}
          onChange={mode === "controlled" ? handleChange : undefined}
          ref={mode === "uncontrolled" ? categoryRef : null}
        />

        <div className="checkbox">
          <input
            type="checkbox"
            name="freeShipping"
            checked={mode === "controlled" ? form.freeShipping : undefined}
            onChange={mode === "controlled" ? handleChange : undefined}
            ref={mode === "uncontrolled" ? shippingRef : null}
          />
          Free Shipping
        </div>

        {editId ? (
          <button onClick={handleUpdate}>Update</button>
        ) : (
          <button onClick={handleAdd}>Add New Product</button>
        )}
      </div>

      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>Free shipping</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>{p.quantity}</td>
              <td>{p.category}</td>
              <td>{p.freeShipping ? "Yes" : "No"}</td>
              <td>
                <button className="edit" onClick={() => handleEdit(p)}>Edit</button>
                <button className="delete" onClick={() => handleDelete(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}