'use client'
import { useRouter } from "next/navigation"
import { authStore } from "@/lib/store/authStore"
import { login } from "@/lib/clientApi";
import { useMutation } from "@tanstack/react-query";
import { User } from "@/types/user";
import css from "./sign-in.module.css"
import { AxiosError } from "axios";

export default function SignIn () {

    const { setUser } = authStore();

    const router = useRouter();

    const {mutate, isError, error, isPending} = useMutation<User, AxiosError<{ message: string }>,  { email: string; password: string }>({
        mutationFn: login,
        onSuccess: (user) => {
            setUser(user);
            router.push('/profile');
        }
    })

    const handleSubmit = (formData: FormData) => {
        const values = Object.fromEntries(formData) as { email: string; password: string };;
        mutate(values);
    }

    return (
        <main className={css.mainContent}>
        <form className={css.form} action={handleSubmit}>
           <h1 className={css.formTitle}>Sign in</h1>
       
           <div className={css.formGroup}>
             <label htmlFor="email">Email</label>
             <input id="email" type="email" name="email" className={css.input} required />
           </div>
       
           <div className={css.formGroup}>
             <label htmlFor="password">Password</label>
             <input id="password" type="password" name="password" className={css.input} required />
           </div>
       
           <div className={css.actions}>
             <button type="submit" className={css.submitButton} disabled={isPending}>
             {isPending ? 'Signing in' : 'Sign in'}
             </button>
           </div>
       
           {isError && (
  <p className={css.error}>
    {error?.response?.data?.message ?? 'Invalid email or password'}
  </p>
)}
         </form>
       </main>
    )
}