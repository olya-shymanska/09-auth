'use client'

import SearchBox from "@/components/SearchBox/SearchBox"
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList"
import { useEffect } from "react";
import { fetchNotes } from "@/lib/api";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebouncedCallback } from 'use-debounce';
import { useState } from "react";
import css from './Notes.module.css'
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import EmptyNotes from "@/components/EmptyNotes/EmptyNotes";
import Link from "next/link";

type Props = {
  tag: string;
}

function NotesClient({tag}: Props) {

  const [inputValue, setinputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);

  const {data, isSuccess, isLoading, isFetching, isError} = useQuery({
    queryKey: ['notes', searchQuery, page, tag],
      queryFn: () => fetchNotes({ query: searchQuery, page: page, ...(tag !== 'All' ? { tag } : {})}),
      refetchOnMount: false,
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    setPage(1);
  }, [tag]);
  

  const updateSearchQuery = useDebouncedCallback(
    (value: string) => {
      setSearchQuery(value);
      setPage(1);
    },
    300
  );

  const handleSearchChange = (value: string) => {
    setinputValue(value);
    updateSearchQuery(value); 
  }

  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={inputValue} onSearch={handleSearchChange} />
     {isSuccess && totalPages > 0 &&  (
          <Pagination
            pageCount={totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}
        <Link href={'/notes/action/create'} className={css.button} >Create +</Link>
      </header>

      {isLoading || isFetching ? (
      <Loader />
    ) : isError ? (
      <ErrorMessage />
    ) : data && data.notes.length > 0 ? (
      <NoteList notes={data.notes} />
    ) : (
      <EmptyNotes />
    )}
     
      </div>
  )
}

export default NotesClient

