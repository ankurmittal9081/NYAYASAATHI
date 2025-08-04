// // // // // "use client"

// // // // // import { useState, useEffect } from "react"
// // // // // import { useAuth } from "../context/AuthContext"
// // // // // import { Link, Navigate } from "react-router-dom"
// // // // // import Spinner from "../components/Spinner"
// // // // // import {
// // // // //   User,
// // // // //   Mail,
// // // // //   Lock,
// // // // //   CreditCard,
// // // // //   Users,
// // // // //   Building,
// // // // //   Phone,
// // // // //   Award,
// // // // //   MapPin,
// // // // //   Eye,
// // // // //   EyeOff,
// // // // //   Scale,
// // // // //   ArrowRight,
// // // // //   Search,
// // // // // } from "lucide-react"
// // // // // import apiClient from "../api/axiosConfig"
// // // // // import toast from "react-hot-toast"

// // // // // const RegisterPage = () => {
// // // // //   const { register, isAuthenticated, isLoading } = useAuth()
// // // // //   const [formData, setFormData] = useState({
// // // // //     fullName: "",
// // // // //     email: "",
// // // // //     password: "",
// // // // //     aadhaarNumber: "",
// // // // //     role: "citizen",
// // // // //     phoneNumber: "",
// // // // //     department: "",
// // // // //     designation: "",
// // // // //     roleLevel: "staff",
// // // // //     kioskId: "",
// // // // //     areasOfExpertise: [],
// // // // //     // Admin fields are kept for completeness but should be secured on the backend
// // // // //     assignedDistricts: [],
// // // // //     status: "active",
// // // // //     adminRole: "DistrictAdmin",
// // // // //   })
// // // // //   const [error, setError] = useState(null)
// // // // //   const [loading, setLoading] = useState(false)
// // // // //   const [showPassword, setShowPassword] = useState(false)
// // // // //   const [kiosks, setKiosks] = useState([])
// // // // //   const [loadingKiosks, setLoadingKiosks] = useState(false)
// // // // //   const [kioskSearch, setKioskSearch] = useState("")
// // // // //   const [filteredKiosks, setFilteredKiosks] = useState([])

// // // // //   useEffect(() => {
// // // // //     if (formData.role === "employee") {
// // // // //       fetchKiosks()
// // // // //     }
// // // // //   }, [formData.role])

// // // // //   useEffect(() => {
// // // // //     if (kioskSearch.trim()) {
// // // // //       const lowerCaseSearch = kioskSearch.toLowerCase()
// // // // //       const filtered = kiosks.filter(
// // // // //         (kiosk) =>
// // // // //           kiosk.location?.toLowerCase().includes(lowerCaseSearch) ||
// // // // //           kiosk.village?.toLowerCase().includes(lowerCaseSearch) ||
// // // // //           kiosk.district?.toLowerCase().includes(lowerCaseSearch) ||
// // // // //           kiosk.organizationName?.toLowerCase().includes(lowerCaseSearch) ||
// // // // //           kiosk.organizationType?.toLowerCase().includes(lowerCaseSearch),
// // // // //       )
// // // // //       setFilteredKiosks(filtered)
// // // // //     } else {
// // // // //       setFilteredKiosks(kiosks)
// // // // //     }
// // // // //   }, [kioskSearch, kiosks])

// // // // //   const fetchKiosks = async () => {
// // // // //     setLoadingKiosks(true)
// // // // //     try {
// // // // //       // The endpoint should return an array of kiosks
// // // // //       const response = await apiClient.get("/kiosks")
// // // // //       const kioskData = response.data?.data || response.data || []
// // // // //       if (Array.isArray(kioskData)) {
// // // // //         setKiosks(kioskData)
// // // // //         setFilteredKiosks(kioskData)
// // // // //       } else {
// // // // //         throw new Error("Kiosk data is not in the expected format.")
// // // // //       }
// // // // //     } catch (err) {
// // // // //       console.error("Failed to fetch kiosks:", err)
// // // // //       toast.error("Failed to load available kiosks.")
// // // // //     } finally {
// // // // //       setLoadingKiosks(false)
// // // // //     }
// // // // //   }

// // // // //   const handleChange = (e) => {
// // // // //     const { name, value, type, checked } = e.target

// // // // //     if (name === "areasOfExpertise") {
// // // // //       const currentAreas = formData.areasOfExpertise || []
// // // // //       if (checked) {
// // // // //         setFormData({ ...formData, areasOfExpertise: [...currentAreas, value] })
// // // // //       } else {
// // // // //         setFormData({ ...formData, areasOfExpertise: currentAreas.filter((area) => area !== value) })
// // // // //       }
// // // // //     } else {
// // // // //       setFormData({ ...formData, [name]: value })
// // // // //     }
// // // // //   }

// // // // //   const handleSubmit = async (e) => {
// // // // //     e.preventDefault()
// // // // //     setError(null)

// // // // //     // --- Frontend Validation ---
// // // // //     if (formData.role === "employee" && !formData.kioskId) {
// // // // //       setError("Kiosk selection is required for employees.")
// // // // //       toast.error("Please select a kiosk to proceed.")
// // // // //       return
// // // // //     }
// // // // //     if (formData.role === "paralegal" && (!formData.areasOfExpertise || formData.areasOfExpertise.length === 0)) {
// // // // //       setError("At least one area of expertise is required for paralegals.")
// // // // //       toast.error("Please select your areas of expertise.")
// // // // //       return
// // // // //     }

// // // // //     setLoading(true)

// // // // //     try {
// // // // //       // Construct the payload carefully based on the role
// // // // //       const payload = {
// // // // //         fullName: formData.fullName,
// // // // //         email: formData.email,
// // // // //         password: formData.password,
// // // // //         aadhaarNumber: formData.aadhaarNumber,
// // // // //         role: formData.role,
// // // // //         phoneNumber: formData.phoneNumber, // Include phone number for all roles that might need it
// // // // //       }

// // // // //       if (formData.role === "employee") {
// // // // //         payload.department = formData.department
// // // // //         payload.designation = formData.designation
// // // // //         payload.roleLevel = formData.roleLevel
// // // // //         payload.kioskId = formData.kioskId
// // // // //       } else if (formData.role === "paralegal") {
// // // // //         payload.areasOfExpertise = formData.areasOfExpertise
// // // // //       } else if (formData.role === "admin") {
// // // // //         // Only include admin fields if role is admin
// // // // //         payload.assignedDistricts = formData.assignedDistricts.split(",").map(d => d.trim()).filter(Boolean)
// // // // //         payload.status = formData.status
// // // // //         payload.adminRole = formData.adminRole
// // // // //       }

// // // // //       await register(payload)
// // // // //       // On success, AuthContext will navigate the user
// // // // //     } catch (err) {
// // // // //       setError(err.message || "Registration failed. Please check your details and try again.")
// // // // //     } finally {
// // // // //       setLoading(false)
// // // // //     }
// // // // //   }

// // // // //   const getRoleDescription = (role) => {
// // // // //     switch (role) {
// // // // //       case "citizen":
// // // // //         return "Access legal help and manage your issues"
// // // // //       case "employee":
// // // // //         return "Help citizens with legal processes at kiosks"
// // // // //       case "paralegal":
// // // // //         return "Provide legal guidance and support"
// // // // //       case "admin":
// // // // //         return "Manage system and oversee operations"
// // // // //       default:
// // // // //         return ""
// // // // //     }
// // // // //   }

// // // // //   if (isLoading) return <Spinner />
// // // // //   if (isAuthenticated) return <Navigate to="/dashboard" replace />

// // // // //   const renderRoleSpecificFields = () => {
// // // // //     switch (formData.role) {
// // // // //       case "employee":
// // // // //         return (
// // // // //           <>
// // // // //             <h3 className="text-lg font-semibold text-slate-800 border-t border-slate-200 pt-6">
// // // // //               Employee Information
// // // // //             </h3>
// // // // //             <div className="space-y-6">
// // // // //               <div>
// // // // //                 <label className="block text-sm font-medium text-slate-700 mb-2">Kiosk Assignment *</label>
// // // // //                 <div className="relative mb-3">
// // // // //                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
// // // // //                   <input
// // // // //                     type="text"
// // // // //                     placeholder="Search by location, village, or district..."
// // // // //                     value={kioskSearch}
// // // // //                     onChange={(e) => setKioskSearch(e.target.value)}
// // // // //                     className="input-style pl-12"
// // // // //                   />
// // // // //                 </div>
// // // // //                 <div className="relative">
// // // // //                   <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
// // // // //                   <select
// // // // //                     name="kioskId"
// // // // //                     value={formData.kioskId}
// // // // //                     onChange={handleChange}
// // // // //                     required
// // // // //                     className="input-style pl-12 appearance-none"
// // // // //                     disabled={loadingKiosks}
// // // // //                   >
// // // // //                     <option value="">{loadingKiosks ? "Loading kiosks..." : "Select a kiosk"}</option>
// // // // //                     {filteredKiosks.map((kiosk) => (
// // // // //                       <option key={kiosk._id} value={kiosk._id}>
// // // // //                         {kiosk.location} - {kiosk.village}, {kiosk.district}
// // // // //                       </option>
// // // // //                     ))}
// // // // //                   </select>
// // // // //                 </div>
// // // // //                 {loadingKiosks && <p className="text-xs text-slate-500 mt-1">Loading available kiosks...</p>}
// // // // //                 {kioskSearch && filteredKiosks.length === 0 && !loadingKiosks && (
// // // // //                   <p className="text-xs text-orange-600 mt-1">No kiosks found matching your search.</p>
// // // // //                 )}
// // // // //               </div>

// // // // //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // // // //                 <div>
// // // // //                   <label className="block text-sm font-medium text-slate-700 mb-2">Department *</label>
// // // // //                   <div className="relative">
// // // // //                     <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
// // // // //                     <input
// // // // //                       name="department"
// // // // //                       placeholder="Legal Helpdesk"
// // // // //                       value={formData.department}
// // // // //                       onChange={handleChange}
// // // // //                       required
// // // // //                       className="input-style pl-12"
// // // // //                     />
// // // // //                   </div>
// // // // //                 </div>
// // // // //                 <div>
// // // // //                   <label className="block text-sm font-medium text-slate-700 mb-2">Designation *</label>
// // // // //                   <div className="relative">
// // // // //                     <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
// // // // //                     <input
// // // // //                       name="designation"
// // // // //                       placeholder="Field Officer"
// // // // //                       value={formData.designation}
// // // // //                       onChange={handleChange}
// // // // //                       required
// // // // //                       className="input-style pl-12"
// // // // //                     />
// // // // //                   </div>
// // // // //                 </div>
// // // // //               </div>

// // // // //               <div>
// // // // //                 <label className="block text-sm font-medium text-slate-700 mb-2">Role Level *</label>
// // // // //                 <div className="grid grid-cols-2 gap-4">
// // // // //                   {["staff", "manager"].map((level) => (
// // // // //                     <label key={level} className={`role-radio-label ${formData.roleLevel === level ? "role-radio-label-active" : ""}`}>
// // // // //                       <input type="radio" name="roleLevel" value={level} checked={formData.roleLevel === level} onChange={handleChange} className="sr-only"/>
// // // // //                       <div className="text-center"><div className="font-medium capitalize">{level}</div><div className="text-xs opacity-75">{level === 'staff' ? 'Regular employee' : 'Team leader'}</div></div>
// // // // //                     </label>
// // // // //                   ))}
// // // // //                 </div>
// // // // //               </div>
// // // // //             </div>
// // // // //           </>
// // // // //         )

// // // // //       case "paralegal":
// // // // //         return (
// // // // //           <>
// // // // //             <h3 className="text-lg font-semibold text-slate-800 border-t border-slate-200 pt-6">
// // // // //               Paralegal Information
// // // // //             </h3>
// // // // //             <div className="space-y-6">
// // // // //               <div>
// // // // //                 <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number *</label>
// // // // //                 <div className="relative">
// // // // //                   <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
// // // // //                   <input name="phoneNumber" placeholder="9876543210" value={formData.phoneNumber} onChange={handleChange} required pattern="\d{10}" title="Must be 10 digits" className="input-style pl-12"/>
// // // // //                 </div>
// // // // //               </div>
// // // // //               <div>
// // // // //                 <label className="block text-sm font-medium text-slate-700 mb-3">Areas of Expertise *</label>
// // // // //                 <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
// // // // //                   {["Aadhaar", "Pension", "Land", "Certificates", "Fraud", "Court", "Welfare"].map((area) => (
// // // // //                     <label key={area} className={`expertise-checkbox-label ${formData.areasOfExpertise.includes(area) ? "expertise-checkbox-label-active" : ""}`}>
// // // // //                       <input type="checkbox" name="areasOfExpertise" value={area} checked={formData.areasOfExpertise.includes(area)} onChange={handleChange} className="sr-only"/>
// // // // //                       <span className="text-sm font-medium">{area}</span>
// // // // //                     </label>
// // // // //                   ))}
// // // // //                 </div>
// // // // //                 <p className="text-xs text-slate-500 mt-2">Select at least one area of expertise.</p>
// // // // //               </div>
// // // // //             </div>
// // // // //           </>
// // // // //         )
      
// // // // //       case "admin":
// // // // //         return (
// // // // //           <>
// // // // //             <h3 className="text-lg font-semibold text-slate-800 border-t border-slate-200 pt-6">
// // // // //               Administrator Information
// // // // //             </h3>
// // // // //             <div className="space-y-6">
// // // // //                <div>
// // // // //                 <label className="block text-sm font-medium text-slate-700 mb-2">Admin Role *</label>
// // // // //                 <div className="relative">
// // // // //                   <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
// // // // //                   <select name="adminRole" value={formData.adminRole} onChange={handleChange} required className="input-style pl-12 appearance-none">
// // // // //                     <option value="SuperAdmin">Super Admin</option>
// // // // //                     <option value="DistrictAdmin">District Admin</option>
// // // // //                   </select>
// // // // //                 </div>
// // // // //               </div>
// // // // //                <div>
// // // // //                 <label className="block text-sm font-medium text-slate-700 mb-2">Assigned Districts</label>
// // // // //                 <div className="relative">
// // // // //                   <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
// // // // //                   <input name="assignedDistricts" placeholder="Mathura, Agra (comma-separated)" value={formData.assignedDistricts} onChange={handleChange} className="input-style pl-12"/>
// // // // //                 </div>
// // // // //                 <p className="text-xs text-slate-500 mt-1">Required for District Admins. Enter comma-separated names.</p>
// // // // //               </div>
// // // // //             </div>
// // // // //           </>
// // // // //         )
// // // // //       default:
// // // // //         return null
// // // // //     }
// // // // //   }

