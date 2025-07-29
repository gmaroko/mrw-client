import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilm } from '@fortawesome/free-solid-svg-icons'
import { Button, Navbar, Nav, Container } from 'react-bootstrap'
import {Link, NavLink} from 'react-router-dom'

const Header = () => {
    return (
        <Navbar bg='dark' variant='dark' expand='lg'>
            <Container fluid>
                <Navbar.Brand href='/' style={{ color: 'turquoise' }}>
                    <FontAwesomeIcon icon={faFilm} /> MRW
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='navbarScroll' />
                <Navbar.Collapse id='navbarScroll'>
                    <Nav
                        className='me-auto my-2 my-lg-0'
                        style={{ maxHeight: "100px" }}
                        navbarScroll
                    >
                        <NavLink className='nav-link' to="/now_playing">#NowPlaying</NavLink>
                        <NavLink className='nav-link' to="/top_rated">#TopRated</NavLink>
                        <NavLink className='nav-link' to="/popular">#Popular</NavLink>
                        <NavLink className='nav-link' to="/upcoming">#Upcoming</NavLink>
                    </Nav>
                    <Button variant='outline-info' className='me-2'>Discover</Button>

                    <Button as={Link} to="/login" variant="outline-info" className="me-2">Login</Button>
                    <Button as={Link} to="/register" variant="outline-info" className="me-2">Register</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header