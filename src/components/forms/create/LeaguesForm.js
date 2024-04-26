/**
 * leaguesForm.js file handles creating leagues
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
const LeagueCreateForm = () => {
  const BASE_URL = 'https://id607001-backend-hongjs1.herokuapp.com/api/v1'

  // setting the states
  const [name, setName] = useState('')
  const [division, setDivision] = useState('')
  const [currentChampion, setCurrentChampion] = useState('')
  const [isError, setIsError] = useState(false)

  const createLeague = async () => {
    try {
      // sends the following data in a post request
      const res = await axios.post(`${BASE_URL}/leagues`, {
        name: name,
        division: division,
        currentChampion: currentChampion,
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

  // calls the createLeague() function on handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault()
    createLeague()
  }

  // returns the create league form with input fields of Name, Division, currentChampion
  return (
    <>
      <h1 style={{ marginTop: '10px' }}>Create League</h1>
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
            name="division"
            placeholder="Division"
            value={division}
            onChange={(e) => setDivision(e.target.value)}
            // required, min length and max length fields constraints
            required
            minLength="3"
            maxLength="40"
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="text"
            name="currentChampion"
            placeholder="Current Champion"
            value={currentChampion}
            onChange={(e) => setCurrentChampion(e.target.value)}
            // required, min length and max length fields constraints
            required
            minLength="3"
            maxLength="40"
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

export default LeagueCreateForm
