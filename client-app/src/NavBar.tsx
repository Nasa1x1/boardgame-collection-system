import { Button, Container, Dropdown, Menu, Image } from "semantic-ui-react";
import { Link, NavLink } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from "./stores/store";
export default observer(function NavBar() 
{
    const {userStore: {user, logout}} = useStore();
    const isAdmin = user?.roles?.includes("admin");
   
    return(
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item as={NavLink} to='/' header>
                <img src="./../assets/logo.png" alt="logo" style={{marginRight:'40px', width: '70px', height: 'auto'}} />
                    BoardGames
                </Menu.Item>
                <Menu.Item as={NavLink} to='/boardgames' name="BoardGames"/>
                {isAdmin && (
                    <Menu.Item>
                        <Button as={NavLink} to='/createBoardGame' positive content='Create BoardGame' />
                    </Menu.Item>
                )}
                <Menu.Item position='right'>
                    <Image avatar spaced='right' src='./../assets/user.png' />
                    <Dropdown pointing='top left' text={user?.displayName}>
                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to={`/profiles/${user?.userName}`} text='My Profile' icon='user' />
                            <Dropdown.Item onClick={logout} text='Logout' icon='power' />
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
            </Container>
        </Menu>
    )
})