import { fetchNotes } from "@/lib/api";
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import NotesClient from './Notes.client';
import { Metadata } from "next";

type Props = {
    params: Promise<{ slug: string[] }>
};

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
    const { slug } = await params
    const tag = slug[0];
    return ({
        title: `NoteHub — Notes filtered by ${tag}`,
        description: `Browse your ${tag} notes in NoteHub — easily manage, edit, and organize your notes.`,
        openGraph: {
            title: `NoteHub — Notes filtered by ${tag}`,
            description: `Browse your ${tag} notes in NoteHub — easily manage, edit, and organize your notes.`,
            url: `https://08-zustand-qo50bjpjr-olha-shymanskas-projects.vercel.app/notes/filter/${tag}`,
            images: [
                {
                  url: "/notehubimage.jpeg",
                  width: 1200,
                  height: 630,
                  alt: `NoteHub — Notes filtered by ${tag}`,
                },
              ],
        }
    })
}

const NotesPage = async ({ params }: Props) => {
    const { slug } = await params;
    const tag = slug[0];

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['notes', '', 1, tag],
        queryFn: () => fetchNotes({ query: '', page: 1, ...(tag !== 'All' ? { tag } : {}) })
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotesClient tag={tag} />
        </HydrationBoundary>
    )
}

export default NotesPage