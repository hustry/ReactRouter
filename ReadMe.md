
## React-router 学习教程

翻译整理自[reactjs/react-router-tutorial](https://github.com/reactjs/react-router-tutorial)

### 使用

```js
//运行最终的结果(12-navigation目录下)
npm run start
```

### 目录

*  02-rendering-route

*  03-navigating-with-link

*  04-Nested-Routes

*  05-Active-Links

*  06-params

*  07-more-nesting

*  08-index-route

*  09-IndexLink

*  10-clean-urls

*  12-navigation

### 02-rendering a route

首先React Router是一个组件.但在配置route之前不显示任何东西.

```javascript
render(<Router />,document.getElementById('app'))
```

添加组件app,repos与about,通过route集成到一起.

```javascript
import About from './modules/About'
import Repos from './modules/Repos'

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}/>
    {/* add the routes here */}
    <Route path="/repos" component={Repos}/>
    <Route path="/about" component={About}/>
  </Router>
), document.getElementById('app'))
```

### 03-navigating-with-link

可能使用最多的组件是`Link`,与`<a>`几乎一样,但它可感受到`router`.

```javascript
import React from 'react'
import { Link } from 'react-router'

export default React.createClass({
  render() {
    return (
      <div>
        <h1>React Router Tutorial</h1>
        <ul role="nav">
          <li><Link to="/about">About</Link></li>
          <li><Link to="/repos">Repos</Link></li>
        </ul>
      </div>
    )
  }
})
```

### 04-Nested Routes

`<App>`组件有导航条是每个页面均要显示的,可以构建导航条组件`<Nav>`,然后在每个页面渲染`<Nav>`.

更好的方法是使用嵌套route.


**共享navigation**

将`About`与`Repos`组件放在`App`内部.

```javascript
render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      {/* make them children of `App` */}
      <Route path="/repos" component={Repos}/>
      <Route path="/about" component={About}/>
    </Route>
  </Router>
), document.getElementById('app'))
```

然后在App组件中渲染子组件.

```javascript
// modules/App.js
// ...
  render() {
    return (
      <div>
        <h1>React Router Tutorial</h1>
        <ul role="nav">
          <li><Link to="/about">About</Link></li>
          <li><Link to="/repos">Repos</Link></li>
        </ul>

        {/* add this */}
        {this.props.children}

      </div>
    )
  }
```

通过以上router构建的UI如下

```javascript
// at /about
<App>
  <About/>
</App>

// at /repos
<App>
  <Repos/>
</App>
```

### 05-Active Links

`Link`与`a`不同的地方在于`Link`自己对应的路径是否被激活，此时可以通过`activeStyle`与`activeClassName`来设定激活时对应的样式.

**activeStyle**

设置行内样式.

```javascript
// modules/App.js
<li><Link to="/about" activeStyle={{ color: 'red' }}>About</Link></li>
<li><Link to="/repos" activeStyle={{ color: 'red' }}>Repos</Link></li>
```

**activeClassName**

设置类名

```javascript
// modules/App.js
<li><Link to="/about" activeClassName="active">About</Link></li>
<li><Link to="/repos" activeClassName="active">Repos</Link></li>
```
**Nav Link Wrappers**

构建`NavLink`组件,包装`activeClassName`属性.

```javascript

// modules/NavLink.js
import React from 'react'
import { Link } from 'react-router'

export default React.createClass({
  render() {
    return <Link {...this.props} activeClassName="active"/>
  }
})
```

### 06-params

考虑如下URLs:

```
/repos/reactjs/react-router
/repos/facebook/react
```
这些URL与如下路由路径匹配:

```
/repos/:userName/:repoName
```

组件可以通过`this.props.params[repoName]`获取路径参数.


**添加带参数的route**

Repo组件

```javascript
// modules/Repo.js
import React from 'react'

export default React.createClass({
  render() {
    return (
      <div>
        <h2>{this.props.params.repoName}</h2>
      </div>
    )
  }
})
```

修改index.js，添加路由.

```javascript
// ...
// import Repo
import Repo from './modules/Repo'

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="/repos" component={Repos}/>
      {/* add the new route */}
      <Route path="/repos/:userName/:repoName" component={Repo}/>
      <Route path="/about" component={About}/>
    </Route>
  </Router>
), document.getElementById('app'))
```

### 07-more-nesting

为了在`repo`路径下能看到`repos`列表,将`repo`嵌套入`repos`.

```javascript
// index.js
// ...
<Route path="/repos" component={Repos}>
  <Route path="/repos/:userName/:repoName" component={Repo}/>
</Route>
```

```javascript
// Repos.js
// ...
<div>
  <h2>Repos</h2>
  <ul>
    <li><Link to="/repos/reactjs/react-router">React Router</Link></li>
    <li><Link to="/repos/facebook/react">React</Link></li>
  </ul>
  {/* will render `Repo.js` when at /repos/:userName/:repoName */}
  {this.props.children}
</div>
```

### 08-index route

当路径为`/`时,可以通过`IndexRoute`设置一个组件作为其默认组件.

```javascript
// index.js
// new imports:
// add `IndexRoute` to 'react-router' imports
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
// and the Home component
import Home from './modules/Home'

// ...

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>

      {/* add it here, as a child of `/` */}
      <IndexRoute component={Home}/>

      <Route path="/repos" component={Repos}>
        <Route path="/repos/:userName/:repoName" component={Repo}/>
      </Route>
      <Route path="/about" component={About}/>
    </Route>
  </Router>
), document.getElementById('app'))
```

IndexRoute没有path定义,它会在没有其它路由匹配时成为父组件的children(即当父路由精准匹配时).

### 09-IndexLink

由于"/"是所有路由的父路由，因此其对应的`Link`永远是active的,我们需要`IndexLink`替换`Link`来表现只有处于`/`时active的`Link`.

```javascript
// App.js
import { IndexLink } from 'react-router'

// ...
<li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
```

**`onlyActiveOnIndex`属性**

`IndexLink`起始是在`Link`上添加了`onlyActiveOnIndex`属性.

```javascript
<li><NavLink to="/" onlyActiveOnIndex={true}>Home</NavLink></li>
```

### 10-clean-urls

默认使用的`hashHistory`,在路径后有`#`,使用`**browserHistory**`即可消除.

```javascript
// index.js
// ...
// bring in `browserHistory` instead of `hashHistory`
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

render((
  <Router history={browserHistory}>
    {/* ... */}
  </Router>
), document.getElementById('app'))
```

使用`browserHistory`需要配置服务器,WebpackDevServer添加选项`--history-api-fallback`.

```javascript
"start": "webpack-dev-server --inline --content-base . --history-api-fallback"
```


###  12-navigation

大多时候使用`Link`进行路径的切换,也可以通过程序进行路径切换来响应按钮点击与表单提交.

```javascript
// modules/Repos.js
import React from 'react'
import NavLink from './NavLink'

export default React.createClass({

  // add this method
  handleSubmit(event) {
    event.preventDefault()
    const userName = event.target.elements[0].value
    const repo = event.target.elements[1].value
    const path = `/repos/${userName}/${repo}`
    console.log(path)
  },

  render() {
    return (
      <div>
        <h2>Repos</h2>
        <ul>
          <li><NavLink to="/repos/reactjs/react-router">React Router</NavLink></li>
          <li><NavLink to="/repos/facebook/react">React</NavLink></li>
          {/* add this form */}
          <li>
            <form onSubmit={this.handleSubmit}>
              <input type="text" placeholder="userName"/> / {' '}
              <input type="text" placeholder="repo"/>{' '}
              <button type="submit">Go</button>
            </form>
          </li>
        </ul>
        {this.props.children}
      </div>
    )
  }
})
```

两种方法，第一种通过`browserHistory`的`push`方法.

```javascript
// modules/Repos.js
import { browserHistory } from 'react-router'

// ...
  handleSubmit(event) {
    // ...
    const path = `/repos/${userName}/${repo}`
    browserHistory.push(path)
  },
// ...
```

第二种使用`Router`提供的`context`.

```javascript
export default React.createClass({

  // ask for `router` from context
  contextTypes: {
    router: React.PropTypes.object
  },

  // ...

  handleSubmit(event) {
    // ...
    this.context.router.push(path)
  },

  // ..
})
```
