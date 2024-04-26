/**
 * PlayersTable.js handles the Players table and create, update, delete form
 */
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Table } from 'reactstrap'
import PlayerCreateForm from '../forms/create/PlayersForm'
import PlayersUpdateForm from '../forms/update/PlayersForm'
import PlayerDeleteForm from '../forms/delete/PlayersForm'
import Pagination from '../Pagination'
import './../../App.css'

/**
 * return table, pagination and create, update and delete forms
 * @returns {Table}
 * @returns {Pagination}
 * @returns {PlayerCreateForm}
 * @returns {PlayersUpdateForm}
 * @returns {PlayerDeleteForm}
 */
const PlayersTable = () => {
  const BASE_URL = 'https://id607001-backend-hongjs1.herokuapp.com/api/v1'

  // setting the state
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  // 10 posts per page
  const [postsPerPage] = useState(10)

  //Get current posts (used from pagination resource)
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost)
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  // gets the players data and stores data in an array
  useEffect(() => {
    const getPlayersData = async () => {
      setLoading(true) // loading is set to true, loading screen is returned
      try {
        const res = await axios.get(`${BASE_URL}/players`)
        setData(res.data.data)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    getPlayersData()
  }, [])

  // returns a loading page if loading is true
  if (loading) {
    return <h2>Loading...</h2>
  }

  // currentPosts are mapped out in table rows
  const displayPlayersData = currentPosts.map((d) => {
    return (
      <tr key={d.id}>
        <td>{d.id}</td>
        <td>{d.name}</td>
        <td>{d.nationality}</td>
        <td>{d.position}</td>
      </tr>
    )
  })

  return (
    <div className="margin">
      {/* returns table with leagues data, pagination, create form, update form, delete form  */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Nationality</th>
            <th>Position</th>
          </tr>
        </thead>
        <tbody>{displayPlayersData}</tbody>
      </Table>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={data.length}
        paginate={paginate}
      />
      <PlayerCreateForm />
      <PlayersUpdateForm />
      <PlayerDeleteForm />
    </div>
  )
}

export default PlayersTable
