import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Button, Card, CardGroup, Carousel, Container, ListGroup, ListGroupItem } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
// import { Button, CardGroup, Header, Segment } from "semantic-ui-react"
import CommentNew from "../comments/CommentNew"
import CommentsStreak from "../comments/CommentsStreak"
import Thumbnail from "../components/Thumbnail"
import Timer from "../components/Timer"
import { AuthContext } from "../providers/AuthProvider"
import CardContainer from "../style_components/CardContainer"

const Streak = () => {

    const {id} = useParams()

    const [streak, setStreak] = useState(null)
    const [users, setUsers] = useState(null)
    const {user} = useContext(AuthContext)

    useEffect(()=> {
        getStreak()
    },[])

    const deleteStreak = async() => {
        try {
            await axios.delete(`/api/streaks/${id}`)
        } catch (error) {
            console.log(error)
        }
    }

    const getStreak = async() => {
        try {
            let res = await axios.get(`/api/streaks_users/${id}`)
            console.log(res.data)
            setStreak({name: res.data[0].streak_name, description:res.data[0].description, reward:res.data[0].reward, punishment:res.data[0].punishment, created_at:res.data[0].created_at})
            setUsers(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const renderUsers = () => {
        return users.map(uzer => {
            return(
                <div>
                    <ListGroup horizontal>
                        <ListGroup.Item>{uzer.nickname}</ListGroup.Item>
                        <ListGroup.Item>{uzer.email}</ListGroup.Item>
                    </ListGroup>
                </div>
            )
        })
    }
    return(
        <div>
            
            <Link to='/streaks'>
            <Button>Back to streaks</Button>
            </Link>
            <h1>Streak show</h1>
            <div style={{display: 'flex', justifyContent:'space-between'}}>
            {users && <ListGroup>{renderUsers()}</ListGroup>}
           {streak && <Container className="mt-5 mb-5 justify-content-center">
        <Card style={{width:"50em", marginLeft:'10em'}} >
          {/* <Thumbnail url={streak.name} /> */}
          <Timer created_at={streak.created_at}/>
          
          <Card.Body>
            <Card.Title><h4>{streak.name}</h4></Card.Title>
            <Card.Text>
              {streak.description}
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>{streak.reward}</ListGroupItem>
            <ListGroupItem>{streak.punishment}</ListGroupItem>
          </ListGroup>
          <Card.Body>
          </Card.Body>
        </Card>
        </Container>}
            
            </div>
            <div>
            <CardGroup>
                <CommentNew />
            </CardGroup>
        <h2>Comments streak show</h2>
         <CommentsStreak />
         </div>
        </div>

// <CardContainer>
// <h1>{streak.name}</h1>
// <h3>The challenge = {streak.description}</h3>
// <h4>Success = {streak.reward}</h4>
// <h4>Failure = {streak.punishment}</h4>
// <Button onClick={deleteStreak}>Delete</Button>
// </CardContainer>
    )
}

export default Streak