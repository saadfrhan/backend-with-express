import Students from "./pages/Students/Students"
import Subjects from "./pages/Subjects/Subjects"
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import './App.css'
import ListOfAllStudents from './pages/Students/ListOfAllStudents'
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
function App() {
  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));
  const classes = useStyles();
  return <>
    <BrowserRouter>
      <div className={classes.root}>
        <Button variant="contained" color="primary">
          <Link to="/subjects"><p>Create New Subject</p></Link>
        </Button>
        <Button variant="contained" color="primary">
          <Link to="/students"><p>Create New Student</p></Link>
        </Button>
        <Button variant="contained" color="primary">
          <Link to="/students-list"><p>See all Students</p></Link>
        </Button>
      </div>
      <Switch>
        <Route path="/students">
          <Students />
        </Route>

        <Route path="/students-list">
          <ListOfAllStudents />
        </Route>

        <Route path="/subjects">
          <Subjects />
        </Route>

      </Switch>
    </BrowserRouter>
  </>
}

export default App;