// // // // //   return (
// // // // //     <div className="w-full min-h-screen bg-slate-50 flex items-center justify-center p-4">
// // // // //       <div className="w-full max-w-6xl mx-auto flex rounded-2xl shadow-2xl overflow-hidden bg-white my-8">
// // // // //         {/* Left Side - Image */}
// // // // //         <div className="hidden lg:block lg:w-2/5 relative">
// // // // //           <img src="/hero-image.jpg" alt="Community hands together" className="w-full h-full object-cover" />
// // // // //           <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 to-blue-500/30"></div>
// // // // //           <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-white text-center">
// // // // //              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
// // // // //               <Scale size={32} />
// // // // //             </div>
// // // // //             <h3 className="text-3xl font-bold mb-3">Join NyayaSaathi</h3>
// // // // //             <p className="text-white/80 leading-relaxed">Empowering every citizen with accessible and fair legal justice.</p>
// // // // //           </div>
// // // // //         </div>

// // // // //         {/* Right Side - Form */}
// // // // //         <div className="w-full lg:w-3/5 p-8 sm:p-12 max-h-[90vh] overflow-y-auto">
// // // // //           <div className="text-center mb-8">
// // // // //             <h2 className="text-3xl font-bold text-slate-900 mb-2">Create an Account</h2>
// // // // //             <p className="text-slate-600">Join our mission to make justice accessible for all.</p>
// // // // //           </div>

// // // // //           {error && <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6 text-center">{error}</div>}

// // // // //           <form onSubmit={handleSubmit} className="space-y-6">
            
// // // // //             {/* --- STEP 1: ROLE SELECTION --- */}
// // // // //             <div>
// // // // //               <h3 className="text-lg font-semibold text-slate-800 mb-4">Select Your Role</h3>
// // // // //               <div className="grid grid-cols-2 gap-4">
// // // // //                 {[
// // // // //                   { value: "citizen", label: "Citizen", icon: <User size={20} /> },
// // // // //                   { value: "employee", label: "Employee", icon: <Users size={20} /> },
// // // // //                   { value: "paralegal", label: "Paralegal", icon: <Award size={20} /> },
// // // // //                   { value: "admin", label: "Admin", icon: <Building size={20} /> },
// // // // //                 ].map((role) => (
// // // // //                   <label key={role.value} className={`flex flex-col sm:flex-row items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${formData.role === role.value ? "border-cyan-500 bg-cyan-50 text-cyan-700" : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"}`}>
// // // // //                     <input type="radio" name="role" value={role.value} checked={formData.role === role.value} onChange={handleChange} className="sr-only"/>
// // // // //                     <div className="flex-shrink-0">{role.icon}</div>
// // // // //                     <div className="text-center sm:text-left">
// // // // //                       <div className="font-medium">{role.label}</div>
// // // // //                       <div className="text-xs opacity-75 hidden sm:block">{getRoleDescription(role.value)}</div>
// // // // //                     </div>
// // // // //                   </label>
// // // // //                 ))}
// // // // //               </div>
// // // // //             </div>
            
// // // // //             {/* --- STEP 2: ACCOUNT CREDENTIALS --- */}
// // // // //             <h3 className="text-lg font-semibold text-slate-800 border-t border-slate-200 pt-6">
// // // // //               Account Credentials
// // // // //             </h3>
// // // // //             <div className="space-y-6">
// // // // //               <div>
// // // // //                 <label className="block text-sm font-medium text-slate-700 mb-2">Full Name *</label>
// // // // //                 <div className="relative">
// // // // //                   <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
// // // // //                   <input name="fullName" placeholder="Enter your full name" value={formData.fullName} onChange={handleChange} required className="input-style pl-12"/>
// // // // //                 </div>
// // // // //               </div>
// // // // //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // // // //                 <div>
// // // // //                   <label className="block text-sm font-medium text-slate-700 mb-2">Email Address *</label>
// // // // //                   <div className="relative">
// // // // //                     <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
// // // // //                     <input name="email" type="email" placeholder="your@email.com" value={formData.email} onChange={handleChange} required className="input-style pl-12"/>
// // // // //                   </div>
// // // // //                 </div>
// // // // //                 <div>
// // // // //                   <label className="block text-sm font-medium text-slate-700 mb-2">Password *</label>
// // // // //                   <div className="relative">
// // // // //                     <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
// // // // //                     <input name="password" type={showPassword ? "text" : "password"} placeholder="Min 6 characters" value={formData.password} onChange={handleChange} required minLength={6} className="input-style pl-12 pr-12"/>
// // // // //                     <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600">
// // // // //                       {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
// // // // //                     </button>
// // // // //                   </div>
// // // // //                 </div>
// // // // //               </div>
// // // // //               <div>
// // // // //                 <label className="block text-sm font-medium text-slate-700 mb-2">Aadhaar Number *</label>
// // // // //                 <div className="relative">
// // // // //                   <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
// // // // //                   <input name="aadhaarNumber" placeholder="12-digit Aadhaar number" value={formData.aadhaarNumber} onChange={handleChange} required pattern="\d{12}" title="Must be 12 digits" className="input-style pl-12"/>
// // // // //                 </div>
// // // // //               </div>
// // // // //             </div>
            
// // // // //             {/* --- STEP 3: ROLE-SPECIFIC FIELDS --- */}
// // // // //             {renderRoleSpecificFields()}

// // // // //             <button type="submit" disabled={loading} className="w-full btn-primary text-lg py-4 group mt-8">
// // // // //               {loading ? (
// // // // //                 <>
// // // // //                   <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
// // // // //                   Creating Account...
// // // // //                 </>
// // // // //               ) : (
// // // // //                 <>
// // // // //                   Create Account
// // // // //                   <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
// // // // //                 </>
// // // // //               )}
// // // // //             </button>
// // // // //           </form>

// // // // //           <p className="mt-8 text-center text-sm text-slate-600">
// // // // //             Already have an account?{" "}
// // // // //             <Link to="/login" className="font-medium text-cyan-600 hover:text-cyan-700 transition-colors">
// // // // //               Sign in
// // // // //             </Link>
// // // // //           </p>
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   )
// // // // // }
 
// // // // // export default RegisterPage
// // // // "use client"

// // // // import { useState, useEffect } from "react"
// // // // import { useAuth } from "../context/AuthContext"
// // // // import { Link, Navigate } from "react-router-dom"
// // // // import Spinner from "../components/Spinner"
// // // // import {
// // // //   User,
// // // //   Mail,
// // // //   Lock,
// // // //   CreditCard,
// // // //   Users,
// // // //   Building,
// // // //   Phone,
// // // //   Award,
// // // //   MapPin,
// // // //   Eye,
// // // //   EyeOff,
// // // //   Scale,
// // // //   ArrowRight,
// // // //   Search,
// // // //   AlertCircle,
// // // // } from "lucide-react"
// // // // import apiClient from "../api/axiosConfig"
// // // // import toast from "react-hot-toast"

// // // // const RegisterPage = () => {
// // // //   const { register, isAuthenticated, isLoading } = useAuth()
// // // //   const [formData, setFormData] = useState({
// // // //     fullName: "",
// // // //     email: "",
// // // //     password: "",
// // // //     aadhaarNumber: "",
// // // //     role: "citizen",
// // // //     phoneNumber: "",
// // // //     department: "",
// // // //     designation: "",
// // // //     roleLevel: "staff",
// // // //     kioskId: "",
// // // //     areasOfExpertise: [],
// // // //     // Admin fields are kept for completeness but should be secured on the backend
// // // //     assignedDistricts: [],
// // // //     status: "active",
// // // //     adminRole: "DistrictAdmin",
// // // //   })
// // // //   const [error, setError] = useState(null)
// // // //   const [loading, setLoading] = useState(false)
// // // //   const [showPassword, setShowPassword] = useState(false)
// // // //   const [kiosks, setKiosks] = useState([])
// // // //   const [loadingKiosks, setLoadingKiosks] = useState(false)
// // // //   const [kioskError, setKioskError] = useState(null) // Add error state for kiosks
// // // //   const [kioskSearch, setKioskSearch] = useState("")
// // // //   const [filteredKiosks, setFilteredKiosks] = useState([])

// // // //   useEffect(() => {
// // // //     if (formData.role === "employee") {
// // // //       fetchKiosks()
// // // //     } else {
// // // //       // Reset kiosk data when role changes away from employee
// // // //       setKiosks([])
// // // //       setFilteredKiosks([])
// // // //       setKioskError(null)
// // // //     }
// // // //   }, [formData.role])

// // // //   useEffect(() => {
// // // //     if (kioskSearch.trim()) {
// // // //       const lowerCaseSearch = kioskSearch.toLowerCase()
// // // //       const filtered = kiosks.filter(
// // // //         (kiosk) =>
// // // //           kiosk.location?.toLowerCase().includes(lowerCaseSearch) ||
// // // //           kiosk.village?.toLowerCase().includes(lowerCaseSearch) ||
// // // //           kiosk.district?.toLowerCase().includes(lowerCaseSearch) ||
// // // //           kiosk.organizationName?.toLowerCase().includes(lowerCaseSearch) ||
// // // //           kiosk.organizationType?.toLowerCase().includes(lowerCaseSearch),
// // // //       )
// // // //       setFilteredKiosks(filtered)
// // // //     } else {
// // // //       setFilteredKiosks(kiosks)
// // // //     }
// // // //   }, [kioskSearch, kiosks])

// // // //   const fetchKiosks = async () => {
// // // //     setLoadingKiosks(true)
// // // //     setKioskError(null)
    
// // // //     try {
// // // //       console.log("Fetching kiosks from /kiosks endpoint...") // Debug log
      
// // // //       // Try different possible endpoints
// // // //       let response
// // // //       let kioskData = []
      
// // // //       try {
// // // //         response = await apiClient.get("/kiosks")
// // // //         console.log("Kiosk API Response:", response) // Debug log
// // // //       } catch (firstError) {
// // // //         console.log("First attempt failed, trying /api/kiosks:", firstError)
// // // //         try {
// // // //           response = await apiClient.get("/api/kiosks")
// // // //           console.log("Second attempt response:", response)
// // // //         } catch (secondError) {
// // // //           console.log("Second attempt failed, trying /kiosk:", secondError)
// // // //           response = await apiClient.get("/kiosk")
// // // //           console.log("Third attempt response:", response)
// // // //         }
// // // //       }

// // // //       // Handle different response structures
// // // //       if (response?.data) {
// // // //         if (Array.isArray(response.data)) {
// // // //           kioskData = response.data
// // // //         } else if (response.data.data && Array.isArray(response.data.data)) {
// // // //           kioskData = response.data.data
// // // //         } else if (response.data.kiosks && Array.isArray(response.data.kiosks)) {
// // // //           kioskData = response.data.kiosks
// // // //         } else if (response.data.results && Array.isArray(response.data.results)) {
// // // //           kioskData = response.data.results
// // // //         } else {
// // // //           console.log("Unexpected response structure:", response.data)
// // // //           throw new Error("Kiosk data is not in the expected format.")
// // // //         }
// // // //       } else {
// // // //         throw new Error("No data received from server.")
// // // //       }

// // // //       console.log("Processed kiosk data:", kioskData) // Debug log

// // // //       if (kioskData.length === 0) {
// // // //         setKioskError("No kiosks found. Please contact administrator.")
// // // //         toast.error("No kiosks available for assignment.")
// // // //       } else {
// // // //         setKiosks(kioskData)
// // // //         setFilteredKiosks(kioskData)
// // // //         toast.success(`Loaded ${kioskData.length} kiosks successfully.`)
// // // //       }
      
// // // //     } catch (err) {
// // // //       console.error("Failed to fetch kiosks:", err)
// // // //       const errorMessage = err.response?.data?.message || err.message || "Failed to load kiosks"
// // // //       setKioskError(errorMessage)
// // // //       toast.error(`Failed to load kiosks: ${errorMessage}`)
// // // //     } finally {
// // // //       setLoadingKiosks(false)
// // // //     }
// // // //   }

// // // //   const handleChange = (e) => {
// // // //     const { name, value, type, checked } = e.target

// // // //     if (name === "areasOfExpertise") {
// // // //       const currentAreas = formData.areasOfExpertise || []
// // // //       if (checked) {
// // // //         setFormData({ ...formData, areasOfExpertise: [...currentAreas, value] })
// // // //       } else {
// // // //         setFormData({ ...formData, areasOfExpertise: currentAreas.filter((area) => area !== value) })
// // // //       }
// // // //     } else {
// // // //       setFormData({ ...formData, [name]: value })
// // // //     }
// // // //   }

// // // //   const handleSubmit = async (e) => {
// // // //     e.preventDefault()
// // // //     setError(null)

// // // //     // --- Frontend Validation ---
// // // //     if (formData.role === "employee" && !formData.kioskId) {
// // // //       setError("Kiosk selection is required for employees.")
// // // //       toast.error("Please select a kiosk to proceed.")
// // // //       return
// // // //     }
// // // //     if (formData.role === "paralegal" && (!formData.areasOfExpertise || formData.areasOfExpertise.length === 0)) {
// // // //       setError("At least one area of expertise is required for paralegals.")
// // // //       toast.error("Please select your areas of expertise.")
// // // //       return
// // // //     }

// // // //     setLoading(true)

// // // //     try {
// // // //       // Construct the payload carefully based on the role
// // // //       const payload = {
// // // //         fullName: formData.fullName,
// // // //         email: formData.email,
// // // //         password: formData.password,
// // // //         aadhaarNumber: formData.aadhaarNumber,
// // // //         role: formData.role,
// // // //         phoneNumber: formData.phoneNumber, // Include phone number for all roles that might need it
// // // //       }

// // // //       if (formData.role === "employee") {
// // // //         payload.department = formData.department
// // // //         payload.designation = formData.designation
// // // //         payload.roleLevel = formData.roleLevel
// // // //         payload.kioskId = formData.kioskId
// // // //       } else if (formData.role === "paralegal") {
// // // //         payload.areasOfExpertise = formData.areasOfExpertise
// // // //       } else if (formData.role === "admin") {
// // // //         // Only include admin fields if role is admin
// // // //         payload.assignedDistricts = formData.assignedDistricts.split(",").map(d => d.trim()).filter(Boolean)
// // // //         payload.status = formData.status
// // // //         payload.adminRole = formData.adminRole
// // // //       }

