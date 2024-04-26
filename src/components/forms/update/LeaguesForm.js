/**
 * LeaguesForm.js file handles updating leagues
 */
import axios from 'axios'
import { useState } from 'react'
import { Alert, Button, Form, FormGroup, Input } from 'reactstrap'

const LeagueUpdateForm = () => {
  const BASE_URL = 'https://id607001-backend-hongjs1.herokuapp.com/api/v1'

  // setting the states
  const [name, setName] = useState('')
  const [division, setDivision] = useState('')
  const [currentChampion, setCurrentChampion] = useState('')
  const [leagueId, setLeagueId] = useState('')
  const [isError, setIsError] = useState(false)

  const updateLeague = async () => {
    try {
      // sends the following data in a put request
      const res = await axios.put(`${BASE_URL}/leagues/${leagueId}`, {
        name: name,
        division: division,
        currentChampion: currentChampion,
        leagueId: leagueId,
      })

      // reloads page and updates data if post request is successful
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
    updateLeague()
  }

  // returns the update league form with input fields of Name, division, currentChampion and leagueId
  return (
    <>
      <h1 style={{ marginTop: '10px' }}>Update League</h1>
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
        <FormGroup>
          <Input
            type="number"
            name="leagueId"
            placeholder="League Id"
            value={leagueId}
            onChange={(e) => setLeagueId(parseInt(e.target.value))}
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

export default LeagueUpdateForm
