import { useEffect, useRef, useState, useCallback } from 'react'
import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'
import debounce from 'just-debounce-it'


function App() {
  const [sort, setSort] = useState(false)

  const {search, updateSearch, error} = useSearch()
  const {movies, getMovies, loading} = useMovies({search, sort})

  const debouncedGetMovies = useCallback(debounce(search => {
    console.log('Search', search)
    getMovies({search})
  }, 2000), []) 
  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({search})
  }

  const handleSort = () => {
    setSort(!sort)
  }
  const handleChange = (event) => {
    const newSearch =  event.target.value
    updateSearch(newSearch)
    debouncedGetMovies(newSearch)
  }
  

  return (
    <div className='page'>
      <header>
        <form onSubmit={handleSubmit} className='form' >
          <input onChange={handleChange} value={search} name='search' placeholder='Avengers, Star Wars, The Matrix... ' />
          <input type='checkbox' onChange={handleSort} checked={sort} />
          <button  type='submit'>Buscar</button>   
        </form>
         {error && <p className='error' style={{color:'red'}}>{error}</p>}
      </header>

      <main>
        {
          loading ? <p>Cargando...</p> : <Movies movies={movies} />
        }
       
      </main>
    </div>
  )
}

export default App
