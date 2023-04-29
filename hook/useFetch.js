import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { RAPID_API_KEY } from '@env'
console.log(RAPID_API_KEY)
const useFetch = (endpoint, query) => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        headers: {
            'content-type': 'application/octet-stream',
            'X-RapidAPI-Key': RAPID_API_KEY,
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        },

        params: {
          ...query,
        }
    };

    const fetchData = async () => {
        setIsLoading(true)
        try {
            const response = await axios.request
            (options)
            setData(response.data.data)
            setIsLoading(false)
        }
        catch (error) {
            console.log(error)
            setError(error)
            alert('There ia an error')
        }
    }

    useEffect(() => {
        fetchData();

    }, [])
    const refetch = () => {
        setIsLoading(true);
        fetchData()
    }
    return { data, isLoading, error, refetch }
}

export default useFetch