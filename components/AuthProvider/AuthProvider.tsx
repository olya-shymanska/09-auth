'use client'
import { checkSession } from "@/lib/clientApi"
import { authStore } from "@/lib/store/authStore"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import Loader from "../Loader/Loader"
import { useRouter } from "next/navigation"

type Props = {
    children: React.ReactNode
  }  

export const AuthProvider = ({ children }: Props) => {
    
    const [checkingSession, setCheckingSession] = useState(true);

    const { setUser, clearIsAuthenticated } = authStore(); 

    const privateRoutes = ['/profile', '/notes'];
    const publicRoutes = ['/sign-in', '/sign-up'];

    const pathname = usePathname();

    const isPrivatePage = privateRoutes.some(route => pathname.startsWith(route));
    const isPublicPage = publicRoutes.some(route => pathname.startsWith(route));

    const router = useRouter()

    useEffect(() => {
        const fetchSession = async () => {
            try {
                setCheckingSession(true);
                const userSession = await checkSession();
                setUser(userSession);
                if (isPublicPage && userSession) {
                   router.push('/profile')
                }
                setCheckingSession(false)
            } catch {
                clearIsAuthenticated();
                setCheckingSession(false);
                if (isPrivatePage) {
                  router.push('/sign-in')
                }
            }
        }
        fetchSession();
    }, [setUser, clearIsAuthenticated, isPrivatePage, isPublicPage, router]);

    return (checkingSession ? <Loader /> : children );

}