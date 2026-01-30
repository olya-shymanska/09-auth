'use client'
import { useRouter } from "next/navigation"
import { authStore } from "@/lib/store/authStore"
import { register } from "@/lib/api/clientApi";
import { useMutation } from "@tanstack/react-query";
import { User } from "@/types/user";
import css from "./sign-up.module.css"
import { AxiosError } from "axios";

export default function SignUp () {

    const { setUser } = authStore();

    const router = useRouter();

    const {mutate, isError, error, isPending} = useMutation<User, AxiosError<{ message: string }>,  { email: string; password: string }>({
        mutationFn: register,
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
  <h1 className={css.formTitle}>Sign up</h1>
	<form className={css.form} action={handleSubmit}>
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
        {isPending ? 'Registering' : 'Register'}
      </button>
    </div>

    {isError && (
  <p className={css.error}>
    {error?.response?.data?.message ||
      'Registration failed. Please check your email and password.'}
  </p>
)}
  </form>
</main>
    )
}