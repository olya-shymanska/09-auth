'use client'
import { authStore } from "@/lib/store/authStore"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { logout } from "@/lib/clientApi"
import css from './AuthNavigation.module.css'

export const AuthNavigation = () => {
    const { isAuthenticated, clearIsAuthenticated, user } = authStore();
    const router = useRouter();

    const onLogoutClick = async () => {
        await logout()
        clearIsAuthenticated()
        router.push('/sign-in')
    };

    return ( isAuthenticated ?
        <>
            <li className={css.navigationItem}>
        <Link href="/profile" prefetch={false} className={css.navigationLink}>
    Profile
        </Link>
            </li>
            <li className={css.navigationItem}>
                <p className={css.userEmail}>{user?.email}</p>
        <button className={css.logoutButton} onClick={onLogoutClick}>
            Logout
        </button>
            </li>
        </>
 : 
        <>
            <li className={css.navigationItem}>
            <Link href="/sign-in" prefetch={false} className={css.navigationLink}>
            Login
            </Link>
            </li>

            <li className={css.navigationItem}>
            <Link href="/sign-up" prefetch={false} className={css.navigationLink}>
            Sign up
            </Link>
            </li>
        </>
    )
}