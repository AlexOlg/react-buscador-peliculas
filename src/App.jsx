import { useCallback } from 'react'
import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'
import debounce from 'just-debounce-it'
import Loading from './components/Loading'


function App() {
  const {search, updateSearch, error} = useSearch()
  const {movies, getMovies, loading} = useMovies({search})

  const debouncedGetMovies = useCallback(debounce(search => {
    getMovies({search})
  }, 2000), []) 
  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({search})
  }
  const handleChange = (event) => {
    const newSearch =  event.target.value
    updateSearch(newSearch)
    debouncedGetMovies(newSearch)
  }
  

  return (
    <div className='page'>
      <h1>SearchMovie 🍿🎞</h1>
      <header>
        <form onSubmit={handleSubmit} className='form' >
          <input onChange={handleChange} value={search} name='search' placeholder='Avengers, Star Wars, The Matrix... ' />
          <button  type='submit'>Buscar</button>   
        </form>
         {error && <p className='error' style={{color:'red'}}>{error}</p>}
      </header>

      <main>
        {
          loading ? <Loading/> : <Movies movies={movies} />
        }
       
      </main>
    </div>
  )
}

export default App
