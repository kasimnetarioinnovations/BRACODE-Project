"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"

const StepIndicator = ({ steps, currentStep }) => {
  const currentStepData = steps.find((step) => step.id === currentStep)

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Progress Line */}
      <div className="relative mb-6">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center relative z-10">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  currentStep > step.id
                    ? "bg-green-500 border-green-500 text-white"
                    : currentStep === step.id
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "bg-white border-gray-300 text-gray-400"
                }`}
              >
                {currentStep > step.id ? (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }}>
                    <Check className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <span className="text-sm font-semibold">{step.id}</span>
                )}
              </motion.div>
            </div>
          ))}
        </div>

        {/* Progress Line Background */}
        <div className="absolute top-5 left-5 right-5 h-0.5 bg-gray-200 dark:bg-gray-600 -z-10" />

        {/* Animated Progress Line */}
        <motion.div
          initial={{ width: "0%" }}
          animate={{
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute top-5 left-5 h-0.5 bg-blue-600 -z-10"
        />
      </div>

      {/* Current Step Info */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{currentStepData?.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{currentStepData?.description}</p>
      </motion.div>
    </div>
  )
}

export default StepIndicator
