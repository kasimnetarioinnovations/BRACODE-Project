// ProductFormWizard.jsx
import { useState } from "react";
import BasicDetails from "./components/form-steps/GeneralInformation";
import PricingTax from "./components/form-steps/PricingTax";
import InventoryShipping from "./components/form-steps/DescriptionMedia";
import ImagesTags from "./components/form-steps/DescriptionMedia";
import axios from "axios";

const AddProductFormSave = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const updateFormData = (newData) => {
    setFormData((prev) => ({
      ...prev,
      ...newData,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/products", formData);
      if (response.data.success) {
        alert("✅ Product saved successfully!");
        setStep(1);
        setFormData({});
      }
    } catch (error) {
      console.error("❌ Save failed:", error);
      alert("Error saving product.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">🧾 Add New Product</h2>

      {step === 1 && <BasicDetails formData={formData} updateFormData={updateFormData} />}
      {step === 2 && <PricingTax formData={formData} updateFormData={updateFormData} />}
      {step === 3 && <InventoryShipping formData={formData} updateFormData={updateFormData} />}
      {step === 4 && <ImagesTags formData={formData} updateFormData={updateFormData} />}

      <div className="flex justify-between mt-6">
        <button
          onClick={() => setStep((prev) => Math.max(prev - 1, 1))}
          className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
          disabled={step === 1}
        >
          ⬅️ Back
        </button>

        {step < 4 ? (
          <button
            onClick={() => setStep((prev) => prev + 1)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Next ➡️
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            ✅ Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default AddProductFormSave;
