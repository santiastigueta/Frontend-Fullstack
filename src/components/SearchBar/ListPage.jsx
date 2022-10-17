import React from 'react'
import Post from './Post'
import './ListPage.css'

const ListPage = ({searchResults}) => {
    const results = searchResults.map(post => <Post key={post._id} post={post}/>)
    const content = results?.length ? results : <article><p>Buscando...</p></article>
  return (
    <main className='content'>{content}</main>
  )
}

export default ListPage