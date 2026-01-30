'use client'
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { authStore } from "@/lib/store/authStore"
import { updateMe } from "@/lib/clientApi"
import css from './ProfileEdit.module.css'
import Image from "next/image"
import { User } from "@/types/user"
import { AxiosError } from "axios"

const EditProfile = () => {
    const { user, setUser } = authStore();
    const [username, setUsername] = useState('');

    useEffect(() => {
        if (user?.username) {
            setUsername(user.username);
        }
    }, [user]);

    const router = useRouter();

    const {mutate, isError, error, isPending} = useMutation<User, AxiosError<{ message: string }>, {username : string}>({
        mutationFn: updateMe,
        onSuccess: (updatedUser) => {
            setUser({...user!, ...updatedUser, });
            router.push('/profile');
        }
    })

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        mutate({ username });
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value)
    };

    const handleCancel = () => {
        router.push('/profile');
    }


    return (
        <main className={css.mainContent}>
  <div className={css.profileCard}>
    <h1 className={css.formTitle}>Edit Profile</h1>
    
    {user?.avatar && ( <Image src={user?.avatar} alt="User Avatar" width={120} height={120} className={css.avatar}/>)}

    <form className={css.profileInfo} onSubmit={handleSubmit}>
      <div className={css.usernameWrapper}>
        <label htmlFor="username">Username:</label>
        <input id="username" type="text" value={username} onChange={handleChange} className={css.input}/>
      </div>

      <p>Email: {user?.email} </p>

      <div className={css.actions}>
        <button type="submit" className={css.saveButton} disabled={isPending}>
          {isPending ? 'Saving...' : 'Save'}
        </button>
        <button type="button" className={css.cancelButton} onClick={handleCancel}>
          Cancel
        </button>
        </div>

                    {isError && (
                        <p className={css.error}>
                            {error?.response?.data?.message ?? 'Error updating username'}
                    </p>)}

    </form>
  </div>
</main>

    )
}

export default EditProfile;