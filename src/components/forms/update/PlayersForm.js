/**
 * PlayersForm.js file handles deleting players
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
const PlayersUpdateForm = () => {
  const BASE_URL = 'https://id607001-backend-hongjs1.herokuapp.com/api/v1'

  // setting the states
  const [name, setName] = useState('')
  const [nationality, setNationality] = useState('')
  const [position, setPosition] = useState('')
  const [isError, setIsError] = useState(false)
  const [playerId, setPlayerId] = useState('')

  const UpdatePlayer = async () => {
    try {
      // sends the following data in a put request
      const res = await axios.put(`${BASE_URL}/players/${playerId}`, {
        name: name,
        nationality: nationality,
        position: position,
        playerId: playerId,
      })

      // reloads page and updates data if put request is successful
      if (res.status === 200) {
        window.location.reload(true)
      }
    } catch (error) {
      console.log(error)
      setIsError(true)
    }
  }

  // calls function UpdatePlayer() on handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault()
    UpdatePlayer()
  }

  // returns the update player form with input fields of Name, nationality, position, player id
  return (
    <>
      <h1 style={{ marginTop: '10px' }}>Update Player</h1>
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
            name="playerId"
            placeholder="Player Id"
            value={playerId}
            onChange={(e) => setPlayerId(parseInt(e.target.value))} // parses integer entered into a string
            // required, min and max field validation
            required
            min="0"
            max="100"
          />
        </FormGroup>
        {/* if isError is true, user is alerted */}
        {isError ? (
          <Alert color="danger">Something went wrong. Please try again</Alert>
        ) : null}
        <Button>Submit</Button>
      </Form>
    </>
  )
}

export default PlayersUpdateForm
