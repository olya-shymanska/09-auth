'use client'
import { checkSession } from "@/lib/clientApi"
import { authStore } from "@/lib/store/authStore"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import Loader from "../Loader/Loader"

type Props = {
    children: React.ReactNode
  }  

export const AuthProvider = ({ children }: Props) => {
    
    const [checkingSession, setCheckingSession] = useState(true);

    const { setUser, clearIsAuthenticated } = authStore(); 

    const pathname = usePathname();

    const privateRoutes = ['/profile', '/notes'];

    const isPrivatePage = privateRoutes.some(route => pathname.startsWith(route));

    useEffect(() => {
        const verify = async () => {
            try {
                setCheckingSession(true);
                const userSession = await checkSession();
                if (userSession) {
                    setUser(userSession)
                } else if (isPrivatePage) {
                    clearIsAuthenticated()
                }
            } catch {
                clearIsAuthenticated();
            } finally {
                setCheckingSession(false);
            }
        }
        verify();
    }, [setUser, clearIsAuthenticated, isPrivatePage]);

    return (checkingSession ? <Loader /> :  children);

}