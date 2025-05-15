import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Card, Table } from 'react-bootstrap';
import jsPDF from 'jspdf';
import "jspdf-autotable"; // Pastikan autoTable diimpor
import { FaCartArrowDown } from "react-icons/fa";  // Ikon Cart

const CashierDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get('http://localhost:5000/products');
    setProducts(res.data);
  };

  const addToOrder = (product) => {
    const exist = orders.find(item => item.id === product.id);
    if (exist) {
      setOrders(orders.map(o => o.id === product.id ? { ...o, qty: o.qty + 1 } : o));
    } else {
      setOrders([...orders, { ...product, qty: 1 }]);
    }
  };

  const printReceipt = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // Set Font
    doc.setFont("courier", "normal");

    // Nama Toko
    doc.setFontSize(14);
    doc.text("COFFESHOP", pageWidth / 2, 15, { align: "center" });

    // Garis pemisah setelah nama toko
    doc.setFontSize(10);
    doc.text("-----------------------------------", pageWidth / 2, 20, { align: "center" });

    // Tanggal dan Waktu Transaksi
    const now = new Date();
    const date = now.toLocaleDateString("id-ID");
    const time = now.toLocaleTimeString("id-ID");
    doc.text(`Tanggal: ${date}`, 20, 27);
    doc.text(`Waktu: ${time}`, pageWidth - 20, 27, { align: "right" });

    let y = 35;

    // Header tabel
    doc.text("No", 20, y);
    doc.text("Item", 35, y);
    doc.text("Qty", pageWidth - 60, y, { align: "right" });
    doc.text("Total", pageWidth - 20, y, { align: "right" });

    y += 5;

    // Isi item pembelian
    orders.forEach((item, index) => {
        doc.text(`${index + 1}`, 20, y);
        doc.text(`${item.name}`, 35, y);
        doc.text(`${item.qty}`, pageWidth - 60, y, { align: "right" });
        doc.text(`Rp ${item.qty * item.price}`, pageWidth - 20, y, { align: "right" });
        y += 7;
    });

    y += 5;

    // Total Bayar
    let total = orders.reduce((acc, item) => acc + item.qty * item.price, 0);
    doc.setFontSize(12);
    doc.text("Total Bayar:", 20, y);
    doc.setFontSize(14);
    doc.text(`Rp ${total.toLocaleString("id-ID")}`, pageWidth - 20, y, { align: "right" });

    y += 10;

    // Ucapan Terima Kasih
    doc.setFontSize(12);
    doc.text("Terima kasih telah berbelanja!", pageWidth / 2, y, { align: "center" });

    // Cetak struk
    doc.autoPrint();
    window.open(doc.output("bloburl"), "_blank");

    // Reset orders setelah mencetak struk
    setOrders([]);
  };

  return (
    <Container fluid className="mt-3">
      <Row>
        {/* Product List moved to the left */}
        <Col md={8}>
          <h5>Produk</h5>
          <Row>
            {products.map(product => (
              <Col key={product.id} sm={6} md={4} className="mb-3">
              <Card style={{ height: '100%' }}>
                <div style={{ height: '180px', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Card.Img
                    variant="top"
                    src={`http://localhost:5000/public/images/${product.image}`}
                    alt={product.name}
                    style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'cover' }}
                  />
                </div>
                <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>Rp{product.price}</Card.Text>
                  </div>
                  <Button variant="primary" onClick={() => addToOrder(product)}>Tambah</Button>
                </Card.Body>
              </Card>
            </Col>
            ))}
          </Row>
        </Col>

        {/* Order List moved to the right */}
        <Col md={4}>
          <h5>Order List</h5>
          <Table striped bordered>
            <thead>
              <tr>
                <th>Produk</th>
                <th>Qty</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td>{order.name}</td>
                  <td>{order.qty}</td>
                  <td>Rp{(order.qty * order.price).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button variant="primary" onClick={printReceipt}>
            <FaCartArrowDown /> Bayar & Cetak Struk
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default CashierDashboard;
