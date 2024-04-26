/**
 * ClubsTable.js handles the Clubs table and create, update, delete form
 */
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Table } from 'reactstrap'
import ClubCreateForm from '../forms/create/ClubsForm'
import ClubUpdateForm from '../forms/update/ClubsForm'
import ClubDeleteForm from '../forms/delete/ClubsForm'
import Pagination from '../Pagination'
import './../../App.css'

/**
 * return table, pagination and create, update and delete forms
 * @returns {Table}
 * @returns {Pagination}
 * @returns {ClubCreateForm}
 * @returns {ClubUpdateForm}
 * @returns {ClubDeleteForm}
 */
const ClubsTable = () => {
  const BASE_URL = 'https://id607001-backend-hongjs1.herokuapp.com/api/v1' // replace with your deployed Heroku Node app

  // setting the state
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(8) // set the posts per page to 8

  //Get current Posts (used from pagination resource)
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost)
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  // gets the clubs data and stores data in an array
  useEffect(() => {
    const getClubsData = async () => {
      setLoading(true)
      try {
        const res = await axios.get(`${BASE_URL}/clubs`)
        setData(res.data.data)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    getClubsData()
  }, [])

  // returns loading screen if loading is true
  if (loading) {
    return <h2>Loading...</h2>
  }

  // currentPosts are mapped out in table rows
  const displayClubsData = currentPosts.map((d) => {
    return (
      <tr key={d.id}>
        <td>{d.id}</td>
        <td>{d.name}</td>
        <td>{d.country}</td>
        <td>{d.manager}</td>
      </tr>
    )
  })

  return (
    <div className="margin">
      {/* returns table with clubs data, pagination, create, update, delete form */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Country</th>
            <th>Manager</th>
          </tr>
        </thead>
        <tbody>{displayClubsData}</tbody>
      </Table>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={data.length}
        paginate={paginate}
      />
      <ClubCreateForm />
      <ClubUpdateForm />
      <ClubDeleteForm />
    </div>
  )
}

export default ClubsTable