// // // //       await register(payload)
// // // //       // On success, AuthContext will navigate the user
// // // //     } catch (err) {
// // // //       setError(err.message || "Registration failed. Please check your details and try again.")
// // // //     } finally {
// // // //       setLoading(false)
// // // //     }
// // // //   }

// // // //   const getRoleDescription = (role) => {
// // // //     switch (role) {
// // // //       case "citizen":
// // // //         return "Access legal help and manage your issues"
// // // //       case "employee":
// // // //         return "Help citizens with legal processes at kiosks"
// // // //       case "paralegal":
// // // //         return "Provide legal guidance and support"
// // // //       case "admin":
// // // //         return "Manage system and oversee operations"
// // // //       default:
// // // //         return ""
// // // //     }
// // // //   }

// // // //   if (isLoading) return <Spinner />
// // // //   if (isAuthenticated) return <Navigate to="/dashboard" replace />

// // // //   const renderRoleSpecificFields = () => {
// // // //     switch (formData.role) {
// // // //       case "employee":
// // // //         return (
// // // //           <>
// // // //             <h3 className="text-lg font-semibold text-slate-800 border-t border-slate-200 pt-6">
// // // //               Employee Information
// // // //             </h3>
// // // //             <div className="space-y-6">
// // // //               <div>
// // // //                 <label className="block text-sm font-medium text-slate-700 mb-2">Kiosk Assignment *</label>
                
// // // //                 {/* Search input */}
// // // //                 <div className="relative mb-3">
// // // //                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
// // // //                   <input
// // // //                     type="text"
// // // //                     placeholder="Search by location, village, or district..."
// // // //                     value={kioskSearch}
// // // //                     onChange={(e) => setKioskSearch(e.target.value)}
// // // //                     className="input-style pl-12"
// // // //                     disabled={loadingKiosks || kioskError}
// // // //                   />
// // // //                 </div>

// // // //                 {/* Kiosk selection dropdown */}
// // // //                 <div className="relative">
// // // //                   <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
// // // //                   <select
// // // //                     name="kioskId"
// // // //                     value={formData.kioskId}
// // // //                     onChange={handleChange}
// // // //                     required
// // // //                     className="input-style pl-12 appearance-none"
// // // //                     disabled={loadingKiosks || kioskError}
// // // //                   >
// // // //                     <option value="">
// // // //                       {loadingKiosks 
// // // //                         ? "Loading kiosks..." 
// // // //                         : kioskError 
// // // //                         ? "Error loading kiosks" 
// // // //                         : filteredKiosks.length === 0 
// // // //                         ? "No kiosks available" 
// // // //                         : "Select a kiosk"
// // // //                       }
// // // //                     </option>
// // // //                     {filteredKiosks.map((kiosk) => (
// // // //                       <option key={kiosk._id || kiosk.id} value={kiosk._id || kiosk.id}>
// // // //                         {kiosk.location || kiosk.name || 'Unknown Location'} - {kiosk.village || 'Unknown Village'}, {kiosk.district || 'Unknown District'}
// // // //                       </option>
// // // //                     ))}
// // // //                   </select>
// // // //                 </div>

// // // //                 {/* Status messages */}
// // // //                 {loadingKiosks && (
// // // //                   <div className="flex items-center gap-2 text-xs text-blue-600 mt-1">
// // // //                     <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-600"></div>
// // // //                     Loading available kiosks...
// // // //                   </div>
// // // //                 )}
                
// // // //                 {kioskError && (
// // // //                   <div className="flex items-center gap-2 text-xs text-red-600 mt-1">
// // // //                     <AlertCircle size={12} />
// // // //                     {kioskError}
// // // //                     <button 
// // // //                       type="button" 
// // // //                       onClick={fetchKiosks}
// // // //                       className="underline hover:no-underline ml-1"
// // // //                     >
// // // //                       Retry
// // // //                     </button>
// // // //                   </div>
// // // //                 )}
                
// // // //                 {!loadingKiosks && !kioskError && kioskSearch && filteredKiosks.length === 0 && (
// // // //                   <p className="text-xs text-orange-600 mt-1">No kiosks found matching your search.</p>
// // // //                 )}
                
// // // //                 {!loadingKiosks && !kioskError && kiosks.length === 0 && (
// // // //                   <div className="flex items-center gap-2 text-xs text-amber-600 mt-1">
// // // //                     <AlertCircle size={12} />
// // // //                     No kiosks available. Please contact administrator.
// // // //                   </div>
// // // //                 )}

// // // //                 {/* Debug info - remove in production */}
// // // //                 {process.env.NODE_ENV === 'development' && (
// // // //                   <div className="text-xs text-gray-500 mt-1">
// // // //                     Debug: {kiosks.length} kiosks loaded, {filteredKiosks.length} filtered
// // // //                   </div>
// // // //                 )}
// // // //               </div>

// // // //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // // //                 <div>
// // // //                   <label className="block text-sm font-medium text-slate-700 mb-2">Department *</label>
// // // //                   <div className="relative">
// // // //                     <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
// // // //                     <input
// // // //                       name="department"
// // // //                       placeholder="Legal Helpdesk"
// // // //                       value={formData.department}
// // // //                       onChange={handleChange}
// // // //                       required
// // // //                       className="input-style pl-12"
// // // //                     />
// // // //                   </div>
// // // //                 </div>
// // // //                 <div>
// // // //                   <label className="block text-sm font-medium text-slate-700 mb-2">Designation *</label>
// // // //                   <div className="relative">
// // // //                     <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
// // // //                     <input
// // // //                       name="designation"
// // // //                       placeholder="Field Officer"
// // // //                       value={formData.designation}
// // // //                       onChange={handleChange}
// // // //                       required
// // // //                       className="input-style pl-12"
// // // //                     />
// // // //                   </div>
// // // //                 </div>
// // // //               </div>

// // // //               <div>
// // // //                 <label className="block text-sm font-medium text-slate-700 mb-2">Role Level *</label>
// // // //                 <div className="grid grid-cols-2 gap-4">
// // // //                   {["staff", "manager"].map((level) => (
// // // //                     <label key={level} className={`role-radio-label ${formData.roleLevel === level ? "role-radio-label-active" : ""}`}>
// // // //                       <input type="radio" name="roleLevel" value={level} checked={formData.roleLevel === level} onChange={handleChange} className="sr-only"/>
// // // //                       <div className="text-center"><div className="font-medium capitalize">{level}</div><div className="text-xs opacity-75">{level === 'staff' ? 'Regular employee' : 'Team leader'}</div></div>
// // // //                     </label>
// // // //                   ))}
// // // //                 </div>
// // // //               </div>
// // // //             </div>
// // // //           </>
// // // //         )

// // // //       case "paralegal":
// // // //         return (
// // // //           <>
// // // //             <h3 className="text-lg font-semibold text-slate-800 border-t border-slate-200 pt-6">
// // // //               Paralegal Information
// // // //             </h3>
// // // //             <div className="space-y-6">
// // // //               <div>
// // // //                 <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number *</label>
// // // //                 <div className="relative">
// // // //                   <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
// // // //                   <input name="phoneNumber" placeholder="9876543210" value={formData.phoneNumber} onChange={handleChange} required pattern="\d{10}" title="Must be 10 digits" className="input-style pl-12"/>
// // // //                 </div>
// // // //               </div>
// // // //               <div>
// // // //                 <label className="block text-sm font-medium text-slate-700 mb-3">Areas of Expertise *</label>
// // // //                 <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
// // // //                   {["Aadhaar", "Pension", "Land", "Certificates", "Fraud", "Court", "Welfare"].map((area) => (
// // // //                     <label key={area} className={`expertise-checkbox-label ${formData.areasOfExpertise.includes(area) ? "expertise-checkbox-label-active" : ""}`}>
// // // //                       <input type="checkbox" name="areasOfExpertise" value={area} checked={formData.areasOfExpertise.includes(area)} onChange={handleChange} className="sr-only"/>
// // // //                       <span className="text-sm font-medium">{area}</span>
// // // //                     </label>
// // // //                   ))}
// // // //                 </div>
// // // //                 <p className="text-xs text-slate-500 mt-2">Select at least one area of expertise.</p>
// // // //               </div>
// // // //             </div>
// // // //           </>
// // // //         )
      
// // // //       case "admin":
// // // //         return (
// // // //           <>
// // // //             <h3 className="text-lg font-semibold text-slate-800 border-t border-slate-200 pt-6">
// // // //               Administrator Information
// // // //             </h3>
// // // //             <div className="space-y-6">
// // // //                <div>
// // // //                 <label className="block text-sm font-medium text-slate-700 mb-2">Admin Role *</label>
// // // //                 <div className="relative">
// // // //                   <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
// // // //                   <select name="adminRole" value={formData.adminRole} onChange={handleChange} required className="input-style pl-12 appearance-none">
// // // //                     <option value="SuperAdmin">Super Admin</option>
// // // //                     <option value="DistrictAdmin">District Admin</option>
// // // //                   </select>
// // // //                 </div>
// // // //               </div>
// // // //                <div>
// // // //                 <label className="block text-sm font-medium text-slate-700 mb-2">Assigned Districts</label>
// // // //                 <div className="relative">
// // // //                   <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
// // // //                   <input name="assignedDistricts" placeholder="Mathura, Agra (comma-separated)" value={formData.assignedDistricts} onChange={handleChange} className="input-style pl-12"/>
// // // //                 </div>
// // // //                 <p className="text-xs text-slate-500 mt-1">Required for District Admins. Enter comma-separated names.</p>
// // // //               </div>
// // // //             </div>
// // // //           </>
// // // //         )
// // // //       default:
// // // //         return null
// // // //     }
// // // //   }

// // // //   return (
// // // //     <div className="w-full min-h-screen bg-slate-50 flex items-center justify-center p-4">
// // // //       <div className="w-full max-w-6xl mx-auto flex rounded-2xl shadow-2xl overflow-hidden bg-white my-8">
// // // //         {/* Left Side - Image */}
// // // //         <div className="hidden lg:block lg:w-2/5 relative">
// // // //           <img src="/hero-image.jpg" alt="Community hands together" className="w-full h-full object-cover" />
// // // //           <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 to-blue-500/30"></div>
// // // //           <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-white text-center">
// // // //              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
// // // //               <Scale size={32} />
// // // //             </div>
// // // //             <h3 className="text-3xl font-bold mb-3">Join NyayaSaathi</h3>
// // // //             <p className="text-white/80 leading-relaxed">Empowering every citizen with accessible and fair legal justice.</p>
// // // //           </div>
// // // //         </div>

// // // //         {/* Right Side - Form */}
// // // //         <div className="w-full lg:w-3/5 p-8 sm:p-12 max-h-[90vh] overflow-y-auto">
// // // //           <div className="text-center mb-8">
// // // //             <h2 className="text-3xl font-bold text-slate-900 mb-2">Create an Account</h2>
// // // //             <p className="text-slate-600">Join our mission to make justice accessible for all.</p>
// // // //           </div>

// // // //           {error && <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6 text-center">{error}</div>}

// // // //           <form onSubmit={handleSubmit} className="space-y-6">
            
// // // //             {/* --- STEP 1: ROLE SELECTION --- */}
// // // //             <div>
// // // //               <h3 className="text-lg font-semibold text-slate-800 mb-4">Select Your Role</h3>
// // // //               <div className="grid grid-cols-2 gap-4">
// // // //                 {[
// // // //                   { value: "citizen", label: "Citizen", icon: <User size={20} /> },
// // // //                   { value: "employee", label: "Employee", icon: <Users size={20} /> },
// // // //                   { value: "paralegal", label: "Paralegal", icon: <Award size={20} /> },
// // // //                   { value: "admin", label: "Admin", icon: <Building size={20} /> },
// // // //                 ].map((role) => (
// // // //                   <label key={role.value} className={`flex flex-col sm:flex-row items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${formData.role === role.value ? "border-cyan-500 bg-cyan-50 text-cyan-700" : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"}`}>
// // // //                     <input type="radio" name="role" value={role.value} checked={formData.role === role.value} onChange={handleChange} className="sr-only"/>
// // // //                     <div className="flex-shrink-0">{role.icon}</div>
// // // //                     <div className="text-center sm:text-left">
// // // //                       <div className="font-medium">{role.label}</div>
// // // //                       <div className="text-xs opacity-75 hidden sm:block">{getRoleDescription(role.value)}</div>
// // // //                     </div>
// // // //                   </label>
// // // //                 ))}
// // // //               </div>
// // // //             </div>
            
// // // //             {/* --- STEP 2: ACCOUNT CREDENTIALS --- */}
// // // //             <h3 className="text-lg font-semibold text-slate-800 border-t border-slate-200 pt-6">
// // // //               Account Credentials
// // // //             </h3>
// // // //             <div className="space-y-6">
// // // //               <div>
// // // //                 <label className="block text-sm font-medium text-slate-700 mb-2">Full Name *</label>
// // // //                 <div className="relative">
// // // //                   <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
// // // //                   <input name="fullName" placeholder="Enter your full name" value={formData.fullName} onChange={handleChange} required className="input-style pl-12"/>
// // // //                 </div>
// // // //               </div>
// // // //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // // //                 <div>
// // // //                   <label className="block text-sm font-medium text-slate-700 mb-2">Email Address *</label>
// // // //                   <div className="relative">
// // // //                     <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
// // // //                     <input name="email" type="email" placeholder="your@email.com" value={formData.email} onChange={handleChange} required className="input-style pl-12"/>
// // // //                   </div>
// // // //                 </div>
// // // //                 <div>
// // // //                   <label className="block text-sm font-medium text-slate-700 mb-2">Password *</label>
// // // //                   <div className="relative">
// // // //                     <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
// // // //                     <input name="password" type={showPassword ? "text" : "password"} placeholder="Min 6 characters" value={formData.password} onChange={handleChange} required minLength={6} className="input-style pl-12 pr-12"/>
// // // //                     <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600">
// // // //                       {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
// // // //                     </button>
// // // //                   </div>
// // // //                 </div>
// // // //               </div>
// // // //               <div>
// // // //                 <label className="block text-sm font-medium text-slate-700 mb-2">Aadhaar Number *</label>
// // // //                 <div className="relative">
// // // //                   <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
// // // //                   <input name="aadhaarNumber" placeholder="12-digit Aadhaar number" value={formData.aadhaarNumber} onChange={handleChange} required pattern="\d{12}" title="Must be 12 digits" className="input-style pl-12"/>
// // // //                 </div>
// // // //               </div>
// // // //             </div>
            
