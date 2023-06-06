import React, { useEffect } from 'react'
import { authenticateAPI } from '../Services/userServices'
import { useNavigate } from 'react-router-dom'

function Home() {
 const navigate = useNavigate()
    useEffect(()=>{
        const token =localStorage.getItem("userToken")
        authenticateAPI(token).then((res)=>{
            console.log(res)
        }).catch(err=>{
           navigate('/error')
        })
    })
    const handleClick = (e)=>{
        e.preventDefault()
        localStorage.removeItem("userToken")
        navigate('/')
    }
  return (
    <div>
      This is hoiu
      <button onClick={handleClick}>Logout</button>
    </div>
  )
}

export default Home
