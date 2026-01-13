import { getSingleNote } from "@/lib/serverApi";
import NotePreview from "./NotePreview.client";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { cookies } from "next/headers";

type Props = {
    params: Promise<{id:string}>
}

const NoteDetailes = async ({params}: Props) => {
    const { id } = await params;

    const queryClient = new QueryClient();
    const cookieStore = await cookies();
    const cookieString = cookieStore.getAll().map(c => `${c.name}=${c.value}`).join('; ');

    await queryClient.prefetchQuery({
        queryKey: ['note', id],
        queryFn: () => getSingleNote(cookieString, id)
    })
    
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotePreview propId={id} />
            </HydrationBoundary>
    );
}

export default NoteDetailes