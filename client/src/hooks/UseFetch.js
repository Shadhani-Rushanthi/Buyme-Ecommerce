import React, { useEffect, useState } from 'react'
import axios from 'axios'

export const UseFetch = (url) => {

    const [data, setData] = useState([])
    const [loading, setLoading ] = useState(false)
    const [error, setError] = useState(false)

    useEffect(()=>{
        console.log(url)
        const fetchData = async ()=>{
            setLoading(true)
            try {
                const res = await axios.get(url)
                setData(res.data)
            } catch (err) {
                setError(err)
            }
            setLoading(false)
        }
        fetchData()
    }, [url]);

    
    // const reFetch = async ()=>{
    //     setLoading(true)
    //     try {
    //         const res = await axios.get(url)
    //         setData(res.data)
    //     } catch (err) {
    //         setError(err)
    //     }
    //     setLoading(false)
    // }
    return {data, loading, error}
}
export default UseFetch;