import axios from 'axios'
import React from 'react'
import { useSelector } from 'react-redux'

const ListPurchased = () => {

    // to get the token
    const selector = useSelector(state=>state.reducer)
        let token = selector.data.data.token
        console.log(token)
    // to get the list of purchased books
    const getPurchased = async()=>{
        let purchaseddata = await axios({
            method:"post",
            url:"http://localhost:5000/purchased",
            data: {token}
        })
        console.log(purchaseddata)
    }
  return (
    <div>
      Hello Balen
    </div>
  )
}

export default ListPurchased
