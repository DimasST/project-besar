import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table, Button, Form, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const DashboardAdmin = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]); // State untuk menyimpan daftar user
  const [newProduct, setNewProduct] = useState({
    code: "",
    name: "",
    price: "",
    is_ready: true,
    image: null,
    category_id: 1,
  });
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    role: "kasir", // Default role "user"
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [newPrices, setNewPrices] = useState({});

  useEffect(() => {
    axios.get("http://localhost:5000/products")
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the products!", error);
      });

    // Fetch users data
    axios.get("http://localhost:5000/users")
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the users!", error);
      });
  }, []);

  const handleAddProduct = async () => {
    const formData = new FormData();
    formData.append("code", newProduct.code);
    formData.append("name", newProduct.name);
    formData.append("price", newProduct.price);
    formData.append("is_ready", newProduct.is_ready);
    formData.append("category_id", newProduct.category_id);
    if (newProduct.image) {
      formData.append("image", newProduct.image);
    }

    try {
      const response = await axios.post("http://localhost:5000/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setProducts([...products, response.data]);
      setNewProduct({
        code: "",
        name: "",
        price: "",
        is_ready: true,
        image: null,
        category_id: 1,
      });
      setSuccess("Product added successfully!");
    } catch (error) {
      setError("Error adding product!");
      console.error('Error adding product:', error);
    }
  };

  const handleAddUser = async () => {
    try {
      const response = await axios.post("http://localhost:5000/users", newUser);
      setUsers([...users, response.data]);
      setNewUser({
        username: "",
        password: "",
        role: "user",
      });
      setSuccess("User added successfully!");
    } catch (error) {
      setError("Error adding user!");
      console.error('Error adding user:', error);
    }
  };

  const handleChangeProduct = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const handleChangeUser = (e) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/products/${id}`)
      .then(() => {
        setProducts(products.filter(product => product.id !== id));
        setSuccess("Product deleted successfully!");
      })
      .catch(error => {
        setError("Error deleting product!");
        console.error('Error deleting product:', error);
      });
  };

  const handleUpdate = (product) => {
    const updatedPrice = newPrices[product.id];

    if (!updatedPrice || isNaN(updatedPrice)) {
      setError("Please enter a valid price!");
      return;
    }

    const updatedProduct = { ...product, price: parseFloat(updatedPrice) };
    axios.put(`http://localhost:5000/products/${product.id}`, updatedProduct)
      .then(response => {
        setProducts(products.map(p => p.id === product.id ? response.data : p));
        setSuccess("Product updated successfully!");
        setNewPrices({ ...newPrices, [product.id]: "" });
      })
      .catch(error => {
        setError("Error updating product!");
        console.error('Error updating product:', error);
      });
  };

  const handlePriceChange = (e, productId) => {
    const value = e.target.value;
    setNewPrices({
      ...newPrices,
      [productId]: value, // Update the price for the specific product
    });
  };
  

  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-between mb-4">
        <h1>Dashboard Admin</h1>
        <Button variant="primary" size="sm" onClick={() => navigate('/login')}>
          Logout
        </Button>
      </div>

      {/* Success and Error Alerts */}
      {success && <Alert variant="success">{success}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Add New User Form */}
      <h2>Add New User</h2>
      <Form>
        <Row className="mb-3">
          <Col>
            <Form.Control
              type="text"
              name="username"
              placeholder="Username"
              value={newUser.username}
              onChange={handleChangeUser}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={newUser.password}
              onChange={handleChangeUser}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Select
              name="role"
              value={newUser.role}
              onChange={handleChangeUser}
            >
              <option value="kasir">Kasir</option>
              <option value="admin">Admin</option>
            </Form.Select>
          </Col>
        </Row>
        <Button variant="primary" onClick={handleAddUser}>Add User</Button>
      </Form>

      {/* Add New Product Form */}
      <h2 className="mt-5">Add New Product</h2>
      <Form>
        <Row className="mb-3">
          <Col>
            <Form.Control
              type="text"
              name="code"
              placeholder="Product Code"
              value={newProduct.code}
              onChange={handleChangeProduct}
            />
          </Col>
          <Col>
            <Form.Control
              type="text"
              name="name"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={handleChangeProduct}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Control
              type="number"
              name="price"
              placeholder="Price"
              value={newProduct.price}
              onChange={handleChangeProduct}
            />
          </Col>
          <Col>
            <Form.Control
              type="file"
              name="image"
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.files[0] })}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Select
              name="category_id"
              value={newProduct.category_id}
              onChange={handleChangeProduct}
            >
              <option value="1">Makanan</option>
              <option value="2">Minuman</option>
              <option value="3">Lainnya</option>
            </Form.Select>
          </Col>
        </Row>
        <Button variant="primary" onClick={handleAddProduct}>Add Product</Button>
      </Form>

      {/* Product List Table */}
      <h2 className="mt-5">Product List</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.code}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.category_id === 1 ? "Makanan" : product.category_id === 2 ? "Minuman" : "Lainnya"}</td>
              <td>
                <input
                  type="number"
                  value={newPrices[product.id] || ""}
                  onChange={(e) => handlePriceChange(e, product.id)}
                  placeholder="Enter new price"
                />
                <Button variant="warning" size="sm" onClick={() => handleUpdate(product)}>Update Price</Button>{' '}
                <Button variant="danger" size="sm" onClick={() => handleDelete(product.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default DashboardAdmin;
