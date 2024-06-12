import React from 'react'

const Footer = () => {
  return (
    <footer style={
    {
        width:"100%",
        position:"relative",
        bottom:0,
        display:"flex",
        justifycontent:"center"
    }
    }>
    <div className='container'>
        <div className='row'>
        <div className='col text-center my-3'>Copyright &copy; SwiftNote</div>
        </div>
    </div>
    </footer>
  )
}

export default Footer

