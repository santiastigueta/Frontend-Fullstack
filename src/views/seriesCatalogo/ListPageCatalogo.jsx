import React from 'react'
import PostCatalogo from './PostCatalogo'

const ListPageCatalogo = ({searchResults}) => {
    const results = searchResults.map(post => <PostCatalogo key={post._id} post={post}/>)
    const content = results?.length ? results : <article><p>Todavía no hay series por aqui...</p></article>
  return (
    <main className='content'>{content}</main>
  )
}

export default ListPageCatalogo