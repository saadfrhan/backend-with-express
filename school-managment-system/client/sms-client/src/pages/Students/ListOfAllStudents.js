import { useState } from "react"
import { useEffect } from "react"
import SETTINGS from "../../settings"
import Table from '@material-ui/core/Table';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom'
import DeleteIcon from '@material-ui/icons/Delete';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import UpdateIcon from '@material-ui/icons/Update';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import '../../App.css'
const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 100,
    },
    iconColor: {
        color: 'black',
    },
}));

export default function ListOfAllStudents() {
    const classes = useStyles();
    let [studentList, setStudentList] = useState([])

    useEffect(() => {
        getAllStudents()
    }, [])

    const getAllStudents = () => {
        fetch(`${SETTINGS.server_base_url}/students/list-all`)
            .then(res => res.json())
            .then(studentList => {
                setStudentList(studentList.data)
            })
    }

    const sendRequestToDeleteStudent = (id) => {
        fetch(`${SETTINGS.server_base_url}/students/delete/${id}`, { method: 'delete' })
            .then(res => res.json())
            .then(studentList => {
                getAllStudents()
            })
    }
    return <>
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Age</TableCell>
                        <TableCell align="center">Gender</TableCell>
                        <TableCell align="center">Class</TableCell>
                        <TableCell align="center">Subjects</TableCell>
                        <TableCell align="center">Edit</TableCell>
                        <TableCell align="center">Delete</TableCell>
                    </TableRow>
                </TableHead>
                {studentList.map(student =>
                    <TableBody>
                        <TableRow key={student._id}>
                            <TableCell component="th" scope="row" align="center">{student.name}</TableCell>
                            <TableCell component="th" scope="row" align="center">{student.age}</TableCell>
                            <TableCell component="th" scope="row" align="center">{student.gender}</TableCell>
                            <TableCell component="th" scope="row" align="center">{student.class}</TableCell>
                            <TableCell component="th" scope="row" align="center">{student.subjects.join(', ')}</TableCell>
                            <TableCell component="th" scope="row" align="center">
                                <IconButton aria-label="update">
                                    <Link to={`/student/${student._id}`}>       <UpdateIcon className={classes.iconColor} /></Link>
                                </IconButton>
                            </TableCell>
                            <TableCell component="th" scope="row" align="center">
                                <IconButton aria-label="delete">
                                    <DeleteIcon className={classes.iconColor} onClick={() => { sendRequestToDeleteStudent(student._id) }} />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    </TableBody>)}
            </Table>
        </TableContainer>

    </>
}