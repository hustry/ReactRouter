
import React from 'react'
import { browserHistory } from "react-router"

import NavLink from "./NavLink"


export default React.createClass({

  contextTypes:{

    router:React.PropTypes.object

  },

  handleSubmit(e){

    e.preventDefault();

    const userName = e.target.elements[0].value;

    const repo = e.target.elements[1].value;

    const path = `/repos/${userName}/${repo}`;

    browserHistory.push(path);

    //或者使用context,需要定义contextTypes
    // this.context.router.push(path);
  },

  render() {
    return (
    	<div>
    		<h2>Repos</h2>

    		<ul>
    			<li><NavLink to="/repos/reactjs/react-router">React Router</NavLink></li>
          <li><NavLink to="/repos/facebook/react">React</NavLink></li>
          <li>
            <form onSubmit={this.handleSubmit}>
              <input type="text" placeholder="userName"/> / {' '}
              <input type="text" placeholder="repo"/>{' '}
              <button type="submit">Go</button>
            </form>
          </li>
    		</ul>

        { this.props.children }

    	</div>
    )
  }
})