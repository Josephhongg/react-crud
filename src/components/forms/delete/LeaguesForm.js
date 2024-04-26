/**
 * LeaguesForm.js file handles deleting leagues
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
const LeagueDeleteForm = (props) => {
  const BASE_URL = 'https://id607001-backend-hongjs1.herokuapp.com/api/v1'

  // setting the states
  const [leagueId, setLeagueId] = useState('')
  const [isError, setIsError] = useState(false)

  const deleteLeague = async () => {
    // sends the following data in a delete request
    try {
      const res = await axios.delete(`${BASE_URL}/leagues/${leagueId}`, {
        leagueId: leagueId,
      })

      // reloads the page and updates data if delete request is successful
      if (res.status === 200) {
        window.location.reload(true)
      }
    } catch (error) {
      console.log(error)
      setIsError(true)
    }
  }

  // brings up prompt asking user for confirmation and call deleteLeague() function
  const handleSubmit = (e) => {
    e.preventDefault()
    if (window.confirm('Are you sure you want to delete league?'))
      deleteLeague()
  }

  // returns delete club form with the input field of leagueId
  return (
    <>
      <h1 style={{ marginTop: '10px' }}>Delete League</h1>
      {/* when form is submitted, handleSubmit function is called */}
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Input
            type="number"
            name="leagueId"
            placeholder="League Id"
            value={leagueId}
            onChange={(e) => setLeagueId(parseInt(e.target.value))}
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

export default LeagueDeleteForm
