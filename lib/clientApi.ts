import { api } from "./api";
import { User } from "@/types/user";
import { Note } from "@/types/note";
import { NewNote } from "@/types/newNote";

interface RegisterData {
    email: string,
    password: string,
}

interface fetchNoteProps {
    query: string,
    page: number,
    tag?: string,
}

interface GetNotesResponse {
    notes: Note[],
    totalPages: number,
}

export const register = async (data: RegisterData): Promise<User> => {
    const response = await api.post('/auth/register', data);
    return response.data;
}

export const login = async (data: RegisterData): Promise<User> => {
    const response = await api.post('/auth/login', data);
    return response.data;
}

export const logout = async () => {
  await api.post('/auth/logout');
}

export const checkSession = async (): Promise<User> => {
    const response = await api.get('/auth/session');
    return response.data;
}

export const getMe = async (): Promise<User> => {
    const response = await api.get('/users/me');
    return response.data;
}

export const updateMe = async(data: {username: string}): Promise<User> => {
    const response = await api.patch('/users/me', data);
    return response.data;
} 

export const fetchNotes = async ({ query, page, tag }: fetchNoteProps): Promise<GetNotesResponse> => {
    const response = await api.get<GetNotesResponse>('/notes', {
        params: { search: query, page, perPage: 12, ...(tag ? { tag } : {}) },
    });
    return response.data;
}

export const getSingleNote = async (id: string): Promise<Note> => {
    const response = await api.get(`/notes/${id}`);
    return response.data;
}

export const createNote = async (newNote: NewNote): Promise<Note> => {
    const response = await api.post('/notes', newNote);
    return response.data;
}

export const deleteNote = async (id: string): Promise<Note> => {
    const response = await api.delete(`/notes/${id}`);
    return response.data;
}