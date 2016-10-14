
import React from 'react'
import NavLink from "./NavLink"

export default React.createClass({
  render() {
    return (
    	<div>
    		<h1>React Router</h1>
    		<ul>
    			<li><NavLink to="/about" >About</NavLink></li>
    			<li><NavLink to="/Repos" >Repos</NavLink></li>
    		</ul>

            { this.props.children }

    	</div>
    )
  }
})