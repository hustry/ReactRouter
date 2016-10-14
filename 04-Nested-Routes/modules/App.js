
import React from 'react'
import { Link } from "react-router"

export default React.createClass({
  render() {
    return (
    	<div>
    		<h1>React Router</h1>
    		<ul>
    			<li><Link to="/about">About</Link></li>
    			<li><Link to="/Repos">Repos</Link></li>
    		</ul>

            { this.props.children }

    	</div>
    )
  }
})