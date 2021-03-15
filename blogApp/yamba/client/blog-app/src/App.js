import { BrowserRouter, Switch, Link, Route } from 'react-router-dom';
import ViewBlog from './containers/blogs/ViewBlog';
import { CreateNewBlog, ListBlogs } from './containers/store';
import SignInForm from './containers/users/SignInForm';
import SignUpForm from './containers/users/SignUpForm';

function App() {
  return (
    <>
      <BrowserRouter>
      <Link to="/blogs">View all blogs</Link> | <Link to="/blogs/new">Create new Blog</Link>
        <Switch>
          <Route exact path='/blogs/new' component={CreateNewBlog} />
          <Route exact path='/blogs' component={ListBlogs} />
          <Route exact path='/blog/:id' component={ViewBlog} />
          <Route exact path='/signup' component={SignUpForm} />
          <Route exact path='/signin' component={SignInForm} />        
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
