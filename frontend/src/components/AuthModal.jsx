"use client"

import { useState } from "react"
import { X, Eye, EyeOff, Loader } from "lucide-react"
import { useAuth } from "../contexts/AuthContext"

const AuthModal = ({ isOpen, onClose, mode, onModeChange }) => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const { login, signup } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      if (mode === "signup") {
        if (formData.password.length < 6) {
          setError("Password must be at least 6 characters long")
          return
        }
        await signup(formData.fullname, formData.email, formData.password)
      } else {
        await login(formData.email, formData.password)
      }
      onClose()
      setFormData({ fullname: "", email: "", password: "" })
    } catch (err) {
      setError(err.message || "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (error) setError("")
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {mode === "login" ? "Sign In" : "Create Account"}
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullname}
                  onChange={(e) => handleChange("fullname", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter your full name"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader className="w-4 h-4 mr-2 animate-spin" />
                  {mode === "login" ? "Signing In..." : "Creating Account..."}
                </>
              ) : mode === "login" ? (
                "Sign In"
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {mode === "login" ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={() => onModeChange(mode === "login" ? "signup" : "login")}
                className="ml-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
              >
                {mode === "login" ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthModal








// import { useNavigate } from "react-router-dom"
// import { useState } from "react"
// import { X, Eye, EyeOff, Loader } from "lucide-react"
// import axios from "axios" 


// const AuthModal = ({ isOpen, onClose, mode, onModeChange, }) => {

//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//   })
//   const [showPassword, setShowPassword] = useState(false)
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState("")
// const navigate = useNavigate()


//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setError("")
//     setLoading(true)

//     try {
//       if (mode === "signup") {
//         if (formData.password.length < 6) {
//           setError("Password must be at least 6 characters long")
//           setLoading(false)
//           return
//         }

//         // ✅ call registration API
//         await axios.post("http://localhost:5000/api/users/register", {
//           fullName: formData.fullName,
//           email: formData.email,
//           password: formData.password,
//         })

//         // optionally show success or auto close
//         onClose()
//         setFormData({ fullName: "", email: "", password: "" })

//       } else {
//         // ✅ call login API here if implemented
//         await axios.post("http://localhost:5000/api/users/login", {
//           email: formData.email,
//           password: formData.password,
//         })

//         onClose()
//         setFormData({ fullName: "", email: "", password: "" })
//         navigate("/dashboard")

//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Something went wrong")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }))
//     if (error) setError("")
//   }

//   if (!isOpen) return null

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//       <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-md w-full">
//         <div className="p-6">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
//               {mode === "login" ? "Sign In" : "Create Account"}
//             </h2>
//             <button
//               onClick={onClose}
//               className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
//             >
//               <X className="w-5 h-5" />
//             </button>
//           </div>

//           {error && (
//             <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
//               <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-4">
//             {mode === "signup" && (
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
//                 <input
//                   type="text"
//                   required
//                   value={formData.fullName}
//                    onChange={(e) => handleChange("fullName", e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
//                   placeholder="Enter your full name"
//                 />
//               </div>
//             )}

//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
//               <input
//                 type="email"
//                 required
//                 value={formData.email}
//                 onChange={(e) => handleChange("email", e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
//                 placeholder="Enter your email"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   required
//                   value={formData.password}
//                   onChange={(e) => handleChange("password", e.target.value)}
//                   className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
//                   placeholder="Enter your password"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
//                 >
//                   {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                 </button>
//               </div>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center"
//             >
//               {loading ? (
//                 <>
//                   <Loader className="w-4 h-4 mr-2 animate-spin" />
//                   {mode === "login" ? "Signing In..." : "Creating Account..."}
//                 </>
//               ) : mode === "login" ? (
//                 "Sign In"
//               ) : (
//                 "Create Account"
//               )}
//             </button>
//           </form>

//           <div className="mt-6 text-center">
//             <p className="text-sm text-gray-600 dark:text-gray-400">
//               {mode === "login" ? "Don't have an account?" : "Already have an account?"}
//               <button
//                 onClick={() => onModeChange(mode === "login" ? "signup" : "login")}
//                 className="ml-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
//               >
//                 {mode === "login" ? "Sign Up" : "Sign In"}
//               </button>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AuthModal

