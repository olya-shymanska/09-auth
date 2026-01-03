import css from './EmptyNotes.module.css'

export default function EmptyNotes() {
    return <p className={css.text}>No notes found for your search or selected tag</p>
}