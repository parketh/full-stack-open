import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [ search, setSearch ] = useState('')
  const [ results, setResults ] = useState([])
  const [ showProfile, setShowProfile ] = useState('display: block')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setResults(response.data.map(country => country.name))
      })
  }, [])

  const handlePromptChange = (event) => {
    setSearch(event.target.value)
    if (resultsToShow.length === 1) {
      setShowProfile('display: none')
    }
    else {
      setShowProfile('display: block')
    }
  }

  const filteredResults = results.filter(result => result.toLowerCase().search(search.toLowerCase()) !== -1)

  const resultsToShow = filteredResults.length > 10 ? ["Too many matches, specify another filter"] : filteredResults

  return (
    <div>
      <Search label="find countries" prompt={search} handlePromptChange={handlePromptChange} />
      <Results countries={resultsToShow}/>
      <Profile countries={resultsToShow} showProfile={showProfile}/>
    </div>
  );
}

const Search = ({ label, prompt, handlePromptChange }) => {
  return (
    <div>
      <span>{label} </span>
      <input value={prompt} onChange={handlePromptChange} />
    </div>
  )
}

const Results = ({ countries }) => {
  return (
    <div>
      {countries.map(country => (
        <div>{country}</div>
      ))}
    </div>
  )
}

const Profile = ({ countries, showProfile }) => {
  return (
    <div styles={showProfile}>
        {countries.name}
    </div>
  )

}

export default App;
