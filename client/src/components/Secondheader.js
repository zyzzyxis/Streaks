import { useContext } from "react"
import { Link } from "react-router-dom"
import { Button, Menu, Search } from 'semantic-ui-react'
import { AuthContext } from "../providers/AuthProvider"
import '../style_components/SecondHeader.css';



const DashHeader = () => {

    const {user} = useContext(AuthContext)
    return(
        <Menu>

            <Link to=''>
            <Menu.Item >
                User
            </Menu.Item>
            </Link>
            <Menu.Item >
                # of active streaks
            </Menu.Item>
        {user &&    <Menu.Menu position='right'>

            <Menu.Item>
                <Search/>
            </Menu.Item>
                
                <Menu.Item>
                    <Link to='/streaks/form'> 
                    <Button>+ Add a Streak</Button>
                    </Link>
                     
                </Menu.Item>


            </Menu.Menu> }
        </Menu>


    )
}

export default DashHeader;