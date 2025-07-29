import React, { useState } from "react"
import QRScanner from "../components/QRScanner"
import MobileQRScanner from "../components/MobileQRScanner"

const QrDemo = () => {
  const [code, setCode] = useState("")
  const [showGen, setShowGen] = useState(false)
  const [showScan, setShowScan] = useState(false)

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">QR Code Demo</h1>
      <div className="flex gap-4">
        <button onClick={() => setShowGen(true)} className="bg-blue-600 text-white px-4 py-2 rounded">
          Generate QR
        </button>
        <button onClick={() => setShowScan(true)} className="bg-green-600 text-white px-4 py-2 rounded">
          Scan QR (Mobile)
        </button>
      </div>

      {code && <p className="mt-6 text-lg">✅ Scanned Code: <strong>{code}</strong></p>}

      {showGen && (
        <QRScanner
          onScan={(value) => {
            setCode(value)
            setShowGen(false)
          }}
          onClose={() => setShowGen(false)}
          title="Product QR"
        />
      )}

      {showScan && (
        <MobileQRScanner
          onScanSuccess={(value) => {
            setCode(value)
            setShowScan(false)
          }}
          onClose={() => setShowScan(false)}
        />
      )}
    </div>
  )
}

export default QrDemo