// // // //             {/* --- STEP 3: ROLE-SPECIFIC FIELDS --- */}
// // // //             {renderRoleSpecificFields()}

// // // //             <button type="submit" disabled={loading} className="w-full btn-primary text-lg py-4 group mt-8">
// // // //               {loading ? (
// // // //                 <>
// // // //                   <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
// // // //                   Creating Account...
// // // //                 </>
// // // //               ) : (
// // // //                 <>
// // // //                   Create Account
// // // //                   <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
// // // //                 </>
// // // //               )}
// // // //             </button>
// // // //           </form>

// // // //           <p className="mt-8 text-center text-sm text-slate-600">
// // // //             Already have an account?{" "}
// // // //             <Link to="/login" className="font-medium text-cyan-600 hover:text-cyan-700 transition-colors">
// // // //               Sign in
// // // //             </Link>
// // // //           </p>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   )
// // // // }
 
// // // // export default RegisterPage
// // // "use client"

// // // import { useState, useEffect } from "react"
// // // import { useAuth } from "../context/AuthContext"
// // // import { Link, Navigate } from "react-router-dom"
// // // import Spinner from "../components/Spinner"
// // // import {
// // //   User,
// // //   Mail,
// // //   Lock,
// // //   CreditCard,
// // //   Users,
// // //   Building,
// // //   Phone,
// // //   Award,
// // //   MapPin,
// // //   Eye,
// // //   EyeOff,
// // //   Scale,
// // //   ArrowRight,
// // //   Search,
// // //   AlertCircle,
// // // } from "lucide-react"
// // // import apiClient from "../api/axiosConfig"
// // // import toast from "react-hot-toast"

// // // const RegisterPage = () => {
// // //   const { register, isAuthenticated, isLoading } = useAuth()
// // //   const [formData, setFormData] = useState({
// // //     fullName: "",
// // //     email: "",
// // //     password: "",
// // //     aadhaarNumber: "",
// // //     role: "citizen",
// // //     phoneNumber: "",
// // //     department: "",
// // //     designation: "",
// // //     roleLevel: "staff",
// // //     kioskId: "",
// // //     areasOfExpertise: [],
// // //     // Admin fields are kept for completeness but should be secured on the backend
// // //     assignedDistricts: [],
// // //     status: "active",
// // //     adminRole: "DistrictAdmin",
// // //   })
// // //   const [error, setError] = useState(null)
// // //   const [loading, setLoading] = useState(false)
// // //   const [showPassword, setShowPassword] = useState(false)
// // //   const [kiosks, setKiosks] = useState([])
// // //   const [loadingKiosks, setLoadingKiosks] = useState(false)
// // //   const [kioskError, setKioskError] = useState(null) // Add error state for kiosks
// // //   const [kioskSearch, setKioskSearch] = useState("")
// // //   const [filteredKiosks, setFilteredKiosks] = useState([])

// // //   useEffect(() => {
// // //     if (formData.role === "employee") {
// // //       fetchKiosks()
// // //     } else {
// // //       // Reset kiosk data when role changes away from employee
// // //       setKiosks([])
// // //       setFilteredKiosks([])
// // //       setKioskError(null)
// // //     }
// // //   }, [formData.role])

// // //   useEffect(() => {
// // //     if (kioskSearch.trim()) {
// // //       const lowerCaseSearch = kioskSearch.toLowerCase()
// // //       const filtered = kiosks.filter(
// // //         (kiosk) =>
// // //           kiosk.location?.toLowerCase().includes(lowerCaseSearch) ||
// // //           kiosk.village?.toLowerCase().includes(lowerCaseSearch) ||
// // //           kiosk.district?.toLowerCase().includes(lowerCaseSearch) ||
// // //           kiosk.organizationName?.toLowerCase().includes(lowerCaseSearch) ||
// // //           kiosk.organizationType?.toLowerCase().includes(lowerCaseSearch),
// // //       )
// // //       setFilteredKiosks(filtered)
// // //     } else {
// // //       setFilteredKiosks(kiosks)
// // //     }
// // //   }, [kioskSearch, kiosks])

// // //   const fetchKiosks = async () => {
// // //     setLoadingKiosks(true)
// // //     setKioskError(null)
    
// // //     try {
// // //       console.log("Fetching kiosks from API...") // Debug log
      
// // //       // Based on your backend route, it should be /kiosks
// // //       const response = await apiClient.get("/kiosks")
// // //       console.log("Kiosk API Response:", response) // Debug log
// // //       console.log("Response data:", response.data) // Debug log
// // //       console.log("Response status:", response.status) // Debug log

// // //       // Your backend returns the kiosks array directly in response.data
// // //       const kioskData = response.data
      
// // //       // Validate that we got an array
// // //       if (!Array.isArray(kioskData)) {
// // //         console.error("Expected array but got:", typeof kioskData, kioskData)
// // //         throw new Error("API returned invalid data format. Expected an array of kiosks.")
// // //       }

// // //       console.log("Processed kiosk data:", kioskData) // Debug log
// // //       console.log("Number of kiosks:", kioskData.length) // Debug log

// // //       // Filter only active kiosks (though your backend should already do this)
// // //       const activeKiosks = kioskData.filter(kiosk => 
// // //         kiosk.isActive !== false && kiosk.isDeleted !== true
// // //       )

// // //       if (activeKiosks.length === 0) {
// // //         setKioskError("No active kiosks found. Please contact administrator.")
// // //         toast.error("No active kiosks available for assignment.")
// // //       } else {
// // //         setKiosks(activeKiosks)
// // //         setFilteredKiosks(activeKiosks)
// // //         console.log("Kiosks set successfully:", activeKiosks.length, "kiosks")
// // //         toast.success(`Loaded ${activeKiosks.length} kiosks successfully.`)
// // //       }
      
// // //     } catch (err) {
// // //       console.error("Failed to fetch kiosks - Full error:", err)
// // //       console.error("Error response:", err.response)
// // //       console.error("Error message:", err.message)
      
// // //       let errorMessage = "Failed to load kiosks"
      
// // //       if (err.response) {
// // //         // Server responded with error status
// // //         const status = err.response.status
// // //         const data = err.response.data
        
// // //         if (status === 404) {
// // //           errorMessage = "Kiosks endpoint not found. Please check your API configuration."
// // //         } else if (status === 500) {
// // //           errorMessage = "Server error. Please try again later."
// // //         } else if (data?.message) {
// // //           errorMessage = data.message
// // //         } else {
// // //           errorMessage = `HTTP ${status}: ${err.message}`
// // //         }
// // //       } else if (err.request) {
// // //         // Network error
// // //         errorMessage = "Network error. Please check your connection and try again."
// // //       } else {
// // //         // Other error
// // //         errorMessage = err.message
// // //       }
      
// // //       setKioskError(errorMessage)
// // //       toast.error(`Failed to load kiosks: ${errorMessage}`)
// // //     } finally {
// // //       setLoadingKiosks(false)
// // //     }
// // //   }

// // //   const handleChange = (e) => {
// // //     const { name, value, type, checked } = e.target

// // //     if (name === "areasOfExpertise") {
// // //       const currentAreas = formData.areasOfExpertise || []
// // //       if (checked) {
// // //         setFormData({ ...formData, areasOfExpertise: [...currentAreas, value] })
// // //       } else {
// // //         setFormData({ ...formData, areasOfExpertise: currentAreas.filter((area) => area !== value) })
// // //       }
// // //     } else {
// // //       setFormData({ ...formData, [name]: value })
// // //     }
// // //   }

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault()
// // //     setError(null)

// // //     // --- Frontend Validation ---
// // //     if (formData.role === "employee" && !formData.kioskId) {
// // //       setError("Kiosk selection is required for employees.")
// // //       toast.error("Please select a kiosk to proceed.")
// // //       return
// // //     }
// // //     if (formData.role === "paralegal" && (!formData.areasOfExpertise || formData.areasOfExpertise.length === 0)) {
// // //       setError("At least one area of expertise is required for paralegals.")
// // //       toast.error("Please select your areas of expertise.")
// // //       return
// // //     }

// // //     setLoading(true)

// // //     try {
// // //       // Construct the payload carefully based on the role
// // //       const payload = {
// // //         fullName: formData.fullName,
// // //         email: formData.email,
// // //         password: formData.password,
// // //         aadhaarNumber: formData.aadhaarNumber,
// // //         role: formData.role,
// // //         phoneNumber: formData.phoneNumber, // Include phone number for all roles that might need it
// // //       }

// // //       if (formData.role === "employee") {
// // //         payload.department = formData.department
// // //         payload.designation = formData.designation
// // //         payload.roleLevel = formData.roleLevel
// // //         payload.kioskId = formData.kioskId
// // //       } else if (formData.role === "paralegal") {
// // //         payload.areasOfExpertise = formData.areasOfExpertise
// // //       } else if (formData.role === "admin") {
// // //         // Only include admin fields if role is admin
// // //         payload.assignedDistricts = formData.assignedDistricts.split(",").map(d => d.trim()).filter(Boolean)
// // //         payload.status = formData.status
// // //         payload.adminRole = formData.adminRole
// // //       }

// // //       await register(payload)
// // //       // On success, AuthContext will navigate the user
// // //     } catch (err) {
// // //       setError(err.message || "Registration failed. Please check your details and try again.")
// // //     } finally {
// // //       setLoading(false)
// // //     }
// // //   }

// // //   const getRoleDescription = (role) => {
// // //     switch (role) {
// // //       case "citizen":
// // //         return "Access legal help and manage your issues"
// // //       case "employee":
// // //         return "Help citizens with legal processes at kiosks"
// // //       case "paralegal":
// // //         return "Provide legal guidance and support"
// // //       case "admin":
// // //         return "Manage system and oversee operations"
// // //       default:
// // //         return ""
// // //     }
// // //   }

// // //   if (isLoading) return <Spinner />
// // //   if (isAuthenticated) return <Navigate to="/dashboard" replace />

// // //   const renderRoleSpecificFields = () => {
// // //     switch (formData.role) {
// // //       case "employee":
// // //         return (
// // //           <>
// // //             <h3 className="text-lg font-semibold text-slate-800 border-t border-slate-200 pt-6">
// // //               Employee Information
// // //             </h3>
// // //             <div className="space-y-6">
// // //               <div>
// // //                 <label className="block text-sm font-medium text-slate-700 mb-2">Kiosk Assignment *</label>
                
// // //                 {/* Search input */}
// // //                 <div className="relative mb-3">
// // //                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
// // //                   <input
// // //                     type="text"
// // //                     placeholder="Search by location, village, or district..."
// // //                     value={kioskSearch}
// // //                     onChange={(e) => setKioskSearch(e.target.value)}
// // //                     className="input-style pl-12"
// // //                     disabled={loadingKiosks || kioskError}
// // //                   />
// // //                 </div>

// // //                 {/* Kiosk selection dropdown */}
// // //                 <div className="relative">
// // //                   <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
// // //                   <select
// // //                     name="kioskId"
// // //                     value={formData.kioskId}
// // //                     onChange={handleChange}
// // //                     required
// // //                     className="input-style pl-12 appearance-none"
// // //                     disabled={loadingKiosks || kioskError}
// // //                   >
// // //                     <option value="">
// // //                       {loadingKiosks 
// // //                         ? "Loading kiosks..." 
// // //                         : kioskError 
// // //                         ? "Error loading kiosks" 
// // //                         : filteredKiosks.length === 0 
// // //                         ? "No kiosks available" 
// // //                         : "Select a kiosk"
// // //                       }
// // //                     </option>
// // //                     {filteredKiosks.map((kiosk) => (
// // //                       <option key={kiosk._id} value={kiosk._id}>
// // //                         {kiosk.location} - {kiosk.village}, {kiosk.district}
// // //                         {kiosk.organizationName && ` (${kiosk.organizationName})`}
// // //                       </option>
// // //                     ))}
// // //                   </select>
// // //                 </div>

// // //                 {/* Status messages */}
// // //                 {loadingKiosks && (
// // //                   <div className="flex items-center gap-2 text-xs text-blue-600 mt-1">
// // //                     <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-600"></div>
// // //                     Loading available kiosks...
// // //                   </div>
// // //                 )}
                
// // //                 {kioskError && (
// // //                   <div className="flex items-center gap-2 text-xs text-red-600 mt-1">
// // //                     <AlertCircle size={12} />
// // //                     {kioskError}
// // //                     <button 
// // //                       type="button" 
// // //                       onClick={fetchKiosks}
// // //                       className="underline hover:no-underline ml-1"
// // //                     >
// // //                       Retry
// // //                     </button>
// // //                   </div>
// // //                 )}
                
// // //                 {!loadingKiosks && !kioskError && kioskSearch && filteredKiosks.length === 0 && (
// // //                   <p className="text-xs text-orange-600 mt-1">No kiosks found matching your search.</p>
// // //                 )}
                
// // //                 {!loadingKiosks && !kioskError && kiosks.length === 0 && (
// // //                   <div className="flex items-center gap-2 text-xs text-amber-600 mt-1">
// // //                     <AlertCircle size={12} />
// // //                     No kiosks available. Please contact administrator.
// // //                   </div>
// // //                 )}

// // //                 {/* Debug info - remove in production */}
// // //                 {process.env.NODE_ENV === 'development' && (
// // //                   <div className="text-xs text-gray-500 mt-1">
// // //                     Debug: {kiosks.length} kiosks loaded, {filteredKiosks.length} filtered
// // //                   </div>
// // //                 )}
// // //               </div>

// // //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //                 <div>
// // //                   <label className="block text-sm font-medium text-slate-700 mb-2">Department *</label>
// // //                   <div className="relative">
// // //                     <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
// // //                     <input
// // //                       name="department"
// // //                       placeholder="Legal Helpdesk"
// // //                       value={formData.department}
// // //                       onChange={handleChange}
// // //                       required
// // //                       className="input-style pl-12"
// // //                     />
// // //                   </div>
// // //                 </div>
// // //                 <div>
// // //                   <label className="block text-sm font-medium text-slate-700 mb-2">Designation *</label>
// // //                   <div className="relative">
// // //                     <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
// // //                     <input
// // //                       name="designation"
// // //                       placeholder="Field Officer"
// // //                       value={formData.designation}
// // //                       onChange={handleChange}
// // //                       required
// // //                       className="input-style pl-12"
// // //                     />
// // //                   </div>
// // //                 </div>
// // //               </div>

