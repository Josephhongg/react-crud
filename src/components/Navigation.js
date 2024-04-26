/**
 * Navigation.js file handles the navigation bar
 */
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap'

// Importing components
import ClubsTable from './tables/ClubsTable'
import LeaguesTable from './tables/LeaguesTable'
import PlayersTable from './tables/PlayersTable'

/**
 * @returns {Router}
 * @returns {Navbar}
 * @returns {NavbarBrand}
 * @returns {NavbarToggler}
 * @returns {Collapse}
 * @returns {Nav}
 * @returns {NavItem}
 * @returns {NavLink}
 * @returns {Routes}
 * @returns {Route}
 */
const Navigation = () => {
  // set the state isOpen to false
  const [isOpen, setIsOpen] = useState(false)

  // sets setIsOpen to the opposite state every time toggle is called. navbar
  const toggle = () => setIsOpen(!isOpen)

  // returns a navigation bar with routes to PlayersTable, ClubsTable, LeaguesTable
  return (
    <Router>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">Football Management System</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-auto" navbar>
            <NavItem>
              <NavLink href="/players">Players</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/clubs">Clubs</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/leagues">Leagues</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <Routes>
        <Route path="/players" element={<PlayersTable />} />
        <Route path="/clubs" element={<ClubsTable />} />
        <Route path="/leagues" element={<LeaguesTable />} />
      </Routes>
    </Router>
  )
}

export default Navigation
