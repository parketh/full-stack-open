import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [ searchPrompt, setSearchPrompt ] = useState('')
  const [ results, setResults ] = useState([])
  const [ filteredResults, setFilteredResults ] = useState([])
  const [ profile, setProfile ] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setResults(response.data.map(function(result) {
          return {
            "name": result.name,
            "capital": result.capital,
            "population": result.population,
            "languages": result.languages.map(lang => lang.name),
            "flag": result.flag,
          }  
        }))
      })
  }, [])

  const handlePromptChange = (event) => {
    setSearchPrompt(event.target.value)
    setFilteredResults(results.filter(result => result.name.toLowerCase().search(event.target.value.toLowerCase()) !== -1))
    setProfile('')
  }

  const handleProfileChange = (event) => {
    setProfile(event.target.id)
  }

  if (filteredResults.length > 10) {
    return (
      <div>
        <Search label="find countries" prompt={searchPrompt} handlePromptChange={handlePromptChange} />
        <span>Too many matches, specify another filter</span>
      </div>
    );
  }
  else if (filteredResults.length === 1) {
    return (
      <div>
        <Search label="find countries" prompt={searchPrompt} handlePromptChange={handlePromptChange} />
        <Profile countries={filteredResults} profile={filteredResults[0].name} />
      </div>
    );
  }
  else {
    return (
      <div>
        <Search label="find countries" prompt={searchPrompt} handlePromptChange={handlePromptChange} />
        <Results countries={filteredResults} handleProfileChange={handleProfileChange} profile={profile}/>
      </div>
    );
  }
  
}

const Search = ({ label, prompt, handlePromptChange }) => {
  return (
    <div>
      <span>{label} </span>
      <input value={prompt} onChange={handlePromptChange} />
    </div>
  )
}

const Results = ({ countries, handleProfileChange, profile }) => {
  return (
    <div>
      {countries.map(country => (
        <div>
          <span>{country.name} </span>
          <input type="button" value="show" id={country.name} onClick={handleProfileChange}/>
        </div>
      ))}
      <Profile countries={countries} profile={profile} />
    </div>
  )
}

const Profile = ({ countries, profile }) => {
  console.log(profile)
  return (
    <div>
      {countries.filter(country => country.name === profile).map(country => (
        <div>
          <h2>{country.name}</h2>
          <div>capital {country.capital}</div>
          <div>population {country.population}</div>
          <h3>languages</h3>
          <ul>
            {country.languages.map(language => (
              <li>{language}</li>
            ))}
          </ul>
          <img src={country.flag} alt={country.name} width="100" />
        </div>
      ))}
    </div>
  )

}

export default App;
