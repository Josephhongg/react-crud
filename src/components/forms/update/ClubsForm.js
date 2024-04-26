/**
 * ClubsForm.js file handles updating clubs
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
const ClubUpdateForm = () => {
  const BASE_URL = 'https://id607001-backend-hongjs1.herokuapp.com/api/v1'

  // setting the states
  const [name, setName] = useState('')
  const [country, setCountry] = useState('')
  const [manager, setManager] = useState('')
  const [isError, setIsError] = useState(false)
  const [clubId, setClubId] = useState('')

  const UpdateLeague = async () => {
    try {
      // sends the following data in a put request
      const res = await axios.put(`${BASE_URL}/clubs/${clubId}`, {
        name: name,
        country: country,
        manager: manager,
        clubId: clubId,
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

  // calls function UpdateLeague() on handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault()
    UpdateLeague()
  }

  // returns the update club form with input fields of Name, Country, Manager and club id
  return (
    <>
      <h1 style={{ marginTop: '10px' }}>Update Club</h1>
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
            name="clubId"
            placeholder="Club Id"
            value={clubId}
            onChange={(e) => setClubId(parseInt(e.target.value))} // parses integer entered into a string
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

export default ClubUpdateForm
