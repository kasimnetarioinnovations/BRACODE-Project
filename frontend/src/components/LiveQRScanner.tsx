"use client"

import { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { X } from "lucide-react";

interface LiveQRScannerProps {
  onScanSuccess: (result: string) => void;
  onClose: () => void;
}

const LiveQRScanner: React.FC<LiveQRScannerProps> = ({ onScanSuccess, onClose }) => {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner("qr-scanner", {
      fps: 10,
      qrbox: { width: 250, height: 250 },
      rememberLastUsedCamera: true,
    });

    scanner.render(
      (decodedText: string) => {
        console.log("✅ QR Code Scanned:", decodedText);
        onScanSuccess(decodedText);
        scanner
          .clear()
          .catch((err) => console.error("Failed to clear scanner:", err));
      },
      (errorMessage: string) => {
        if (errorMessage.includes("NotFoundException")) {
          console.warn("No QR code detected:", errorMessage);
        }
      }
    );

    return () => {
      scanner
        .clear()
        .catch((err) => console.error("Scanner cleanup error:", err));
    };
  }, [onScanSuccess]);

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-semibold mb-4 text-center text-gray-900 dark:text-white">
          Scan QR Code
        </h2>
        <div id="qr-scanner" className="w-full" />
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 text-center">
          Align the QR code within the box to scan.
        </p>
      </div>
    </div>
  );
};

export default LiveQRScanner;
