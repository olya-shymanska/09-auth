import { api } from "./api";
import { User } from "@/types/user";
import { Note } from "@/types/note";

interface fetchNoteProps {
    query: string,
    page: number,
    tag?: string,
}

interface GetNotesResponse {
    notes: Note[],
    totalPages: number,
}


export const checkSession = async (cookies: string): Promise<User> => {
    const response = await api.get('/auth/session', { headers: {cookie: cookies} });
    return response.data;
}

export const getMe = async (cookies: string): Promise<User> => {
    const response = await api.get('/users/me', { headers: { cookie: cookies } })
    return response.data;
}

export const fetchNotes = async (cookies: string, { query, page, tag }: fetchNoteProps): Promise<GetNotesResponse> => {

    const response = await api.get<GetNotesResponse>('/notes', {
        headers: { cookie: cookies },
        params: { search: query, page, perPage: 12, ...(tag ? { tag } : {}) },
    })
    return response.data;
}

export const getSingleNote = async (cookies: string, id: string): Promise<Note> => {
    const response = await api.get(`/notes/${id}`, { headers: { cookie: cookies } })
    return response.data;
}