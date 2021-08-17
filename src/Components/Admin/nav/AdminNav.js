import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { ListItem } from '@material-ui/core';
import {logOutHandler} from '../../Utils/tools';

const AdminNav = (props) => {

    const links = [
        {
            title:'Matches',
            linkTo:'/admin_macthes'
        },
        {
            title:'Players',
            linkTo:'/admin_players'
        }
    ]

    const renderItems = () => (
        links.map(link=>(
            <Link to={link.linkTo} key={link.title}>
                <ListItem button className="admin_nav_link">
                    {link.title}
                </ListItem>
            </Link>
        ))
    )

    return (
        <div>
            {renderItems()}
            <ListItem button className="admin_nav_link"
                onClick={()=>{logOutHandler()}}
            >
                Log Out
            </ListItem>
        </div>
    )
}

//Injecting props which not directly pass to AdminNav component
export default withRouter(AdminNav);