/**
 * PlayersForm.js file handles creating Players
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
const PlayerCreateForm = () => {
  const BASE_URL = 'https://id607001-backend-hongjs1.herokuapp.com/api/v1'

  // setting the states
  const [name, setName] = useState('')
  const [nationality, setNationality] = useState('')
  const [position, setPosition] = useState('')
  const [clubId, setClubId] = useState('')
  const [isError, setIsError] = useState(false)

  const createPlayer = async () => {
    try {
      // sends the following data in a post request
      const res = await axios.post(`${BASE_URL}/players`, {
        name: name,
        nationality: nationality,
        position: position,
        clubId: clubId,
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

  // calls the createPlayer() function on handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault()
    createPlayer()
  }

  // returns the create player form with input fields of Name, Nationality, Position, clubId
  return (
    <>
      <h1 style={{ marginTop: '10px' }}>Create Player</h1>
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
            name="nationality"
            placeholder="Nationality"
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
            // required, min length and max length fields constraints
            required
            minLength="3"
            maxLength="40"
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="text"
            name="position"
            placeholder="Position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            // required, min length and max length fields constraints
            required
            minLength="3"
            maxLength="40"
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="number"
            name="clubId"
            placeholder="Club Id"
            value={clubId}
            // parses string into int
            onChange={(e) => setClubId(parseInt(e.target.value))}
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

export default PlayerCreateForm
