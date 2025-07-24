"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { Link, Navigate } from "react-router-dom"
import Spinner from "../components/Spinner"
import {
  User,
  Mail,
  Lock,
  CreditCard,
  Users,
  Building,
  Phone,
  Award,
  MapPin,
  Eye,
  EyeOff,
  Scale,
  ArrowRight,
} from "lucide-react"
import apiClient from "../api/axiosConfig"
import toast from "react-hot-toast"

const RegisterPage = () => {
  const { register, isAuthenticated, isLoading } = useAuth()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    aadhaarNumber: "",
    role: "citizen",
    phoneNumber: "",
    // Role-specific fields
    department: "",
    designation: "",
    roleLevel: "staff",
    kioskId: "",
    areasOfExpertise: [],
    assignedDistricts: [],
    status: "active",
    adminRole: "DistrictAdmin",
  })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [kiosks, setKiosks] = useState([])
  const [loadingKiosks, setLoadingKiosks] = useState(false)

  // Fetch kiosks when role is employee
  useEffect(() => {
    if (formData.role === "employee") {
      fetchKiosks()
    }
  }, [formData.role])

  const fetchKiosks = async () => {
    setLoadingKiosks(true)
    try {
      const response = await apiClient.get("/kiosks")
      setKiosks(response.data.data || response.data || [])
    } catch (err) {
      console.error("Failed to fetch kiosks:", err)
      toast.error("Failed to load kiosks")
    } finally {
      setLoadingKiosks(false)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    if (name === "areasOfExpertise") {
      const currentAreas = formData.areasOfExpertise || []
      if (checked) {
        setFormData({ ...formData, areasOfExpertise: [...currentAreas, value] })
      } else {
        setFormData({ ...formData, areasOfExpertise: currentAreas.filter((area) => area !== value) })
      }
    } else if (name === "assignedDistricts") {
      setFormData({
        ...formData,
        assignedDistricts: value
          .split(",")
          .map((d) => d.trim())
          .filter((d) => d),
      })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      // Prepare data based on role
      const submitData = { ...formData }

      // Clean up role-specific data
      if (formData.role === "citizen") {
        delete submitData.department
        delete submitData.designation
        delete submitData.roleLevel
        delete submitData.kioskId
        delete submitData.areasOfExpertise
        delete submitData.assignedDistricts
        delete submitData.status
        delete submitData.adminRole
      } else if (formData.role === "employee") {
        delete submitData.areasOfExpertise
        delete submitData.assignedDistricts
        delete submitData.status
        delete submitData.adminRole

        // Validate required employee fields
        if (!submitData.kioskId) {
          throw new Error("Kiosk selection is required for employees")
        }
        if (!submitData.department) {
          throw new Error("Department is required for employees")
        }
        if (!submitData.designation) {
          throw new Error("Designation is required for employees")
        }
      } else if (formData.role === "paralegal") {
        delete submitData.department
        delete submitData.designation
        delete submitData.roleLevel
        delete submitData.kioskId
        delete submitData.assignedDistricts
        delete submitData.status
        delete submitData.adminRole

        // Validate required paralegal fields
        if (!submitData.phoneNumber) {
          throw new Error("Phone number is required for paralegals")
        }
        if (!submitData.areasOfExpertise || submitData.areasOfExpertise.length === 0) {
          throw new Error("At least one area of expertise is required for paralegals")
        }
      } else if (formData.role === "admin") {
        delete submitData.department
        delete submitData.designation
        delete submitData.roleLevel
        delete submitData.kioskId
        delete submitData.areasOfExpertise
      }

      await register(submitData)
    } catch (err) {
      setError(err.message || "Registration failed.")
    } finally {
      setLoading(false)
    }
  }

  const renderRoleSpecificFields = () => {
    switch (formData.role) {
      case "employee":
        return (
          <div className="space-y-6">
            {/* Kiosk Selection */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Kiosk Assignment *</label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                <select
                  name="kioskId"
                  value={formData.kioskId}
                  onChange={handleChange}
                  required
                  className="input-style pl-12 appearance-none"
                  disabled={loadingKiosks}
                >
                  <option value="">{loadingKiosks ? "Loading kiosks..." : "Select a kiosk"}</option>
                  {kiosks.map((kiosk) => (
                    <option key={kiosk._id} value={kiosk._id}>
                      {kiosk.location} - {kiosk.village}, {kiosk.district}
                    </option>
                  ))}
                </select>
              </div>
              {loadingKiosks && <p className="text-xs text-slate-400 mt-1">Loading available kiosks...</p>}
            </div>

            {/* Department and Designation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Department *</label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    name="department"
                    placeholder="Legal Helpdesk"
                    value={formData.department}
                    onChange={handleChange}
                    required
                    className="input-style pl-12"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Designation *</label>
                <div className="relative">
                  <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    name="designation"
                    placeholder="Field Officer"
                    value={formData.designation}
                    onChange={handleChange}
                    required
                    className="input-style pl-12"
                  />
                </div>
              </div>
            </div>

            {/* Role Level */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Role Level *</label>
              <div className="grid grid-cols-2 gap-4">
                {["staff", "manager"].map((level) => (
                  <label
                    key={level}
                    className={`flex items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      formData.roleLevel === level
                        ? "border-cyan-500 bg-cyan-500/10 text-cyan-300"
                        : "border-slate-600 bg-slate-800/50 text-slate-300 hover:border-slate-500"
                    }`}
                  >
                    <input
                      type="radio"
                      name="roleLevel"
                      value={level}
                      checked={formData.roleLevel === level}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className="text-center">
                      <div className="font-medium capitalize">{level}</div>
                      <div className="text-xs opacity-75">{level === "staff" ? "Regular employee" : "Team leader"}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )

      case "paralegal":
        return (
          <div className="space-y-6">
            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Phone Number *</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                <input
                  name="phoneNumber"
                  placeholder="9876543210"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  pattern="\d{10}"
                  title="Must be 10 digits"
                  className="input-style pl-12"
                />
              </div>
            </div>

            {/* Areas of Expertise */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">Areas of Expertise *</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {["Aadhaar", "Pension", "Land", "Certificates", "Fraud", "Court", "Welfare"].map((area) => (
                  <label
                    key={area}
                    className={`flex items-center justify-center p-3 rounded-lg border cursor-pointer transition-all ${
                      formData.areasOfExpertise.includes(area)
                        ? "border-cyan-500 bg-cyan-500/10 text-cyan-300"
                        : "border-slate-600 bg-slate-800/50 text-slate-300 hover:border-slate-500"
                    }`}
                  >
                    <input
                      type="checkbox"
                      name="areasOfExpertise"
                      value={area}
                      checked={formData.areasOfExpertise.includes(area)}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <span className="text-sm font-medium">{area}</span>
                  </label>
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-2">Select at least one area of expertise</p>
            </div>
          </div>
        )

      case "admin":
        return (
          <div className="space-y-6">
            {/* Admin Role */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Admin Role *</label>
              <div className="relative">
                <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                <select
                  name="adminRole"
                  value={formData.adminRole}
                  onChange={handleChange}
                  required
                  className="input-style pl-12 appearance-none"
                >
                  <option value="SuperAdmin">Super Admin</option>
                  <option value="DistrictAdmin">District Admin</option>
                  <option value="DataEntryOperator">Data Entry Operator</option>
                  <option value="KioskAdmin">Kiosk Admin</option>
                </select>
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Status *</label>
              <div className="grid grid-cols-3 gap-4">
                {["active", "inactive", "suspended"].map((status) => (
                  <label
                    key={status}
                    className={`flex items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      formData.status === status
                        ? "border-cyan-500 bg-cyan-500/10 text-cyan-300"
                        : "border-slate-600 bg-slate-800/50 text-slate-300 hover:border-slate-500"
                    }`}
                  >
                    <input
                      type="radio"
                      name="status"
                      value={status}
                      checked={formData.status === status}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className="text-center">
                      <div className="font-medium capitalize">{status}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Assigned Districts */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Assigned Districts</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                <input
                  name="assignedDistricts"
                  placeholder="Mathura, Agra (comma-separated)"
                  value={formData.assignedDistricts.join(", ")}
                  onChange={handleChange}
                  className="input-style pl-12"
                />
              </div>
              <p className="text-xs text-slate-400 mt-1">Enter district names separated by commas</p>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const getRoleDescription = (role) => {
    switch (role) {
      case "citizen":
        return "Access legal help and manage your issues"
      case "employee":
        return "Help citizens with legal processes at kiosks"
      case "paralegal":
        return "Provide legal guidance and support"
      case "admin":
        return "Manage system and oversee operations"
      default:
        return ""
    }
  }

  if (isLoading) return <Spinner />
  if (isAuthenticated) return <Navigate to="/dashboard" replace />

  return (
    <div className="w-full max-w-6xl mx-auto flex rounded-2xl shadow-2xl overflow-hidden glass-card my-8">
      {/* Image Side */}
      <div className="hidden lg:block lg:w-2/5 relative">
        <img
          src="/login-background.png"
          alt="Community hands together, a sign of unity and support"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white p-8">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
              <Scale size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-2">Join NyayaSaathi</h3>
            <p className="text-white/80">Empowering rural India with legal justice</p>
          </div>
        </div>
      </div>

      {/* Form Side */}
      <div className="w-full lg:w-3/5 p-8 lg:p-12 flex flex-col justify-center max-h-screen overflow-y-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Create an Account</h2>
          <p className="text-slate-400">Join NyayaSaathi to access legal help</p>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-300 p-4 rounded-lg mb-6 text-center backdrop-blur-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-3">Select Your Role *</label>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "citizen", label: "Citizen", icon: <User size={20} /> },
                { value: "employee", label: "Employee", icon: <Users size={20} /> },
                { value: "paralegal", label: "Paralegal", icon: <Award size={20} /> },
                { value: "admin", label: "Admin", icon: <Building size={20} /> },
              ].map((role) => (
                <label
                  key={role.value}
                  className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    formData.role === role.value
                      ? "border-cyan-500 bg-cyan-500/10 text-cyan-300"
                      : "border-slate-600 bg-slate-800/50 text-slate-300 hover:border-slate-500"
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value={role.value}
                    checked={formData.role === role.value}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className="flex-shrink-0">{role.icon}</div>
                  <div>
                    <div className="font-medium">{role.label}</div>
                    <div className="text-xs opacity-75">{getRoleDescription(role.value)}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Basic Information */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Full Name *</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                <input
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="input-style pl-12"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Email Address *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="input-style pl-12"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Password *</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Min 6 characters"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                    className="input-style pl-12 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Aadhaar Number *</label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                <input
                  name="aadhaarNumber"
                  placeholder="12-digit Aadhaar number"
                  value={formData.aadhaarNumber}
                  onChange={handleChange}
                  required
                  pattern="\d{12}"
                  title="Must be 12 digits"
                  className="input-style pl-12"
                />
              </div>
            </div>
          </div>

          {/* Role-specific fields */}
          {renderRoleSpecificFields()}

          <button type="submit" disabled={loading} className="w-full btn-primary text-lg py-4 group">
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

        <p className="mt-8 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-cyan-400 hover:text-cyan-300 transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