// // //               <div>
// // //                 <label className="block text-sm font-medium text-slate-700 mb-2">Role Level *</label>
// // //                 <div className="grid grid-cols-2 gap-4">
// // //                   {["staff", "manager"].map((level) => (
// // //                     <label key={level} className={`role-radio-label ${formData.roleLevel === level ? "role-radio-label-active" : ""}`}>
// // //                       <input type="radio" name="roleLevel" value={level} checked={formData.roleLevel === level} onChange={handleChange} className="sr-only"/>
// // //                       <div className="text-center"><div className="font-medium capitalize">{level}</div><div className="text-xs opacity-75">{level === 'staff' ? 'Regular employee' : 'Team leader'}</div></div>
// // //                     </label>
// // //                   ))}
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </>
// // //         )

// // //       case "paralegal":
// // //         return (
// // //           <>
// // //             <h3 className="text-lg font-semibold text-slate-800 border-t border-slate-200 pt-6">
// // //               Paralegal Information
// // //             </h3>
// // //             <div className="space-y-6">
// // //               <div>
// // //                 <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number *</label>
// // //                 <div className="relative">
// // //                   <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
// // //                   <input name="phoneNumber" placeholder="9876543210" value={formData.phoneNumber} onChange={handleChange} required pattern="\d{10}" title="Must be 10 digits" className="input-style pl-12"/>
// // //                 </div>
// // //               </div>
// // //               <div>
// // //                 <label className="block text-sm font-medium text-slate-700 mb-3">Areas of Expertise *</label>
// // //                 <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
// // //                   {["Aadhaar", "Pension", "Land", "Certificates", "Fraud", "Court", "Welfare"].map((area) => (
// // //                     <label key={area} className={`expertise-checkbox-label ${formData.areasOfExpertise.includes(area) ? "expertise-checkbox-label-active" : ""}`}>
// // //                       <input type="checkbox" name="areasOfExpertise" value={area} checked={formData.areasOfExpertise.includes(area)} onChange={handleChange} className="sr-only"/>
// // //                       <span className="text-sm font-medium">{area}</span>
// // //                     </label>
// // //                   ))}
// // //                 </div>
// // //                 <p className="text-xs text-slate-500 mt-2">Select at least one area of expertise.</p>
// // //               </div>
// // //             </div>
// // //           </>
// // //         )
      
// // //       case "admin":
// // //         return (
// // //           <>
// // //             <h3 className="text-lg font-semibold text-slate-800 border-t border-slate-200 pt-6">
// // //               Administrator Information
// // //             </h3>
// // //             <div className="space-y-6">
// // //                <div>
// // //                 <label className="block text-sm font-medium text-slate-700 mb-2">Admin Role *</label>
// // //                 <div className="relative">
// // //                   <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
// // //                   <select name="adminRole" value={formData.adminRole} onChange={handleChange} required className="input-style pl-12 appearance-none">
// // //                     <option value="SuperAdmin">Super Admin</option>
// // //                     <option value="DistrictAdmin">District Admin</option>
// // //                   </select>
// // //                 </div>
// // //               </div>
// // //                <div>
// // //                 <label className="block text-sm font-medium text-slate-700 mb-2">Assigned Districts</label>
// // //                 <div className="relative">
// // //                   <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
// // //                   <input name="assignedDistricts" placeholder="Mathura, Agra (comma-separated)" value={formData.assignedDistricts} onChange={handleChange} className="input-style pl-12"/>
// // //                 </div>
// // //                 <p className="text-xs text-slate-500 mt-1">Required for District Admins. Enter comma-separated names.</p>
// // //               </div>
// // //             </div>
// // //           </>
// // //         )
// // //       default:
// // //         return null
// // //     }
// // //   }

// // //   return (
// // //     <div className="w-full min-h-screen bg-slate-50 flex items-center justify-center p-4">
// // //       <div className="w-full max-w-6xl mx-auto flex rounded-2xl shadow-2xl overflow-hidden bg-white my-8">
// // //         {/* Left Side - Image */}
// // //         <div className="hidden lg:block lg:w-2/5 relative">
// // //           <img src="/hero-image.jpg" alt="Community hands together" className="w-full h-full object-cover" />
// // //           <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 to-blue-500/30"></div>
// // //           <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-white text-center">
// // //              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
// // //               <Scale size={32} />
// // //             </div>
// // //             <h3 className="text-3xl font-bold mb-3">Join NyayaSaathi</h3>
// // //             <p className="text-white/80 leading-relaxed">Empowering every citizen with accessible and fair legal justice.</p>
// // //           </div>
// // //         </div>

// // //         {/* Right Side - Form */}
// // //         <div className="w-full lg:w-3/5 p-8 sm:p-12 max-h-[90vh] overflow-y-auto">
// // //           <div className="text-center mb-8">
// // //             <h2 className="text-3xl font-bold text-slate-900 mb-2">Create an Account</h2>
// // //             <p className="text-slate-600">Join our mission to make justice accessible for all.</p>
// // //           </div>

// // //           {error && <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6 text-center">{error}</div>}

// // //           <form onSubmit={handleSubmit} className="space-y-6">
            
// // //             {/* --- STEP 1: ROLE SELECTION --- */}
// // //             <div>
// // //               <h3 className="text-lg font-semibold text-slate-800 mb-4">Select Your Role</h3>
// // //               <div className="grid grid-cols-2 gap-4">
// // //                 {[
// // //                   { value: "citizen", label: "Citizen", icon: <User size={20} /> },
// // //                   { value: "employee", label: "Employee", icon: <Users size={20} /> },
// // //                   { value: "paralegal", label: "Paralegal", icon: <Award size={20} /> },
// // //                   { value: "admin", label: "Admin", icon: <Building size={20} /> },
// // //                 ].map((role) => (
// // //                   <label key={role.value} className={`flex flex-col sm:flex-row items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${formData.role === role.value ? "border-cyan-500 bg-cyan-50 text-cyan-700" : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"}`}>
// // //                     <input type="radio" name="role" value={role.value} checked={formData.role === role.value} onChange={handleChange} className="sr-only"/>
// // //                     <div className="flex-shrink-0">{role.icon}</div>
// // //                     <div className="text-center sm:text-left">
// // //                       <div className="font-medium">{role.label}</div>
// // //                       <div className="text-xs opacity-75 hidden sm:block">{getRoleDescription(role.value)}</div>
// // //                     </div>
// // //                   </label>
// // //                 ))}
// // //               </div>
// // //             </div>
            
// // //             {/* --- STEP 2: ACCOUNT CREDENTIALS --- */}
// // //             <h3 className="text-lg font-semibold text-slate-800 border-t border-slate-200 pt-6">
// // //               Account Credentials
// // //             </h3>
// // //             <div className="space-y-6">
// // //               <div>
// // //                 <label className="block text-sm font-medium text-slate-700 mb-2">Full Name *</label>
// // //                 <div className="relative">
// // //                   <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
// // //                   <input name="fullName" placeholder="Enter your full name" value={formData.fullName} onChange={handleChange} required className="input-style pl-12"/>
// // //                 </div>
// // //               </div>
// // //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //                 <div>
// // //                   <label className="block text-sm font-medium text-slate-700 mb-2">Email Address *</label>
// // //                   <div className="relative">
// // //                     <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
// // //                     <input name="email" type="email" placeholder="your@email.com" value={formData.email} onChange={handleChange} required className="input-style pl-12"/>
// // //                   </div>
// // //                 </div>
// // //                 <div>
// // //                   <label className="block text-sm font-medium text-slate-700 mb-2">Password *</label>
// // //                   <div className="relative">
// // //                     <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
// // //                     <input name="password" type={showPassword ? "text" : "password"} placeholder="Min 6 characters" value={formData.password} onChange={handleChange} required minLength={6} className="input-style pl-12 pr-12"/>
// // //                     <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600">
// // //                       {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
// // //                     </button>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //               <div>
// // //                 <label className="block text-sm font-medium text-slate-700 mb-2">Aadhaar Number *</label>
// // //                 <div className="relative">
// // //                   <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
// // //                   <input name="aadhaarNumber" placeholder="12-digit Aadhaar number" value={formData.aadhaarNumber} onChange={handleChange} required pattern="\d{12}" title="Must be 12 digits" className="input-style pl-12"/>
// // //                 </div>
// // //               </div>
// // //             </div>
            
// // //             {/* --- STEP 3: ROLE-SPECIFIC FIELDS --- */}
// // //             {renderRoleSpecificFields()}

// // //             <button type="submit" disabled={loading} className="w-full btn-primary text-lg py-4 group mt-8">
// // //               {loading ? (
// // //                 <>
// // //                   <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
// // //                   Creating Account...
// // //                 </>
// // //               ) : (
// // //                 <>
// // //                   Create Account
// // //                   <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
// // //                 </>
// // //               )}
// // //             </button>
// // //           </form>

// // //           <p className="mt-8 text-center text-sm text-slate-600">
// // //             Already have an account?{" "}
// // //             <Link to="/login" className="font-medium text-cyan-600 hover:text-cyan-700 transition-colors">
// // //               Sign in
// // //             </Link>
// // //           </p>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   )
// // // }
 
// // // export default RegisterPage
// // "use client"

// // import { useState, useEffect } from "react"
// // import { useAuth } from "../context/AuthContext"
// // import { Link, Navigate } from "react-router-dom"
// // import Spinner from "../components/Spinner"
// // import {
// //   User,
// //   Mail,
// //   Lock,
// //   CreditCard,
// //   Users,
// //   Building,
// //   Phone,
// //   Award,
// //   MapPin,
// //   Eye,
// //   EyeOff,
// //   Scale,
// //   ArrowRight,
// //   Search,
// //   AlertCircle,
// // } from "lucide-react"
// // import apiClient from "../api/axiosConfig"
// // import toast from "react-hot-toast"

// // const RegisterPage = () => {
// //   const { register, isAuthenticated, isLoading } = useAuth()
// //   const [formData, setFormData] = useState({
// //     fullName: "",
// //     email: "",
// //     password: "",
// //     aadhaarNumber: "",
// //     role: "citizen",
// //     phoneNumber: "",
// //     department: "",
// //     designation: "",
// //     roleLevel: "staff",
// //     kioskId: "",
// //     areasOfExpertise: [],
// //     // Admin fields are kept for completeness but should be secured on the backend
// //     assignedDistricts: [],
// //     status: "active",
// //     adminRole: "DistrictAdmin",
// //   })
// //   const [error, setError] = useState(null)
// //   const [loading, setLoading] = useState(false)
// //   const [showPassword, setShowPassword] = useState(false)
// //   const [kiosks, setKiosks] = useState([])
// //   const [loadingKiosks, setLoadingKiosks] = useState(false)
// //   const [kioskError, setKioskError] = useState(null) // Add error state for kiosks
// //   const [kioskSearch, setKioskSearch] = useState("")
// //   const [filteredKiosks, setFilteredKiosks] = useState([])

// //   useEffect(() => {
// //     if (formData.role === "employee") {
// //       fetchKiosks()
// //     } else {
// //       // Reset kiosk data when role changes away from employee
// //       setKiosks([])
// //       setFilteredKiosks([])
// //       setKioskError(null)
// //     }
// //   }, [formData.role])

// //   useEffect(() => {
// //     if (kioskSearch.trim()) {
// //       const lowerCaseSearch = kioskSearch.toLowerCase()
// //       const filtered = kiosks.filter(
// //         (kiosk) =>
// //           kiosk.location?.toLowerCase().includes(lowerCaseSearch) ||
// //           kiosk.village?.toLowerCase().includes(lowerCaseSearch) ||
// //           kiosk.district?.toLowerCase().includes(lowerCaseSearch) ||
// //           kiosk.organizationName?.toLowerCase().includes(lowerCaseSearch) ||
// //           kiosk.organizationType?.toLowerCase().includes(lowerCaseSearch),
// //       )
// //       setFilteredKiosks(filtered)
// //     } else {
// //       setFilteredKiosks(kiosks)
// //     }
// //   }, [kioskSearch, kiosks])

// //   const fetchKiosks = async () => {
// //     setLoadingKiosks(true)
// //     setKioskError(null)
    
// //     try {
// //       console.log("=== KIOSK FETCH DEBUG ===")
// //       console.log("API Client base URL:", apiClient.defaults.baseURL)
// //       console.log("Making request to: /kiosks")
      
// //       // Make the API call
// //       const response = await apiClient.get("/kiosks")
      
// //       console.log("=== API RESPONSE ===")
// //       console.log("Status:", response.status)
// //       console.log("Headers:", response.headers)
// //       console.log("Data type:", typeof response.data)
// //       console.log("Data is array:", Array.isArray(response.data))
// //       console.log("Raw response data:", response.data)
// //       console.log("Data length:", response.data?.length)
      
// //       // Your backend returns the kiosks array directly
// //       const kioskData = response.data
      
// //       // Validate response
// //       if (!kioskData) {
// //         throw new Error("No data received from server")
// //       }
      
// //       if (!Array.isArray(kioskData)) {
// //         console.error("Expected array but got:", typeof kioskData)
// //         console.error("Actual data:", kioskData)
// //         throw new Error(`Expected array but received ${typeof kioskData}`)
// //       }

// //       console.log("=== KIOSK DATA ANALYSIS ===")
// //       console.log("Total kiosks received:", kioskData.length)
      
// //       if (kioskData.length > 0) {
// //         console.log("First kiosk sample:", kioskData[0])
// //         console.log("Kiosk properties:", Object.keys(kioskData[0]))
// //       }
      
// //       // Filter active kiosks
// //       const activeKiosks = kioskData.filter(kiosk => {
// //         const isActive = kiosk.isActive !== false
// //         const notDeleted = kiosk.isDeleted !== true
// //         console.log(`Kiosk ${kiosk._id}: isActive=${kiosk.isActive}, isDeleted=${kiosk.isDeleted}, included=${isActive && notDeleted}`)
// //         return isActive && notDeleted
// //       })

// //       console.log("=== FILTERING RESULTS ===")
// //       console.log("Active kiosks after filtering:", activeKiosks.length)

