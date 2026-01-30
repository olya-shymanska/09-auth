'use client'
import { authStore } from "@/lib/store/authStore"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { logout } from "@/lib/clientApi"
import css from './AuthNavigation.module.css'

export const AuthNavigation = () => {
    const { isAuthenticated, clearIsAuthenticated, user, checkingSession } = authStore();
    const router = useRouter();

    const onLogoutClick = async () => {
        await logout();
        clearIsAuthenticated();
        router.push('/sign-in');
    };

    if (checkingSession) return null;

    if (!isAuthenticated || !user) {
        return (
          <>
            <li className={css.navigationItem}>
              <Link href="/sign-in" className={css.navigationLink}>
                Login
              </Link>
            </li>
            <li className={css.navigationItem}>
              <Link href="/sign-up" className={css.navigationLink}>
                Sign up
              </Link>
            </li>
          </>
        );
      }
      return (
        <>
          <li className={css.navigationItem}>
            <Link href="/profile" className={css.navigationLink}>
              Profile
            </Link>
          </li>
          <li className={css.navigationItem}>
            <p className={css.userEmail}>{user.email}</p>
            <button onClick={onLogoutClick} className={css.logoutButton}>
              Logout
            </button>
          </li>
        </>
      );
    };

