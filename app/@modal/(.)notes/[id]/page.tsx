import { getSingleNote } from "@/lib/api/serverApi";
import NotePreview from "./NotePreview.client";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

type Props = {
    params: Promise<{id:string}>
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
            <NotePreview propId={id} />
            </HydrationBoundary>
    );
}

export default NoteDetailes