// //       if (activeKiosks.length === 0) {
// //         if (kioskData.length > 0) {
// //           setKioskError("All kiosks are inactive or deleted. Please contact administrator.")
// //           toast.error("No active kiosks available for assignment.")
// //         } else {
// //           setKioskError("No kiosks found in database. Please contact administrator to add kiosks.")
// //           toast.error("No kiosks found in the system.")
// //         }
// //       } else {
// //         setKiosks(activeKiosks)
// //         setFilteredKiosks(activeKiosks)
// //         console.log("✅ SUCCESS: Kiosks loaded successfully")
// //         toast.success(`Loaded ${activeKiosks.length} active kiosks.`)
// //       }
      
// //     } catch (err) {
// //       console.log("=== ERROR DETAILS ===")
// //       console.error("Full error object:", err)
// //       console.error("Error name:", err.name)
// //       console.error("Error message:", err.message)
      
// //       if (err.response) {
// //         console.error("Response status:", err.response.status)
// //         console.error("Response data:", err.response.data)
// //         console.error("Response headers:", err.response.headers)
// //       } else if (err.request) {
// //         console.error("Request was made but no response:", err.request)
// //       }
      
// //       let errorMessage = "Failed to load kiosks"
      
// //       if (err.response) {
// //         const status = err.response.status
// //         const data = err.response.data
        
// //         switch (status) {
// //           case 404:
// //             errorMessage = "Kiosks API endpoint not found. Check your server configuration."
// //             break
// //           case 500:
// //             errorMessage = "Server error. Check your database connection."
// //             break
// //           case 401:
// //             errorMessage = "Authentication required. Please login first."
// //             break
// //           case 403:
// //             errorMessage = "Access denied. Check your permissions."
// //             break
// //           default:
// //             errorMessage = data?.message || `HTTP ${status}: ${err.message}`
// //         }
// //       } else if (err.request) {
// //         errorMessage = "Cannot connect to server. Check your network connection and server status."
// //       } else if (err.message.includes("baseURL")) {
// //         errorMessage = "API configuration error. Check your API base URL."
// //       } else {
// //         errorMessage = err.message
// //       }
      
// //       setKioskError(errorMessage)
// //       toast.error(`Kiosk loading failed: ${errorMessage}`)
// //     } finally {
// //       setLoadingKiosks(false)
// //     }
// //   }

// //   const handleChange = (e) => {
// //     const { name, value, type, checked } = e.target

// //     if (name === "areasOfExpertise") {
// //       const currentAreas = formData.areasOfExpertise || []
// //       if (checked) {
// //         setFormData({ ...formData, areasOfExpertise: [...currentAreas, value] })
// //       } else {
// //         setFormData({ ...formData, areasOfExpertise: currentAreas.filter((area) => area !== value) })
// //       }
// //     } else {
// //       setFormData({ ...formData, [name]: value })
// //     }
// //   }

// //   const handleSubmit = async (e) => {
// //     e.preventDefault()
// //     setError(null)

// //     // --- Frontend Validation ---
// //     if (formData.role === "employee" && !formData.kioskId) {
// //       setError("Kiosk selection is required for employees.")
// //       toast.error("Please select a kiosk to proceed.")
// //       return
// //     }
// //     if (formData.role === "paralegal" && (!formData.areasOfExpertise || formData.areasOfExpertise.length === 0)) {
// //       setError("At least one area of expertise is required for paralegals.")
// //       toast.error("Please select your areas of expertise.")
// //       return
// //     }

// //     setLoading(true)

// //     try {
// //       // Construct the payload carefully based on the role
// //       const payload = {
// //         fullName: formData.fullName,
// //         email: formData.email,
// //         password: formData.password,
// //         aadhaarNumber: formData.aadhaarNumber,
// //         role: formData.role,
// //         phoneNumber: formData.phoneNumber, // Include phone number for all roles that might need it
// //       }

// //       if (formData.role === "employee") {
// //         payload.department = formData.department
// //         payload.designation = formData.designation
// //         payload.roleLevel = formData.roleLevel
// //         payload.kioskId = formData.kioskId
// //       } else if (formData.role === "paralegal") {
// //         payload.areasOfExpertise = formData.areasOfExpertise
// //       } else if (formData.role === "admin") {
// //         // Only include admin fields if role is admin
// //         payload.assignedDistricts = formData.assignedDistricts.split(",").map(d => d.trim()).filter(Boolean)
// //         payload.status = formData.status
// //         payload.adminRole = formData.adminRole
// //       }

