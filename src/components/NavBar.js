import React from 'react'
import { Link} from 'react-router-dom';

function Navbar() {
    return (
        <div data-testid='navbar-1'>
         <nav>
            <div className ='logo'>
                <p><Link to = '/'>Home</Link></p>
            </div>
            <div className='logo'>Patient Registration App</div>
            <div/>
         </nav>
     </div>
    )
}

export default Navbar
