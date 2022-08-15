import {Navbar, Nav, Container} from 'react-bootstrap'

function AppNavbar(props) {
    return (
        <div className={'navbar-div'}>
            <Navbar expand="lg">
                <Container>
                    <Navbar.Brand>
                        Pokemon-Lite
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/#/home">
                                Home
                            </Nav.Link>
                            {
                                props.user ?
                                    <Nav.Link href={'/#/logout'}>
                                        Logout
                                    </Nav.Link>
                                    :
                                    <Nav.Link href={'/#/login'}>
                                        Login
                                    </Nav.Link>
                            }
                            {
                                props.user ?
                                    <Nav.Link href={'/#/about'}>
                                        Profile
                                    </Nav.Link>
                                    :
                                    <Nav.Link href={'/#/signup'}>
                                        Sign-up
                                    </Nav.Link>
                            }
                            {
                                props.user ?
                                    <Nav.Link href={'/#/game'}>
                                        Play
                                    </Nav.Link>
                                : ""
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default AppNavbar