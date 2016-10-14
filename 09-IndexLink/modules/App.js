
import React from 'react'
import { IndexLink } from "react-router"
import NavLink from "./NavLink"

export default React.createClass({
  render() {
    return (
    	<div>
    		<h1>React Router</h1>
    		<ul>
                <li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
    			<li><NavLink to="/about">About</NavLink></li>
    			<li><NavLink to="/Repos">Repos</NavLink></li>
    		</ul>

            { this.props.children }

    	</div>
    )
  }
})