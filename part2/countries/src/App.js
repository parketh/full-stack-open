import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
    const [searchPrompt, setSearchPrompt] = useState('')
    const [profile, setProfile] = useState([])

    const handlePromptChange = (event) => {
        setSearchPrompt(event.target.value)
        setProfile([])
    }

    return (
        <div>
        <Search label="find countries" searchPrompt={searchPrompt} handlePromptChange={handlePromptChange} />
        <Results searchPrompt={searchPrompt} profile={profile} setProfile={setProfile} />
        </div>
    )

}

const Search = ({ label, searchPrompt, handlePromptChange }) => {
    return (
        <div>
            <span>{label} </span>
            <input value={searchPrompt} onChange={handlePromptChange} />
        </div>
    )
}

const Results = ({ searchPrompt, profile, setProfile }) => {
    const [countryData, setCountryData] = useState([])
    
    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountryData(response.data)
            })
    }, [])

    let filteredCountries = countryData.filter(country => country.name.toLowerCase().search(searchPrompt.toLowerCase()) !== -1)
    
    const handleProfileChange = (event) => {
        event.preventDefault()
        setProfile(countryData.filter(country => country.name.search(event.target.id) !== -1)[0])
    }

    if (filteredCountries.length > 10) {
        return (
            <div>Too many matches, specify another filter</div>
        )
    }
    else if (filteredCountries.length > 1) {
        return (
            <div>
                {filteredCountries.map(country => (
                    <div key={Number(country.numericCode)}>
                        <span>{country.name} </span>
                        <input type="button" value="show" id={country.name} onClick={handleProfileChange}/>
                    </div>
                ))}
                <Profile profile={profile} />
            </div>
        )
    }
    else if (filteredCountries.length === 1) {
        return (
            <div>
                <Profile profile={filteredCountries[0]} />
            </div>
        )
    }
    else {
        return (
            <div></div>
        )
    }

}

const Profile = ({ profile }) => {    
    if (typeof profile.languages !== "undefined") {
        return (
            <div>
                <h2>{profile.name}</h2>
                <div>capital {profile.capital}</div>
                <div>population {profile.population}</div>
                <h3>languages</h3>
                <ul>
                    {profile.languages.map(l => (
                        <li key={l.iso639_1}>{l.name}</li>
                    ))}
                </ul>
                <Weather profile={profile} />
            </div>
        )
    }
    else {
        return (
            <div></div>
        )
    }
}

const Weather = ({ profile }) => {
    const [weatherData, setWeatherData] = useState([])
    
    const api_key = process.env.REACT_APP_API_KEY

    useEffect(() => {
        axios
          .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${encodeURI(profile.capital)}`)
          .then(response => {
            setWeatherData(response.data)
          })
      }, [])

    if (weatherData.length !== 0) {
        return (
            <div>
                <h3>Weather in {profile.capital}</h3>
                <div>
                    <b>temperature: </b>
                    <span>{weatherData.current.temperature} Celsius</span>
                </div>
                <img src={weatherData.current.weather_icons} alt={profile.name} width="100" />
                <div>
                    <b>wind: </b>
                    <span>{weatherData.current.wind_speed} mph direction {weatherData.current.wind_dir}</span>
                </div>
            </div>
        )
    }
    else {
        return (
            <div></div>
        )
    }
}

export default App;