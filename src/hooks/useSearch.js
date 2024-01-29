import { useEffect, useRef, useState } from 'react'


export function useSearch (){
    const [search, updateSearch] = useState('')
    const [error, setError] = useState(null) 
    const isFirstInput = useRef(true)
  
    useEffect(()=> {
      if ( isFirstInput.current ){
        isFirstInput.current = search === ''
        return
      } //Si el primer campo esta vacio, no devuelve nada

      if(search === ''){
        setError('No se puede buscar una pelicula vacia')
        return
      }
  
      if (search.match(/^\d+$/)){
        setError('No se puede buscar una pelicula con un numero')
        return
      }
      
      if (search.length < 3){
        setError('La busqueda debe tener al menor 3 caracteres')
        return
      }
  
      setError(null)
  
    },[search])

    return {search, updateSearch, error}
  }
  