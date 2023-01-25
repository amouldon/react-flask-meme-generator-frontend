import { useState, useEffect, } from 'react'
import { useNavigate } from 'react-router-dom'

export const useGetAuth = () => {
    const [ loggedInStatus, setLoggedInStatus ] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const check = JSON.parse(sessionStorage.getItem('loggedInStatus'))
        if(check){
            setLoggedInStatus(true)
            console.log(check)}
        }, [navigate])
    return {loggedInStatus}
}

