import { getSingleNote } from "@/lib/api/serverApi";
import NoteDetailsClient from "./NoteDetails.client";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Metadata } from "next";


type Props = {
    params: Promise<{id:string}>
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {

    const { id } = await params;
    const note = await getSingleNote(id)
    return ({
        title: `NoteHub — ${note.title}`,
        description: `View your note: ${note.content} — manage, edit, and organize your notes easily with NoteHub.`,
        openGraph: {
            title: `NoteHub — ${note.title}`,
            description: `View your note: ${note.content} — manage, edit, and organize your notes easily with NoteHub.`,
            url: `https://08-zustand-qo50bjpjr-olha-shymanskas-projects.vercel.app/notes/${id}`,
            images: [
                {
                  url: "/notehubimage.jpeg",
                  width: 1200,
                  height: 630,
                  alt: `NoteHub — ${note.title}`,
                },
              ],
        }
    })
}

const NoteDetailes = async ({params}: Props) => {
    const { id } = await params;

    const queryClient = new QueryClient();
    
    await queryClient.prefetchQuery({
        queryKey: ['note', id],
        queryFn: () => getSingleNote(id)
    })
    
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NoteDetailsClient />
            </HydrationBoundary>
    );
}

export default NoteDetailes