// //       await register(payload)
// //       // On success, AuthContext will navigate the user
// //     } catch (err) {
// //       setError(err.message || "Registration failed. Please check your details and try again.")
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   const getRoleDescription = (role) => {
// //     switch (role) {
// //       case "citizen":
// //         return "Access legal help and manage your issues"
// //       case "employee":
// //         return "Help citizens with legal processes at kiosks"
// //       case "paralegal":
// //         return "Provide legal guidance and support"
// //       case "admin":
// //         return "Manage system and oversee operations"
// //       default:
// //         return ""
// //     }
// //   }

// //   if (isLoading) return <Spinner />
// //   if (isAuthenticated) return <Navigate to="/dashboard" replace />

// //   const renderRoleSpecificFields = () => {
// //     switch (formData.role) {
// //       case "employee":
// //         return (
// //           <>
// //             <h3 className="text-lg font-semibold text-slate-800 border-t border-slate-200 pt-6">
// //               Employee Information
// //             </h3>
// //             <div className="space-y-6">
// //               <div>
// //                 <label className="block text-sm font-medium text-slate-700 mb-2">Kiosk Assignment *</label>
                
// //                 {/* Search input */}
// //                 <div className="relative mb-3">
// //                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
// //                   <input
// //                     type="text"
// //                     placeholder="Search by location, village, or district..."
// //                     value={kioskSearch}
// //                     onChange={(e) => setKioskSearch(e.target.value)}
// //                     className="input-style pl-12"
// //                     disabled={loadingKiosks || kioskError}
// //                   />
// //                 </div>

// //                 {/* Kiosk selection dropdown */}
// //                 <div className="relative">
// //                   <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
// //                   <select
// //                     name="kioskId"
// //                     value={formData.kioskId}
// //                     onChange={handleChange}
// //                     required
// //                     className="input-style pl-12 appearance-none"
// //                     disabled={loadingKiosks || kioskError}
// //                   >
// //                     <option value="">
// //                       {loadingKiosks 
// //                         ? "Loading kiosks..." 
// //                         : kioskError 
// //                         ? "Error loading kiosks" 
// //                         : filteredKiosks.length === 0 
// //                         ? "No kiosks available" 
// //                         : "Select a kiosk"
// //                       }
// //                     </option>
// //                     {filteredKiosks.map((kiosk) => (
// //                       <option key={kiosk._id} value={kiosk._id}>
// //                         {kiosk.location} - {kiosk.village}, {kiosk.district}
// //                         {kiosk.organizationName && ` (${kiosk.organizationName})`}
// //                       </option>
// //                     ))}
// //                   </select>
// //                 </div>

// //                 {/* Status messages */}
// //                 {loadingKiosks && (
// //                   <div className="flex items-center gap-2 text-xs text-blue-600 mt-1">
// //                     <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-600"></div>
// //                     Loading available kiosks...
// //                   </div>
// //                 )}
                
// //                 {kioskError && (
// //                   <div className="flex items-center gap-2 text-xs text-red-600 mt-1">
// //                     <AlertCircle size={12} />
// //                     {kioskError}
// //                     <button 
// //                       type="button" 
// //                       onClick={fetchKiosks}
// //                       className="underline hover:no-underline ml-1"
// //                     >
// //                       Retry
// //                     </button>
// //                   </div>
// //                 )}
                
// //                 {!loadingKiosks && !kioskError && kioskSearch && filteredKiosks.length === 0 && (
// //                   <p className="text-xs text-orange-600 mt-1">No kiosks found matching your search.</p>
// //                 )}
                
// //                 {!loadingKiosks && !kioskError && kiosks.length === 0 && (
// //                   <div className="flex items-center gap-2 text-xs text-amber-600 mt-1">
// //                     <AlertCircle size={12} />
// //                     No kiosks available. Please contact administrator.
// //                   </div>
// //                 )}

// //                 {/* Debug info - remove in production */}
// //                 {process.env.NODE_ENV === 'development' && (
// //                   <div className="text-xs text-gray-500 mt-1">
// //                     Debug: {kiosks.length} kiosks loaded, {filteredKiosks.length} filtered
// //                   </div>
// //                 )}
// //               </div>

// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                 <div>
// //                   <label className="block text-sm font-medium text-slate-700 mb-2">Department *</label>
// //                   <div className="relative">
// //                     <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
// //                     <input
// //                       name="department"
// //                       placeholder="Legal Helpdesk"
// //                       value={formData.department}
// //                       onChange={handleChange}
// //                       required
// //                       className="input-style pl-12"
// //                     />
// //                   </div>
// //                 </div>
// //                 <div>
// //                   <label className="block text-sm font-medium text-slate-700 mb-2">Designation *</label>
// //                   <div className="relative">
// //                     <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
// //                     <input
// //                       name="designation"
// //                       placeholder="Field Officer"
// //                       value={formData.designation}
// //                       onChange={handleChange}
// //                       required
// //                       className="input-style pl-12"
// //                     />
// //                   </div>
// //                 </div>
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-slate-700 mb-2">Role Level *</label>
// //                 <div className="grid grid-cols-2 gap-4">
// //                   {["staff", "manager"].map((level) => (
// //                     <label key={level} className={`role-radio-label ${formData.roleLevel === level ? "role-radio-label-active" : ""}`}>
// //                       <input type="radio" name="roleLevel" value={level} checked={formData.roleLevel === level} onChange={handleChange} className="sr-only"/>
// //                       <div className="text-center"><div className="font-medium capitalize">{level}</div><div className="text-xs opacity-75">{level === 'staff' ? 'Regular employee' : 'Team leader'}</div></div>
// //                     </label>
// //                   ))}
// //                 </div>
// //               </div>
// //             </div>
// //           </>
// //         )

// //       case "paralegal":
// //         return (
// //           <>
// //             <h3 className="text-lg font-semibold text-slate-800 border-t border-slate-200 pt-6">
// //               Paralegal Information
// //             </h3>
// //             <div className="space-y-6">
// //               <div>
// //                 <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number *</label>
// //                 <div className="relative">
// //                   <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
// //                   <input name="phoneNumber" placeholder="9876543210" value={formData.phoneNumber} onChange={handleChange} required pattern="\d{10}" title="Must be 10 digits" className="input-style pl-12"/>
// //                 </div>
// //               </div>
// //               <div>
// //                 <label className="block text-sm font-medium text-slate-700 mb-3">Areas of Expertise *</label>
// //                 <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
// //                   {["Aadhaar", "Pension", "Land", "Certificates", "Fraud", "Court", "Welfare"].map((area) => (
// //                     <label key={area} className={`expertise-checkbox-label ${formData.areasOfExpertise.includes(area) ? "expertise-checkbox-label-active" : ""}`}>
// //                       <input type="checkbox" name="areasOfExpertise" value={area} checked={formData.areasOfExpertise.includes(area)} onChange={handleChange} className="sr-only"/>
// //                       <span className="text-sm font-medium">{area}</span>
// //                     </label>
// //                   ))}
// //                 </div>
// //                 <p className="text-xs text-slate-500 mt-2">Select at least one area of expertise.</p>
// //               </div>
// //             </div>
// //           </>
// //         )
      
// //       case "admin":
// //         return (
// //           <>
// //             <h3 className="text-lg font-semibold text-slate-800 border-t border-slate-200 pt-6">
// //               Administrator Information
// //             </h3>
// //             <div className="space-y-6">
// //                <div>
// //                 <label className="block text-sm font-medium text-slate-700 mb-2">Admin Role *</label>
// //                 <div className="relative">
// //                   <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
// //                   <select name="adminRole" value={formData.adminRole} onChange={handleChange} required className="input-style pl-12 appearance-none">
// //                     <option value="SuperAdmin">Super Admin</option>
// //                     <option value="DistrictAdmin">District Admin</option>
// //                   </select>
// //                 </div>
// //               </div>
// //                <div>
// //                 <label className="block text-sm font-medium text-slate-700 mb-2">Assigned Districts</label>
// //                 <div className="relative">
// //                   <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
// //                   <input name="assignedDistricts" placeholder="Mathura, Agra (comma-separated)" value={formData.assignedDistricts} onChange={handleChange} className="input-style pl-12"/>
// //                 </div>
// //                 <p className="text-xs text-slate-500 mt-1">Required for District Admins. Enter comma-separated names.</p>
// //               </div>
// //             </div>
// //           </>
// //         )
// //       default:
// //         return null
// //     }
// //   }

// //   return (
// //     <div className="w-full min-h-screen bg-slate-50 flex items-center justify-center p-4">
// //       <div className="w-full max-w-6xl mx-auto flex rounded-2xl shadow-2xl overflow-hidden bg-white my-8">
// //         {/* Left Side - Image */}
// //         <div className="hidden lg:block lg:w-2/5 relative">
// //           <img src="/hero-image.jpg" alt="Community hands together" className="w-full h-full object-cover" />
// //           <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 to-blue-500/30"></div>
// //           <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-white text-center">
// //              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
// //               <Scale size={32} />
// //             </div>
// //             <h3 className="text-3xl font-bold mb-3">Join NyayaSaathi</h3>
// //             <p className="text-white/80 leading-relaxed">Empowering every citizen with accessible and fair legal justice.</p>
// //           </div>
// //         </div>

// //         {/* Right Side - Form */}
// //         <div className="w-full lg:w-3/5 p-8 sm:p-12 max-h-[90vh] overflow-y-auto">
// //           <div className="text-center mb-8">
// //             <h2 className="text-3xl font-bold text-slate-900 mb-2">Create an Account</h2>
// //             <p className="text-slate-600">Join our mission to make justice accessible for all.</p>
// //           </div>

// //           {error && <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6 text-center">{error}</div>}

// //           <form onSubmit={handleSubmit} className="space-y-6">
            
// //             {/* --- STEP 1: ROLE SELECTION --- */}
// //             <div>
// //               <h3 className="text-lg font-semibold text-slate-800 mb-4">Select Your Role</h3>
// //               <div className="grid grid-cols-2 gap-4">
// //                 {[
// //                   { value: "citizen", label: "Citizen", icon: <User size={20} /> },
// //                   { value: "employee", label: "Employee", icon: <Users size={20} /> },
// //                   { value: "paralegal", label: "Paralegal", icon: <Award size={20} /> },
// //                   { value: "admin", label: "Admin", icon: <Building size={20} /> },
// //                 ].map((role) => (
// //                   <label key={role.value} className={`flex flex-col sm:flex-row items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${formData.role === role.value ? "border-cyan-500 bg-cyan-50 text-cyan-700" : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"}`}>
// //                     <input type="radio" name="role" value={role.value} checked={formData.role === role.value} onChange={handleChange} className="sr-only"/>
// //                     <div className="flex-shrink-0">{role.icon}</div>
// //                     <div className="text-center sm:text-left">
// //                       <div className="font-medium">{role.label}</div>
// //                       <div className="text-xs opacity-75 hidden sm:block">{getRoleDescription(role.value)}</div>
// //                     </div>
// //                   </label>
// //                 ))}
// //               </div>
// //             </div>
            
// //             {/* --- STEP 2: ACCOUNT CREDENTIALS --- */}
// //             <h3 className="text-lg font-semibold text-slate-800 border-t border-slate-200 pt-6">
// //               Account Credentials
// //             </h3>
// //             <div className="space-y-6">
// //               <div>
// //                 <label className="block text-sm font-medium text-slate-700 mb-2">Full Name *</label>
// //                 <div className="relative">
// //                   <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
// //                   <input name="fullName" placeholder="Enter your full name" value={formData.fullName} onChange={handleChange} required className="input-style pl-12"/>
// //                 </div>
// //               </div>
// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                 <div>
// //                   <label className="block text-sm font-medium text-slate-700 mb-2">Email Address *</label>
// //                   <div className="relative">
// //                     <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
// //                     <input name="email" type="email" placeholder="your@email.com" value={formData.email} onChange={handleChange} required className="input-style pl-12"/>
// //                   </div>
// //                 </div>
// //                 <div>
// //                   <label className="block text-sm font-medium text-slate-700 mb-2">Password *</label>
// //                   <div className="relative">
// //                     <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
// //                     <input name="password" type={showPassword ? "text" : "password"} placeholder="Min 6 characters" value={formData.password} onChange={handleChange} required minLength={6} className="input-style pl-12 pr-12"/>
// //                     <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600">
// //                       {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
// //                     </button>
// //                   </div>
// //                 </div>
// //               </div>
// //               <div>
// //                 <label className="block text-sm font-medium text-slate-700 mb-2">Aadhaar Number *</label>
// //                 <div className="relative">
// //                   <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
// //                   <input name="aadhaarNumber" placeholder="12-digit Aadhaar number" value={formData.aadhaarNumber} onChange={handleChange} required pattern="\d{12}" title="Must be 12 digits" className="input-style pl-12"/>
// //                 </div>
// //               </div>
// //             </div>
            
// //             {/* --- STEP 3: ROLE-SPECIFIC FIELDS --- */}
// //             {renderRoleSpecificFields()}

// //             <button type="submit" disabled={loading} className="w-full btn-primary text-lg py-4 group mt-8">
// //               {loading ? (
// //                 <>
// //                   <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
// //                   Creating Account...
// //                 </>
// //               ) : (
// //                 <>
// //                   Create Account
// //                   <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
// //                 </>
// //               )}
// //             </button>
// //           </form>

// //           <p className="mt-8 text-center text-sm text-slate-600">
// //             Already have an account?{" "}
// //             <Link to="/login" className="font-medium text-cyan-600 hover:text-cyan-700 transition-colors">
// //               Sign in
// //             </Link>
// //           </p>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }
 
// // export default RegisterPage
// "use client"

// import { useState, useEffect } from "react"
// import { useAuth } from "../context/AuthContext"
// import { Link, Navigate } from "react-router-dom"
// import Spinner from "../components/Spinner"
// import {
//   User,
//   Mail,
//   Lock,
//   CreditCard,
//   Users,
//   Building,
//   Phone,
//   Award,
//   MapPin,
//   Eye,
//   EyeOff,
//   Scale,
//   ArrowRight,
//   Search,
//   AlertCircle,
// } from "lucide-react"
// import apiClient from "../api/axiosConfig"
// import toast from "react-hot-toast"

// const RegisterPage = () => {
//   const { register, isAuthenticated, isLoading } = useAuth()
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     aadhaarNumber: "",
//     role: "citizen",
//     phoneNumber: "",
//     department: "",
//     designation: "",
//     roleLevel: "staff",
//     kioskId: "",
//     areasOfExpertise: [],
//     assignedDistricts: [],
//     status: "active",
//     adminRole: "DistrictAdmin",
//   })
//   const [error, setError] = useState(null)
//   const [loading, setLoading] = useState(false)
//   const [showPassword, setShowPassword] = useState(false)
//   const [kiosks, setKiosks] = useState([])
//   const [loadingKiosks, setLoadingKiosks] = useState(false)
//   const [kioskError, setKioskError] = useState(null)
//   const [kioskSearch, setKioskSearch] = useState("")
//   const [filteredKiosks, setFilteredKiosks] = useState([])

//   useEffect(() => {
//     if (formData.role === "employee") {
//       fetchKiosks()
//     } else {
//       setKiosks([])
//       setFilteredKiosks([])
//       setKioskError(null)
//     }
//   }, [formData.role])

//   useEffect(() => {
//     if (kioskSearch.trim()) {
//       const lowerCaseSearch = kioskSearch.toLowerCase()
//       const filtered = kiosks.filter(
//         (kiosk) =>
//           kiosk.location?.toLowerCase().includes(lowerCaseSearch) ||
//           kiosk.village?.toLowerCase().includes(lowerCaseSearch) ||
//           kiosk.district?.toLowerCase().includes(lowerCaseSearch) ||
//           kiosk.organizationName?.toLowerCase().includes(lowerCaseSearch) ||
//           kiosk.organizationType?.toLowerCase().includes(lowerCaseSearch)
//       )
//       setFilteredKiosks(filtered)
//     } else {
//       setFilteredKiosks(kiosks)
//     }
//   }, [kioskSearch, kiosks])

//   // In RegisterPage.jsx

//   const fetchKiosks = async () => {
//     setLoadingKiosks(true);
//     setKioskError(null);
    
//     try {
//       // The endpoint is correct, and we now expect the backend 
//       // to return only active, non-deleted kiosks.
//       const response = await apiClient.get("/api/kiosks");
//       const activeKiosks = response.data;

//       if (!Array.isArray(activeKiosks)) {
//         throw new Error("API returned an unexpected data format.");
//       }

//       if (activeKiosks.length === 0) {
//         setKioskError("No active kiosks are available. Please contact an administrator.");
//         toast.error("No active kiosks found for assignment.");
//       } else {
//         setKiosks(activeKiosks);
//         setFilteredKiosks(activeKiosks);
//         toast.success(`Successfully loaded ${activeKiosks.length} active kiosks.`);
//       }
      
//     } catch (err) {
//       console.error("Failed to fetch kiosks:", err);
//       let errorMessage = "An unknown error occurred while fetching kiosks.";
      
//       if (err.response) {
//         errorMessage = `Server Error: ${err.response.data?.message || err.response.statusText}`;
//       } else if (err.request) {
//         errorMessage = "Network Error: Could not connect to the server. Is it running?";
//       } else {
//         errorMessage = err.message;
//       }
      
//       setKioskError(errorMessage);
//       toast.error(`Kiosk loading failed: ${errorMessage}`);
//     } finally {
//       setLoadingKiosks(false);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target

//     if (name === "areasOfExpertise") {
//       const currentAreas = formData.areasOfExpertise || []
//       if (checked) {
//         setFormData({ ...formData, areasOfExpertise: [...currentAreas, value] })
//       } else {
//         setFormData({ ...formData, areasOfExpertise: currentAreas.filter((area) => area !== value) })
//       }
//     } else {
//       setFormData({ ...formData, [name]: value })
//     }
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setError(null)

//     if (formData.role === "employee" && !formData.kioskId) {
//       setError("Kiosk selection is required for employees.")
//       toast.error("Please select a kiosk to proceed.")
//       return
//     }
//     if (formData.role === "paralegal" && (!formData.areasOfExpertise || formData.areasOfExpertise.length === 0)) {
//       setError("At least one area of expertise is required for paralegals.")
//       toast.error("Please select your areas of expertise.")
//       return
//     }

//     setLoading(true)

//     try {
//       const payload = {
//         fullName: formData.fullName,
//         email: formData.email,
//         password: formData.password,
//         aadhaarNumber: formData.aadhaarNumber,
//         role: formData.role,
//         phoneNumber: formData.phoneNumber,
//       }

//       if (formData.role === "employee") {
//         payload.department = formData.department
//         payload.designation = formData.designation
//         payload.roleLevel = formData.roleLevel
//         payload.kioskId = formData.kioskId
//       } else if (formData.role === "paralegal") {
//         payload.areasOfExpertise = formData.areasOfExpertise
//       } else if (formData.role === "admin") {
//         payload.assignedDistricts = formData.assignedDistricts.split(",").map(d => d.trim()).filter(Boolean)
//         payload.status = formData.status
//         payload.adminRole = formData.adminRole
//       }

//       await register(payload)
//     } catch (err) {
//       setError(err.message || "Registration failed. Please check your details and try again.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const getRoleDescription = (role) => {
//     switch (role) {
//       case "citizen": return "Access legal help and manage your issues"
//       case "employee": return "Help citizens with legal processes at kiosks"
//       case "paralegal": return "Provide legal guidance and support"
//       case "admin": return "Manage system and oversee operations"
//       default: return ""
//     }
//   }

//   if (isLoading) return <Spinner />
//   if (isAuthenticated) return <Navigate to="/dashboard" replace />

//   const renderRoleSpecificFields = () => {
//     switch (formData.role) {
//       case "employee":
//         return (
//           <>
//             <h3 className="text-lg font-semibold text-slate-800 border-t border-slate-200 pt-6">
//               Employee Information
//             </h3>
//             <div className="space-y-6">
//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-2">Kiosk Assignment *</label>
                
//                 <div className="relative mb-3">
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
//                   <input
//                     type="text"
//                     placeholder="Search by location, village, or district..."
//                     value={kioskSearch}
//                     onChange={(e) => setKioskSearch(e.target.value)}
//                     className="input-style pl-12"
//                     disabled={loadingKiosks || !!kioskError}
//                   />
//                 </div>

//                 <div className="relative">
//                   <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
//                   <select
//                     name="kioskId"
//                     value={formData.kioskId}
//                     onChange={handleChange}
//                     required
//                     className="input-style pl-12 appearance-none"
//                     disabled={loadingKiosks || !!kioskError}
//                   >
//                     <option value="">
//                       {loadingKiosks ? "Loading kiosks..." 
//                         : kioskError ? "Error loading kiosks" 
//                         : filteredKiosks.length === 0 ? "No kiosks available" 
//                         : "Select a kiosk"
//                       }
//                     </option>
//                     {filteredKiosks.map((kiosk) => (
//                       <option key={kiosk._id} value={kiosk._id}>
//                         {`${kiosk.location} - ${kiosk.village}, ${kiosk.district}`}
//                         {kiosk.organizationName && ` (${kiosk.organizationName})`}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 {loadingKiosks && (
//                   <div className="flex items-center gap-2 text-xs text-blue-600 mt-1">
//                     <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-600"></div>
//                     Loading available kiosks...
//                   </div>
//                 )}
                
//                 {kioskError && (
//                   <div className="flex items-center gap-2 text-xs text-red-600 mt-1">
//                     <AlertCircle size={12} />
//                     {kioskError}
//                     <button type="button" onClick={fetchKiosks} className="underline hover:no-underline ml-1">
//                       Retry
//                     </button>
//                   </div>
//                 )}
                
//                 {!loadingKiosks && !kioskError && kioskSearch && filteredKiosks.length === 0 && (
//                   <p className="text-xs text-orange-600 mt-1">No kiosks found matching your search.</p>
//                 )}
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-slate-700 mb-2">Department *</label>
//                   <div className="relative">
//                     <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
//                     <input name="department" placeholder="Legal Helpdesk" value={formData.department} onChange={handleChange} required className="input-style pl-12" />
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-slate-700 mb-2">Designation *</label>
//                   <div className="relative">
//                     <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
//                     <input name="designation" placeholder="Field Officer" value={formData.designation} onChange={handleChange} required className="input-style pl-12" />
//                   </div>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-2">Role Level *</label>
//                 <div className="grid grid-cols-2 gap-4">
//                   {["staff", "manager"].map((level) => (
//                     <label key={level} className={`role-radio-label ${formData.roleLevel === level ? "role-radio-label-active" : ""}`}>
//                       <input type="radio" name="roleLevel" value={level} checked={formData.roleLevel === level} onChange={handleChange} className="sr-only"/>
//                       <div className="text-center">
//                         <div className="font-medium capitalize">{level}</div>
//                         <div className="text-xs opacity-75">{level === 'staff' ? 'Regular employee' : 'Team leader'}</div>
//                       </div>
//                     </label>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </>
//         )

//       case "paralegal":
//         return (
//           <>
//             <h3 className="text-lg font-semibold text-slate-800 border-t border-slate-200 pt-6">Paralegal Information</h3>
//             <div className="space-y-6">
//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number *</label>
//                 <div className="relative">
//                   <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
//                   <input name="phoneNumber" placeholder="9876543210" value={formData.phoneNumber} onChange={handleChange} required pattern="\d{10}" title="Must be 10 digits" className="input-style pl-12"/>
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-3">Areas of Expertise *</label>
//                 <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//                   {["Aadhaar", "Pension", "Land", "Certificates", "Fraud", "Court", "Welfare"].map((area) => (
//                     <label key={area} className={`expertise-checkbox-label ${formData.areasOfExpertise.includes(area) ? "expertise-checkbox-label-active" : ""}`}>
//                       <input type="checkbox" name="areasOfExpertise" value={area} checked={formData.areasOfExpertise.includes(area)} onChange={handleChange} className="sr-only"/>
//                       <span className="text-sm font-medium">{area}</span>
//                     </label>
//                   ))}
//                 </div>
//                 <p className="text-xs text-slate-500 mt-2">Select at least one area of expertise.</p>
//               </div>
//             </div>
//           </>
//         )
      
//       case "admin":
//         return (
//           <>
//             <h3 className="text-lg font-semibold text-slate-800 border-t border-slate-200 pt-6">Administrator Information</h3>
//             <div className="space-y-6">
//                <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-2">Admin Role *</label>
//                 <div className="relative">
//                   <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
//                   <select name="adminRole" value={formData.adminRole} onChange={handleChange} required className="input-style pl-12 appearance-none">
//                     <option value="SuperAdmin">Super Admin</option>
//                     <option value="DistrictAdmin">District Admin</option>
//                   </select>
//                 </div>
//               </div>
//                <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-2">Assigned Districts</label>
//                 <div className="relative">
//                   <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
//                   <input name="assignedDistricts" placeholder="Mathura, Agra (comma-separated)" value={formData.assignedDistricts} onChange={handleChange} className="input-style pl-12"/>
//                 </div>
//                 <p className="text-xs text-slate-500 mt-1">Required for District Admins. Enter comma-separated names.</p>
//               </div>
//             </div>
//           </>
//         )
//       default:
//         return null
//     }
//   }

//   return (
//     <div className="w-full min-h-screen bg-slate-50 flex items-center justify-center p-4">
//       <div className="w-full max-w-6xl mx-auto flex rounded-2xl shadow-2xl overflow-hidden bg-white my-8">
//         <div className="hidden lg:block lg:w-2/5 relative">
//           <img src="/hero-image.jpg" alt="Community hands together" className="w-full h-full object-cover" />
//           <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 to-blue-500/30"></div>
//           <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-white text-center">
//              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
//               <Scale size={32} />
//             </div>
//             <h3 className="text-3xl font-bold mb-3">Join NyayaSaathi</h3>
//             <p className="text-white/80 leading-relaxed">Empowering every citizen with accessible and fair legal justice.</p>
//           </div>
//         </div>

//         <div className="w-full lg:w-3/5 p-8 sm:p-12 max-h-[90vh] overflow-y-auto">
//           <div className="text-center mb-8">
//             <h2 className="text-3xl font-bold text-slate-900 mb-2">Create an Account</h2>
//             <p className="text-slate-600">Join our mission to make justice accessible for all.</p>
//           </div>

//           {error && <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6 text-center">{error}</div>}

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <h3 className="text-lg font-semibold text-slate-800 mb-4">Select Your Role</h3>
//               <div className="grid grid-cols-2 gap-4">
//                 {[
//                   { value: "citizen", label: "Citizen", icon: <User size={20} /> },
//                   { value: "employee", label: "Employee", icon: <Users size={20} /> },
//                   { value: "paralegal", label: "Paralegal", icon: <Award size={20} /> },
//                   { value: "admin", label: "Admin", icon: <Building size={20} /> },
//                 ].map((role) => (
//                   <label key={role.value} className={`flex flex-col sm:flex-row items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${formData.role === role.value ? "border-cyan-500 bg-cyan-50 text-cyan-700" : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"}`}>
//                     <input type="radio" name="role" value={role.value} checked={formData.role === role.value} onChange={handleChange} className="sr-only"/>
//                     <div className="flex-shrink-0">{role.icon}</div>
//                     <div className="text-center sm:text-left">
//                       <div className="font-medium">{role.label}</div>
//                       <div className="text-xs opacity-75 hidden sm:block">{getRoleDescription(role.value)}</div>
//                     </div>
//                   </label>
//                 ))}
//               </div>
//             </div>
            
//             <h3 className="text-lg font-semibold text-slate-800 border-t border-slate-200 pt-6">
//               Account Credentials
//             </h3>
//             <div className="space-y-6">
//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-2">Full Name *</label>
//                 <div className="relative">
//                   <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
//                   <input name="fullName" placeholder="Enter your full name" value={formData.fullName} onChange={handleChange} required className="input-style pl-12"/>
//                 </div>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-slate-700 mb-2">Email Address *</label>
//                   <div className="relative">
//                     <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
//                     <input name="email" type="email" placeholder="your@email.com" value={formData.email} onChange={handleChange} required className="input-style pl-12"/>
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-slate-700 mb-2">Password *</label>
//                   <div className="relative">
//                     <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
//                     <input name="password" type={showPassword ? "text" : "password"} placeholder="Min 6 characters" value={formData.password} onChange={handleChange} required minLength={6} className="input-style pl-12 pr-12"/>
//                     <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600">
//                       {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-2">Aadhaar Number *</label>
//                 <div className="relative">
//                   <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
//                   <input name="aadhaarNumber" placeholder="12-digit Aadhaar number" value={formData.aadhaarNumber} onChange={handleChange} required pattern="\d{12}" title="Must be 12 digits" className="input-style pl-12"/>
//                 </div>
//               </div>
//             </div>
            
//             {renderRoleSpecificFields()}

//             <button type="submit" disabled={loading} className="w-full btn-primary text-lg py-4 group mt-8">
//               {loading ? (
//                 <>
//                   <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                   Creating Account...
//                 </>
//               ) : (
//                 <>
//                   Create Account
//                   <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
//                 </>
//               )}
//             </button>
//           </form>

//           <p className="mt-8 text-center text-sm text-slate-600">
//             Already have an account?{" "}
//             <Link to="/login" className="font-medium text-cyan-600 hover:text-cyan-700 transition-colors">
//               Sign in
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }
 
