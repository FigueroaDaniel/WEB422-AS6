import { Navbar, Nav, Form, FormControl, Button, Container } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function MainNav() {
    const router = useRouter();
    const [searchField, setSearchField] = useState('');
    const handleSearch = (e) => {
        e.preventDefault();
        router.push(`/artwork?title=true&q=${searchField}`);
    };
    return (
        <>
            <Navbar expand="lg" className="fixed-top navbar-dark bg-dark">
                <Container>
                    <Navbar.Brand>Daniel Figueroa</Navbar.Brand>
                    <Nav className="me-auto">
                        <Link href="/" passHref legacyBehavior>
                            <Nav.Link active={router.pathname === "/"}>Home</Nav.Link>
                        </Link>
                        <Link href="/search" passHref legacyBehavior>
                            <Nav.Link active={router.pathname === "/search"}>Advanced Search</Nav.Link>
                        </Link>
                    </Nav>
                    <Form className="d-flex" onSubmit={handleSearch}>
                        <FormControl 
                            type="search" 
                            placeholder="Search" 
                            className="me-2" 
                            aria-label="Search"
                            value={searchField}
                            onChange={(e) => setSearchField(e.target.value)}
                        />
                        <Button type="submit" variant="success">Search</Button>
                    </Form>
                </Container>
            </Navbar>
            <br />
            <br />
        </>
    );
}
