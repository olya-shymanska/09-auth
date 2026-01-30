import { getMe } from "@/lib/serverApi";
import { redirect } from "next/navigation";
import { cookies } from "next/headers"
import { User } from "@/types/user";
import { isAxiosError } from "axios";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import css from './Profile.module.css'

export const metadata: Metadata = {
    title: 'Profile',
    description: 'User profile page',
};

const Profile = async () => {

     const cookieStore = await cookies();
        const cookieString = cookieStore.getAll().map(c => `${c.name}=${c.value}`).join('; ');
        let user: User | null = null;
    let hasError = false;
    try {
        user = await getMe(cookieString);
    } catch (error) {
        if (isAxiosError(error)) {
            if (error.response?.status === 401) {
                redirect('/sign-in')
            }
        }
        hasError = true;
    }

    return (
        hasError || !user ? <ErrorMessage/> :
        <main className={css.mainContent}>
  <div className={css.profileCard}>
      <div className={css.header}>
	     <h1 className={css.formTitle}>Profile Page</h1>
	    <Link href={"/profile/edit"} className={css.editProfileButton}>Edit Profile</Link>
	   </div>
     <div className={css.avatarWrapper}>
      <Image
        src={user.avatar}
        alt="User Avatar"
        width={120}
        height={120}
        className={css.avatar}
      />
    </div>
    <div className={css.profileInfo}>
      <p>
        Username: {user.username}
      </p>
      <p>
        Email: {user.email}
      </p>
    </div>
  </div>
</main>

    )
}

export default Profile;