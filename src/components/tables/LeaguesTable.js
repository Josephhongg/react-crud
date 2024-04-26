/**
 * LeaguesTable.js handles the Leagues table and create, update, delete form
 */
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Table } from 'reactstrap'
import LeagueCreateForm from '../forms/create/LeaguesForm'
import LeagueUpdateForm from '../forms/update/LeaguesForm'
import LeagueDeleteForm from '../forms/delete/LeaguesForm'
import Pagination from '../Pagination'
import './../../App.css'

/**
 * return table, pagination and create, update and delete forms
 * @returns {Table}
 * @returns {Pagination}
 * @returns {LeagueCreateForm}
 * @returns {LeagueUpdateForm}
 * @returns {LeagueDeleteForm}
 */
const LeaguesTable = () => {
  const BASE_URL = 'https://id607001-backend-hongjs1.herokuapp.com/api/v1'

  // setting the state
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  // 3 posts per page
  const [postsPerPage] = useState(3)

  //Get current Posts (used from pagination resource)
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost)
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  // gets the leagues data and stores data in an array
  useEffect(() => {
    const getLeaguesData = async () => {
      setLoading(true) // loading is set to true, loading screen is returned
      try {
        const res = await axios.get(`${BASE_URL}/leagues`)
        setData(res.data.data)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    getLeaguesData()
  }, [])

  // returns a loading screen if loading is true
  if (loading) {
    return <h2>Loading...</h2>
  }

  // currentPosts are mapped out in table rows
  const displayLeaguesData = currentPosts.map((d) => {
    return (
      <tr key={d.id}>
        <td>{d.id}</td>
        <td>{d.name}</td>
        <td>{d.division}</td>
        <td>{d.currentChampion}</td>
      </tr>
    )
  })

  return (
    <div className="margin">
      {/* returns table with leagues data, pagination, create form, update form, delete form */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Division</th>
            <th>Current Champions</th>
          </tr>
        </thead>
        <tbody>{displayLeaguesData}</tbody>
      </Table>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={data.length}
        paginate={paginate}
      />
      <LeagueCreateForm />
      <LeagueUpdateForm />
      <LeagueDeleteForm />
    </div>
  )
}

export default LeaguesTable