// export default RegisterPage
"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { Link, Navigate } from "react-router-dom"
import Spinner from "../components/Spinner"
import {
  User, Mail, Lock, CreditCard, Users, Building, Phone, Award,
  MapPin, Eye, EyeOff, Scale, ArrowRight, Search, AlertCircle,
} from "lucide-react"
import apiClient from "../api/axiosConfig"
import toast from "react-hot-toast"

const RegisterPage = () => {
  const { register, isAuthenticated, isLoading } = useAuth()
  const [formData, setFormData] = useState({
    fullName: "", email: "", password: "", aadhaarNumber: "", role: "citizen",
    phoneNumber: "", department: "", designation: "", roleLevel: "staff",
    kioskId: "", areasOfExpertise: [], assignedDistricts: [],
    status: "active", adminRole: "DistrictAdmin",
  })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [kiosks, setKiosks] = useState([])
  const [loadingKiosks, setLoadingKiosks] = useState(false)
  const [kioskError, setKioskError] = useState(null)
  const [kioskSearch, setKioskSearch] = useState("")
  const [filteredKiosks, setFilteredKiosks] = useState([])

  useEffect(() => {
    if (formData.role === "employee") {
      fetchKiosks()
    } else {
      setKiosks([]); setFilteredKiosks([]); setKioskError(null)
    }
  }, [formData.role])

  useEffect(() => {
    if (kioskSearch.trim()) {
      const lowerCaseSearch = kioskSearch.toLowerCase()
      const filtered = kiosks.filter(
        (kiosk) =>
          kiosk.location?.toLowerCase().includes(lowerCaseSearch) ||
          kiosk.village?.toLowerCase().includes(lowerCaseSearch) ||
          kiosk.district?.toLowerCase().includes(lowerCaseSearch) ||
          kiosk.organizationName?.toLowerCase().includes(lowerCaseSearch) ||
          kiosk.organizationType?.toLowerCase().includes(lowerCaseSearch)
      )
      setFilteredKiosks(filtered)
    } else {
      setFilteredKiosks(kiosks)
    }
  }, [kioskSearch, kiosks])

  const fetchKiosks = async () => {
    setLoadingKiosks(true)
    setKioskError(null)
    
    try {
      // --- THE FINAL FIX IS HERE ---
      // The request should be to "/kiosks". Axios automatically prepends the baseURL
      // from axiosConfig.js, resulting in the correct call to "http://localhost:5001/api/kiosks".
      const response = await apiClient.get("/kiosks")
      const activeKiosks = response.data

      if (!Array.isArray(activeKiosks)) {
        throw new Error("API returned an unexpected data format.")
      }

      if (activeKiosks.length === 0) {
        setKioskError("No active kiosks are available. Please contact an administrator.")
        toast.error("No active kiosks found for assignment.")
      } else {
        setKiosks(activeKiosks)
        setFilteredKiosks(activeKiosks)
      }
      
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "An unknown error occurred."
      setKioskError(`Server Error: ${errorMessage}`)
      toast.error(`Kiosk loading failed: ${errorMessage}`)
    } finally {
      setLoadingKiosks(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (formData.role === "employee" && !formData.kioskId) {
      toast.error("Kiosk selection is required for employees.")
      return
    }

    setLoading(true)
    try {
      await register(formData)
    } catch (err) {
      // The error is already toasted in AuthContext, but we can set a local state if needed
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (isLoading && !isAuthenticated) return <Spinner />
  if (isAuthenticated) return <Navigate to="/dashboard" replace />

  // --- Omitted the rest of the file for brevity, it remains the same ---
  // The only change is in the fetchKiosks function above.
  // You can just replace that function in your existing file.

  const getRoleDescription = (role) => {
    switch (role) {
      case "citizen": return "Access legal help and manage your issues"
      case "employee": return "Help citizens with legal processes at kiosks"
      case "paralegal": return "Provide legal guidance and support"
      case "admin": return "Manage system and oversee operations"
      default: return ""
    }
  }

  const renderRoleSpecificFields = () => {
    switch (formData.role) {
      case "employee":
        return (
          <>
            <h3 className="text-lg font-semibold text-slate-800 border-t border-slate-200 pt-6">
              Employee Information
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Kiosk Assignment *</label>
                
                <div className="relative mb-3">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search by location, village, or district..."
                    value={kioskSearch}
                    onChange={(e) => setKioskSearch(e.target.value)}
                    className="input-style pl-12"
                    disabled={loadingKiosks || !!kioskError}
                  />
                </div>

                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                  <select
                    name="kioskId"
                    value={formData.kioskId}
                    onChange={handleChange}
                    required
                    className="input-style pl-12 appearance-none"
                    disabled={loadingKiosks || !!kioskError}
                  >
                    <option value="">
                      {loadingKiosks ? "Loading kiosks..." 
                        : kioskError ? "Error loading kiosks" 
                        : filteredKiosks.length === 0 ? "No kiosks available" 
                        : "Select a kiosk"
                      }
                    </option>
                    {filteredKiosks.map((kiosk) => (
                      <option key={kiosk._id} value={kiosk._id}>
                        {`${kiosk.location} - ${kiosk.village}, ${kiosk.district}`}
                        {kiosk.organizationName && ` (${kiosk.organizationName})`}
                      </option>
                    ))}
                  </select>
                </div>

                {kioskError && (
                  <div className="flex items-center gap-2 text-xs text-red-600 mt-1">
                    <AlertCircle size={12} />
                    {kioskError}
                    <button type="button" onClick={fetchKiosks} className="underline hover:no-underline ml-1">
                      Retry
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Department *</label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                    <input name="department" placeholder="Legal Helpdesk" value={formData.department} onChange={handleChange} required className="input-style pl-12" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Designation *</label>
                  <div className="relative">
                    <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                    <input name="designation" placeholder="Field Officer" value={formData.designation} onChange={handleChange} required className="input-style pl-12" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Role Level *</label>
                <div className="grid grid-cols-2 gap-4">
                  {["staff", "manager"].map((level) => (
                    <label key={level} className={`role-radio-label ${formData.roleLevel === level ? "role-radio-label-active" : ""}`}>
                      <input type="radio" name="roleLevel" value={level} checked={formData.roleLevel === level} onChange={handleChange} className="sr-only"/>
                      <div className="text-center">
                        <div className="font-medium capitalize">{level}</div>
                        <div className="text-xs opacity-75">{level === 'staff' ? 'Regular employee' : 'Team leader'}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </>
        )
      default: return null
    }
  }

  return (
    <div className="w-full min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto flex rounded-2xl shadow-2xl overflow-hidden bg-white my-8">
        <div className="hidden lg:block lg:w-2/5 relative">
          <img src="/hero-image.jpg" alt="Community hands together" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 to-blue-500/30"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-white text-center">
             <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
              <Scale size={32} />
            </div>
            <h3 className="text-3xl font-bold mb-3">Join NyayaSaathi</h3>
            <p className="text-white/80 leading-relaxed">Empowering every citizen with accessible and fair legal justice.</p>
          </div>
        </div>

        <div className="w-full lg:w-3/5 p-8 sm:p-12 max-h-[90vh] overflow-y-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Create an Account</h2>
            <p className="text-slate-600">Join our mission to make justice accessible for all.</p>
          </div>

          {error && <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6 text-center">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Select Your Role</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "citizen", label: "Citizen", icon: <User size={20} /> },
                  { value: "employee", label: "Employee", icon: <Users size={20} /> },
                  { value: "paralegal", label: "Paralegal", icon: <Award size={20} /> },
                  { value: "admin", label: "Admin", icon: <Building size={20} /> },
                ].map((role) => (
                  <label key={role.value} className={`flex flex-col sm:flex-row items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${formData.role === role.value ? "border-cyan-500 bg-cyan-50 text-cyan-700" : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"}`}>
                    <input type="radio" name="role" value={role.value} checked={formData.role === role.value} onChange={handleChange} className="sr-only"/>
                    <div className="flex-shrink-0">{role.icon}</div>
                    <div className="text-center sm:text-left">
                      <div className="font-medium">{role.label}</div>
                      <div className="text-xs opacity-75 hidden sm:block">{getRoleDescription(role.value)}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            
            <h3 className="text-lg font-semibold text-slate-800 border-t border-slate-200 pt-6">
              Account Credentials
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Full Name *</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                  <input name="fullName" placeholder="Enter your full name" value={formData.fullName} onChange={handleChange} required className="input-style pl-12"/>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email Address *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                    <input name="email" type="email" placeholder="your@email.com" value={formData.email} onChange={handleChange} required className="input-style pl-12"/>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Password *</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                    <input name="password" type={showPassword ? "text" : "password"} placeholder="Min 6 characters" value={formData.password} onChange={handleChange} required minLength={6} className="input-style pl-12 pr-12"/>
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600">
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Aadhaar Number *</label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                  <input name="aadhaarNumber" placeholder="12-digit Aadhaar number" value={formData.aadhaarNumber} onChange={handleChange} required pattern="\d{12}" title="Must be 12 digits" className="input-style pl-12"/>
                </div>
              </div>
            </div>
            
            {renderRoleSpecificFields()}

            <button type="submit" disabled={loading} className="w-full btn-primary text-lg py-4 group mt-8">
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-cyan-600 hover:text-cyan-700 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
 
export default RegisterPage;