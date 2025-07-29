import React, { useState } from 'react';
import QRScanner from './QRScanner.jsx';

// Mock product data (replace with real data integration as needed)
const mockProducts = [
  { id: 1, name: 'Product A', price: 100 },
  { id: 2, name: 'Product B', price: 200 },
  { id: 3, name: 'Product C', price: 150 },
];

function generateEAN() {
  let ean = '';
  for (let i = 0; i < 12; i++) {
    ean += Math.floor(Math.random() * 10);
  }
  // Calculate EAN-13 check digit
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(ean[i]) * (i % 2 === 0 ? 1 : 3);
  }
  let check = (10 - (sum % 10)) % 10;
  return ean + check;
}

const POS = () => {
  const [cart, setCart] = useState([]);
  const [showReceipt, setShowReceipt] = useState(false);
  const [lastSale, setLastSale] = useState(null);
  const [showScanner, setShowScanner] = useState(false);
  const [scannerError, setScannerError] = useState("");

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1, ean: generateEAN() }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQty = (productId, qty) => {
    if (qty < 1) return;
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, qty } : item
      )
    );
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const checkout = () => {
    if (cart.length === 0) return;
    const sale = { items: cart, total, date: new Date().toLocaleString() };
    // Save to localStorage (or integrate with backend)
    const sales = JSON.parse(localStorage.getItem('sales') || '[]');
    sales.push(sale);
    localStorage.setItem('sales', JSON.stringify(sales));
    setLastSale(sale);
    setCart([]);
    setShowReceipt(true);
  };

  const closeReceipt = () => setShowReceipt(false);

  const handleScan = (code) => {
    // Try to find product by id, name, or ean
    const product = mockProducts.find(
      (p) => p.id.toString() === code || p.name === code || p.ean === code
    );
    if (product) {
      addToCart(product);
      setScannerError("");
      setShowScanner(false);
    } else {
      setScannerError("Product not found for code: " + code);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Point of Sale (POS)</h1>
      <div className="mb-4 flex gap-2">
        <button
          className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
          onClick={() => setShowScanner(true)}
        >
          Scan Product
        </button>
      </div>
      {showScanner && (
        <QRScanner
          onScan={handleScan}
          onClose={() => setShowScanner(false)}
          title="Scan Product QR/Barcode"
        />
      )}
      {scannerError && (
        <div className="mb-2 text-red-600 font-semibold">{scannerError}</div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product List */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Products</h2>
          <ul>
            {mockProducts.map((product) => (
              <li key={product.id} className="flex justify-between items-center mb-2 p-2 border rounded">
                <span>{product.name} - ₹{product.price}</span>
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  onClick={() => addToCart(product)}
                >
                  Add
                </button>
              </li>
            ))}
          </ul>
        </div>
        {/* Cart */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Cart</h2>
          {cart.length === 0 ? (
            <p className="text-gray-500">Cart is empty.</p>
          ) : (
            <ul>
              {cart.map((item) => (
                <li key={item.id} className="flex justify-between items-center mb-2 p-2 border rounded">
                  <span>{item.name} (₹{item.price})<br/><span className="text-xs text-gray-500">EAN: {item.ean}</span></span>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQty(item.id, item.qty - 1)} className="px-2">-</button>
                    <input
                      type="number"
                      value={item.qty}
                      min={1}
                      onChange={(e) => updateQty(item.id, parseInt(e.target.value))}
                      className="w-12 text-center border rounded"
                    />
                    <button onClick={() => updateQty(item.id, item.qty + 1)} className="px-2">+</button>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-500 ml-2">Remove</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-4 font-bold">Total: ₹{total}</div>
          <button
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={checkout}
            disabled={cart.length === 0}
          >
            Checkout
          </button>
        </div>
      </div>
      {/* Receipt Modal */}
      {showReceipt && lastSale && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full print:max-w-full print:rounded-none print:shadow-none print:p-2" id="receipt-area" style={{fontFamily: 'monospace'}}>
            {/* Shop Info */}
            <div className="text-center mb-2">
              <div className="font-bold text-lg">My Shop Name</div>
              <div className="text-xs">123 Main Street, City, State</div>
              <div className="text-xs mb-2">Phone: 9876543210</div>
              <div className="border-b border-dashed border-gray-400 my-2"></div>
            </div>
            <h2 className="text-base font-bold mb-1 text-center">RECEIPT</h2>
            <div className="mb-1 text-xs text-gray-600 text-center">{lastSale.date}</div>
            <ul className="mb-2">
              {lastSale.items.map((item) => (
                <li key={item.id} className="flex justify-between text-xs">
                  <span>{item.name} x {item.qty}</span>
                  <span>₹{item.price * item.qty}</span>
                </li>
              ))}
            </ul>
            <div className="border-t border-dashed border-gray-400 my-2"></div>
            <div className="font-bold mb-2 flex justify-between text-sm">
              <span>Total</span>
              <span>₹{lastSale.total}</span>
            </div>
            <div className="text-center text-xs mt-2">Thank you for shopping!</div>
            <div className="text-center text-xs">Visit Again</div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full mt-4 print:hidden"
              onClick={() => {
                window.print();
              }}
            >
              Print Receipt
            </button>
            <button
              className="bg-gray-400 text-white px-4 py-2 rounded w-full mt-2 print:hidden"
              onClick={closeReceipt}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default POS;
