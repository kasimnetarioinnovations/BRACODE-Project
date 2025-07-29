import React, { useEffect, useRef } from "react"
import { Html5Qrcode } from "html5-qrcode"
import { X } from "lucide-react"

const MobileQRScanner = ({ onScanSuccess, onClose }) => {
  const scannerId = "mobile-qr-reader"
  const qrRef = useRef(null)

  useEffect(() => {
    const qrCode = new Html5Qrcode(scannerId)
    qrRef.current = qrCode

    Html5Qrcode.getCameras().then((devices) => {
      if (devices && devices.length) {
        const camId = devices[0].id
        qrCode.start(
          camId,
          { fps: 10, qrbox: { width: 250, height: 250 } },
          (decodedText) => {
            onScanSuccess(decodedText)
            qrCode.stop()
          },
          (error) => {}
        )
      }
    })

    return () => {
      qrCode.stop().catch(() => {})
    }
  }, [onScanSuccess])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-xl w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-3 right-3 p-2 bg-gray-200 rounded-full">
          <X />
        </button>
        <h2 className="text-lg font-semibold mb-4">Scan QR Code</h2>
        <div id={scannerId} className="w-full" />
      </div>
    </div>
  )
}

export default MobileQRScanner
