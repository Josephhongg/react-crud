/**
 * ClubsForm.js file handles deleting clubs
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
const ClubDeleteForm = (props) => {
  const BASE_URL = 'https://id607001-backend-hongjs1.herokuapp.com/api/v1'

  // setting the states
  const [clubId, setClubId] = useState('')
  const [isError, setIsError] = useState(false)

  const deleteClub = async () => {
    // sends the clubId data in a delete request
    try {
      const res = await axios.delete(`${BASE_URL}/clubs/${clubId}`, {
        clubId: clubId,
      })

      // reloads page and updates data if delete request is successful
      if (res.status === 200) {
        window.location.reload(true)
      }
    } catch (error) {
      console.log(error)
      setIsError(true)
    }
  }

  // brings up prompt asking user for confirmation and call deleteClub() function
  const handleSubmit = (e) => {
    e.preventDefault()
    if (window.confirm('Are you sure you want to delete club?')) deleteClub()
  }

  // returns delete club form with the input field of clubId
  return (
    <>
      <h1 style={{ marginTop: '10px' }}>Delete Club</h1>
      {/* when form is submitted, handleSubmit function is called */}
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Input
            type="number"
            name="clubId"
            placeholder="club Id"
            value={clubId}
            onChange={(e) => setClubId(parseInt(e.target.value))}
            // required, min and max length field validation
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

export default ClubDeleteForm
