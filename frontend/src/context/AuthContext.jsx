import {
  createContext,
  useContext,
  useState,
} from "react"

import api from "../api/axios"


const AuthContext = createContext(null)


export function AuthProvider({ children }) {

  const [unlocked, setUnlocked] =
    useState(false)

  const [checkingAccess, setCheckingAccess] =
    useState(true)


  // ==========================================
  // CHECK EXISTING SESSION
  // ==========================================

  const checkAccess = async () => {

    try {

      await api.get(
        "/access/check"
      )

      setUnlocked(true)

    } catch {

      setUnlocked(false)

    } finally {

      setCheckingAccess(false)

    }
  }


  // ==========================================
  // UNLOCK
  // ==========================================

  const unlock = async (code) => {

    await api.post(
      "/access/unlock",
      {
        code,
      }
    )

    setUnlocked(true)
  }


  // ==========================================
  // LOCK
  // ==========================================

  const lock = async () => {

    await api.post(
      "/access/lock"
    )

    setUnlocked(false)
  }


  return (
    <AuthContext.Provider
      value={{
        unlocked,
        checkingAccess,
        checkAccess,
        unlock,
        lock,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}


export function useAuth() {

  const context =
    useContext(AuthContext)

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    )
  }

  return context
}