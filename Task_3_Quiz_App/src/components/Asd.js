import React from 'react'
import { Link, useParams } from 'react-router-dom'

export default function Asd() {

    const {id}  = useParams()
    console.log(id)
  return (
    <>
        <Link to={'/'} >Home</Link>
    </>
  )
}
