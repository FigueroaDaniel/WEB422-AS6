import { Navbar, Nav, Form, FormControl, Button, Container, NavDropdown } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store';
import { addToHistory } from '../lib/userData';
import { removeToken, readToken } from '../lib/authenticate';

export default function MainNav() {
    const router = useRouter();
    const [searchField, setSearchField] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

    let token = readToken();
    let userName = token ? token.userName : '';

    const handleSearch = async (e) => {
        e.preventDefault();
        setIsExpanded(false);
        let queryString = `title=true&q=${searchField}`; 
        setSearchHistory(await addToHistory(queryString));
        router.push(`/artwork?${queryString}`);
    };

    const logout = () => {
        setIsExpanded(false);
        removeToken();
        router.push('/login');
    };
    
    return (
        <>
            <Navbar expand="lg" className="fixed-top navbar-dark bg-dark" expanded={isExpanded}>
                <Container>
                    <Navbar.Brand>Daniel Figueroa</Navbar.Brand>
                    &nbsp;<Navbar.Toggle onClick={() => setIsExpanded(!isExpanded)} />
                    <Navbar.Collapse id="navbar-nav">
                        <Nav className="me-auto">
                            <Link href="/" passHref legacyBehavior>
                                <Nav.Link active={router.pathname === "/"} onClick={() => setIsExpanded(false)}>Home</Nav.Link>
                            </Link>
                            {token && (
                                <>
                                    <Link href="/search" passHref legacyBehavior>
                                        <Nav.Link active={router.pathname === "/search"} onClick={() => setIsExpanded(false)}>Advanced Search</Nav.Link>
                                    </Link>
                                    <Form className="d-flex" onSubmit={handleSearch}>
                                        {/* Existing code for search form */}
                                    </Form>
                                    <NavDropdown title={userName} id="basic-nav-dropdown">
                                        <Link href="/favourites" passHref legacyBehavior>
                                            <NavDropdown.Item active={router.pathname === "/favourites"} onClick={() => setIsExpanded(false)}>Favourites</NavDropdown.Item>
                                        </Link>
                                        <Link href="/history" passHref legacyBehavior>
                                            <NavDropdown.Item active={router.pathname === "/history"} onClick={() => setIsExpanded(false)}>Search History</NavDropdown.Item>
                                        </Link>
                                        <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                                    </NavDropdown>
                                </>
                            )}
                        </Nav>
                        {!token && (
                            <Nav>
                                <Link href="/register" passHref legacyBehavior>
                                    <Nav.Link active={router.pathname === "/register"} onClick={() => setIsExpanded(false)}>Register</Nav.Link>
                                </Link>
                                <Link href="/login" passHref legacyBehavior>
                                    <Nav.Link active={router.pathname === "/login"} onClick={() => setIsExpanded(false)}>Login</Nav.Link>
                                </Link>
                            </Nav>
                        )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br />
            <br />
        </>
    );
}
