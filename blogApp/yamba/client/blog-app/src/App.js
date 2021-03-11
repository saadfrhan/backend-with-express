import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { CreateNewBlog, ListBlogs } from './containers/store';

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
