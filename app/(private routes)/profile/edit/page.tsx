'use client'
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { authStore } from "@/lib/store/authStore"
import { updateMe } from "@/lib/clientApi"
import css from './ProfileEdit.module.css'
import Image from "next/image"

export const EditProfile = () => {
    const { user, setUser } = authStore();

    


    return (
        <main className={css.mainContent}>
  <div className={css.profileCard}>
    <h1 className={css.formTitle}>Edit Profile</h1>

    <Image 
    src={user?.avatar}
      alt="User Avatar"
      width={120}
      height={120}
      className={css.avatar}
    />

    <form className={css.profileInfo}>
      <div className={css.usernameWrapper}>
        <label htmlFor="username">Username:</label>
        <input id="username"
          type="text"
          defaultValue={user?.username}
          className={css.input}
        />
      </div>

      <p>Email: {user?.email} </p>

      <div className={css.actions}>
        <button type="submit" className={css.saveButton}>
          Save
        </button>
        <button type="button" className={css.cancelButton}>
          Cancel
        </button>
      </div>
    </form>
  </div>
</main>

    )
}