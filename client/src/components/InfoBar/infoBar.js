import './infoBar.css'
import onlineIcon from '../asserts/onlineIcon.png'
import closeIcon from '../asserts/closeIcon.png'

 import React from 'react'
 
 const infoBar = ({room}) => {
   return (
     <div className='infoBar'>
       <div className='leftInnerContainer'>
       <img className='onlineIcon' src={onlineIcon} />
       <h3>{room}</h3>
       </div>
       <div className='rightInnerContainer'>
       <a href='/'><img src={closeIcon} /></a>
      

       </div>
     </div>
   )
 }
 
 export default infoBar
 