
import {Link, useParams} from 'react-router-dom'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react';
import { Button, Card, CardGroup } from 'semantic-ui-react';
import { AuthContext } from '../providers/AuthProvider';
<<<<<<< HEAD
=======
import CommentsStreak from '../comments/CommentsStreak';
>>>>>>> 619df1e4e1d31daa72aac1f4264eb70e2298ba06

import CommentsStreak from '../comments/CommentsStreak';



const Streaks = (props)=>{
    const { user } = useContext(AuthContext)
    const [streaks, setStreaks] = useState(null);


    useEffect(() => {
        getStreaks()
    },[])


      const getStreaks = async()=>{
        try{
          let res = await axios.get(`/api/streaks`)
          setStreaks(res.data)

          console.log(res.data)
        }catch(err){
            alert(err)
        }
    }

    const addToUserStreaks = async(id) => {
        try {
            let res = await axios.post(`/api/user_streaks/`, {status: 'ongoing', user_id: user.id, streak_id: id})
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }


    const renderStreak = () => {
        return streaks.map((streak) => {
        return(
            <>
           <Card>
               <Link to={`streaks/${streak.id}`}>
            <h2>{streak.name}</h2>
                 </Link>
            <h3>The challenge = {streak.description}</h3>
            <h4>Success = {streak.reward}</h4>
            <h4>Failure = {streak.punishment}</h4>
            <Button onClick={()=>addToUserStreaks(streak.id)}>Start Streak!</Button>
           <br/>
           </Card>
            </>
        )}
   
        )
   
    }

    return (
        <>
         <h1>Challenges </h1>
         <CardGroup>
             {streaks && renderStreak()}
        </CardGroup>
         {/* <div fullError loading={loading} error={error} loaderMessage={'Loading URL, please wait'}>
               {data && renderStreak()}
        </div> */}
       
        </>
     )
}

export default Streaks