/**
 * Pagination.js file paginates the table data.
 */
import React from 'react'

/**
 * @returns {nav}
 * @returns {ul}
 * @returns {li}
 * @returns {a}
 */
const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = []

  // stores number of pages into pageNumbers array.
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i)
  }

  // returns each number in as a clickable nav links
  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a onClick={() => paginate(number)} href="#!" className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Pagination
