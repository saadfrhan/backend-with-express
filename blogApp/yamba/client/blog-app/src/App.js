import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { CreateNewBlog } from './containers/store';

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path='/blogs/new' component={CreateNewBlog} />
          <Route exact path='/blogs' component={ListBlogs} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
