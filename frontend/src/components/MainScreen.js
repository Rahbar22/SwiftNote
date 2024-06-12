import React from 'react'
import "./MainScreen.css";

const MainScreen = ({title, children}) => {
  return (
    <div className='mainback'>
      <div className='container'>
        <div className='row'>
            <div className='page'>
                {title && (
                    <>
                        <h1 style={{fontSize:40}} className='heading'>{title}</h1>
                        <hr></hr>
                    </>
                )}
                {children}
            </div>
        </div>
      </div>
    </div>
  )
}

export default MainScreen