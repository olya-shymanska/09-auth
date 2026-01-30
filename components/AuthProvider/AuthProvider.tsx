'use client'
import { checkSession } from "@/lib/api/clientApi"
import { authStore } from "@/lib/store/authStore"
import { useEffect } from "react"
import { getMe } from "@/lib/api/clientApi"
import Loader from "../Loader/Loader"

type Props = {
    children: React.ReactNode
  }  

export const AuthProvider = ({ children }: Props) => {
    

    const { setUser, clearIsAuthenticated, setCheckingSession, checkingSession } = authStore(); 

   useEffect(() => {
  const verify = async () => {
    try {
      setCheckingSession(true);

      const session = await checkSession();
      if (!session) {
        clearIsAuthenticated();
        return;
      }

      const me = await getMe();
      setUser(me);

    } catch {
      clearIsAuthenticated();
    } finally {
      setCheckingSession(false);
    }
  };

  verify();
}, [setUser, setCheckingSession, clearIsAuthenticated]);


    return checkingSession ? <Loader /> :  children;

}