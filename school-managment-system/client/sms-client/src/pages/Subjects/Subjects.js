import React from 'react';
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
import { useState } from 'react';
import SETTINGS from '../../settings'

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

export default function Subjects() {
    const [subjectName, setSubjectName] = useState('')
    const [subjectClass, setSubjectClass] = useState('')

    function saveSubject(name, sClass){
        fetch(`${SETTINGS.server_base_url}/subjects/add-new`, {
            method : 'post',
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify({name, sClass})
        })
            .then(res => res.json())
            .then(data => {
                console.log("Response from Server ", data)

            })
    }

    const [age, setAge] = React.useState('');
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Create A Subject
        </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Subject Name"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(e) => { setSubjectName(e.target.value) }}
                    />
                    <br /><br />
                    <FormControl fullWidth>
                        <InputLabel fullWidth id="demo-simple-select-label">Select Class</InputLabel>
                        <Select
                            fullWidth
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            onChange={(e) => { setSubjectClass(e.target.value); setAge(e.target.value); }}
                        >
                            <MenuItem value={6}>VI</MenuItem>
                            <MenuItem value={7}>VII</MenuItem>
                            <MenuItem value={8}>VIII</MenuItem>
                            <MenuItem value={9}>XI</MenuItem>
                            <MenuItem value={10}>X</MenuItem>
                        </Select>
                    </FormControl>
                    <br />

                    <br />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => {saveSubject(subjectName, subjectClass)}}
                    >
                        Save subject
          </Button>
                </form>
            </div>
        </Container>
    );
}