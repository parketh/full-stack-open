import axios from 'axios'

const url = '/api/persons'

const getPersons = () => {
    return axios.get(url).then(response => response.data)
}

const createPerson = (personObject) => {
    return axios.post(url, personObject).then(response => response.data)
}

const updatePerson = (id, personObject) => {
    return axios.put(`${url}/${id}`, personObject).then(response => response.data)
}

const deletePerson = (id) => {
    return axios.delete(`${url}/${id}`)
}

const exportedObject = { getPersons, createPerson, updatePerson, deletePerson }

export default exportedObject