import NoteForm from "@/components/NoteForm/NoteForm"
import css from './CreateNote.module.css'
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Create Note",
    description: "Create a new note and save it as a draft or submit it.",
    openGraph: {
      title: "Create Note",
      description: "Create a new note and save it as a draft or submit it.",
      url: 'https://08-zustand-p89os41p9-olha-shymanskas-projects.vercel.app/notes/action/create',
      images: [
        {
          url: "/notehubimage.jpeg",
          width: 1200,
          height: 630,
          alt: "Create Note Page",
        },
      ],
    }
  };

export default function CreateNote() {
    return ( 
        <main className={css.main}>
  <div className={css.container}>
    <h1 className={css.title}>Create note</h1>
	   <NoteForm/>
  </div>
</main>
    )
}