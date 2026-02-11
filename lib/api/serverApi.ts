import { api } from "./api";
import { User } from "@/types/user";
import { Note } from "@/types/note";
import { cookies } from "next/headers";

interface fetchNoteProps {
    query: string,
    page: number,
    tag?: string,
}

interface GetNotesResponse {
    notes: Note[],
    totalPages: number,
}


export const checkSession = async () => {
    const cookieStore = await cookies();
    const response = await api.get('/auth/session', {
        headers: {
            Cookie: cookieStore.toString(),
        },
    });
    return response;
}

export const getMe = async (): Promise<User> => {
    const cookieStore = await cookies();
    const response = await api.get('/users/me', {
        headers: { 
        Cookie: cookieStore.toString(),
        },
    })
    return response.data;
}

export const fetchNotes = async ({ query, page, tag }: fetchNoteProps): Promise<GetNotesResponse> => {
    const cookieStore = await cookies();
    const response = await api.get<GetNotesResponse>('/notes', {
        headers: {
            Cookie: cookieStore.toString(),
        },
        params: { search: query, page, perPage: 12, ...(tag ? { tag } : {}) },
    })
    return response.data;
}

export const getSingleNote = async (id: string): Promise<Note> => {
    const cookieStore = await cookies();
    const response = await api.get(`/notes/${id}`, {
        headers: {
            Cookie: cookieStore.toString(),
        },
    })
    return response.data;
}