import React from 'react'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { useState, useEffect } from 'react';
import SETTINGS from '../../settings'
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Students = () => {

    let [name, setName] = useState('')
    let [gender, setGender] = useState('')
    let [studentClass, setStudentClass] = useState('')
    let [subjects, setSubjects] = useState('')
    let [allSubjects, setAllSubjects] = useState([])
    let [age, setAge] = useState('')
    let [editingStudentId, setEditingStudentId] = useState('')
    let requestParams = useParams();

    function sendRequestToSaveStudent() {
        fetch(`${SETTINGS.server_base_url}/students/add-new`, {
            method: 'post',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({ name, age, gender, studentClass, subjects })
        })
            .then(res => res.json())
            .then(data => {
                console.log('Response from server', data)
                if (data.status) {
                    setName('')
                    setSubjects([])
                }
            })

    }


    function sendRequestToEditStudent() {
        fetch(`${SETTINGS.server_base_url}/students/update`, {
            method: 'put',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                data: { name, age, gender, studentClass, subjects },
                _id: editingStudentId
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log('Response from server', data)

            })
    }

    useEffect(() => {
        fetch(`${SETTINGS.server_base_url}/subjects/list-all`)
            .then(res => res.json())
            .then(subjectsList => {
                setAllSubjects(subjectsList.data)
            })

        if (requestParams.id) {
            setEditingStudentId(requestParams.id)
            fetch(`${SETTINGS.server_base_url}/students/list/${requestParams.id}`)
                .then(res => res.json())
                .then(student => {
                    updateFormToUpdateStudent(student.data)
                })
        }
    }, [])
    function updateFormToUpdateStudent(data) {
        setName(data.name)
        setAge(data.age)
        setGender(data.gender)
        setStudentClass(data.class)
        setSubjects(data.subjects)
    }
    const classes = useStyles();
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    {editingStudentId ?
                        <span>Edit A Student</span> : <span>Create A Student</span>}
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        label="Name"
                        autoFocus
                        fullWidth
                        onChange={(e) => { setName(e.target.value) }}
                        required
                        value={name}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        type='Number'
                        label="Age"
                        autoFocus
                        onChange={(e) => { setAge(e.target.value) }}
                        value={age}
                    />
                    <br /><br />
                    <div>
                        <FormControl fullWidth>
                            <InputLabel fullWidth id="demo-simple-select-label">Select Gender</InputLabel>
                            <Select
                                fullWidth
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                onChange={(e) => { setGender(e.target.value) }}
                                value={gender}
                            >
                                <MenuItem value='Male'>Male</MenuItem>
                                <MenuItem value='Female'>Female</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <br />
                    <div>
                        <FormControl fullWidth>
                            <InputLabel fullWidth id="demo-simple-select-label">Select Class</InputLabel>
                            <Select
                                fullWidth
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                onChange={(e) => { setStudentClass(e.target.value) }}
                                value={studentClass}
                            >
                                <MenuItem value='6'>VI</MenuItem>
                                <MenuItem value='7'>VII</MenuItem>
                                <MenuItem value='8'>VIII</MenuItem>
                                <MenuItem value='9'>XI</MenuItem>
                                <MenuItem value='10'>X</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <br />
                    {studentClass && allSubjects
                        .filter(subject =>
                            subject.class == studentClass)
                        .map(subject =>
                            <FormControlLabel control={
                                <Checkbox checked={subjects.includes(subject.name)} color="primary" onChange={(event) => {
                                    let previousState = [...subjects];
                                    if (event.target.checked) {
                                        previousState.push(subject.name)
                                    } else {
                                        let index = previousState.indexOf(subject.name)
                                        previousState.splice(index, 1)
                                    }
                                    setSubjects(previousState)
                                }} />}
                                label={`${subject.name}`} key={subject._id}
                            />)}

                    {editingStudentId ?
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={() => { sendRequestToEditStudent() }}
                        >
                            Edit Student
      </Button>
                        :
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={() => { sendRequestToSaveStudent() }}
                        >
                            Save student
</Button>
                    }
                </form>
            </div>
        </Container>
    );
}

export default Students;