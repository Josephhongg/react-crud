/**
 * ClubsForm.js file handles creating clubs
 */
import axios from 'axios'
import { useState } from 'react'
import { Alert, Button, Form, FormGroup, Input } from 'reactstrap'

/**
 * @returns {Form}
 * @returns {FormGroup}
 * @returns {Input}
 * @returns {Alert}
 * @returns {Buttons}
 */
const ClubCreateForm = () => {
  const BASE_URL = 'https://id607001-backend-hongjs1.herokuapp.com/api/v1'

  // setting the states
  const [name, setName] = useState('')
  const [country, setCountry] = useState('')
  const [manager, setManager] = useState('')
  const [leagueId, setLeagueId] = useState('')
  const [isError, setIsError] = useState(false)

  const createClub = async () => {
    try {
      // sends the following data in a post request
      const res = await axios.post(`${BASE_URL}/clubs`, {
        name: name,
        country: country,
        manager: manager,
        leagueId: leagueId,
      })

      // reloads the page with updated data if post request is successful
      if (res.status === 201) {
        window.location.reload(true)
      }
    } catch (error) {
      console.log(error)
      setIsError(true)
    }
  }

  // calls the createClub() function on handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault()
    createClub()
  }

  // returns the create club form with input fields of Name, Country, Manager, leagueId
  return (
    <>
      <h1 style={{ marginTop: '10px' }}>Create Club</h1>
      {/* when form is submitted, handleSubmit function is called */}
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            // required, min length and max length fields constraints
            required
            minLength="3"
            maxLength="40"
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="text"
            name="country"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            // required, min length and max length fields constraints
            required
            minLength="3"
            maxLength="40"
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="text"
            name="manager"
            placeholder="Manager"
            value={manager}
            onChange={(e) => setManager(e.target.value)}
            // required, min length and max length fields constraints
            required
            minLength="3"
            maxLength="40"
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="number"
            name="leagueId"
            placeholder="League Id"
            value={leagueId}
            // parses string to int
            onChange={(e) => setLeagueId(parseInt(e.target.value))}
            // required, min and max field validation
            required
            min="0"
            max="100"
          />
        </FormGroup>
        {/* 
          Display an alert message if there is an error
        */}
        {isError ? (
          <Alert color="danger">Something went wrong. Please try again.</Alert>
        ) : null}
        <Button>Submit</Button>
      </Form>
    </>
  )
}

export default ClubCreateForm
