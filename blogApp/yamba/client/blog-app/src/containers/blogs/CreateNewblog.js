import { makeStyles, Typography, Button, TextareaAutosize, MenuItem, FormControl, Select, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import styles from './CreateNewBlog.module.css';
import axios from 'axios';
import SETTING from '../../appSettings';

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    root: {
        marginLeft: '150px',
        marginRight: '150px',
    },
    heading: {
        textAlign: 'center',
    }
}));

function CreateNewBlog() {
    const classes = useStyles();

    let categoryOptions = [
        '',
        'Tech',
        'Health',
        'Books'
    ]

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [tagline, setTagline] = useState('')
    const [category, setCategory] = useState('');

    let requestToSaveBlog = (e) => {
        e.preventDefault();
        let data = {
            title,
            body,
            tagline,
            category
        }

        axios.post(`${SETTING.server_base_url}/blogs`, data)
            .then(success => {
                if (success.data.status) {
                    setCategory('')
                    setTitle('')
                    setBody('')
                    setTagline('')
                }
                alert('ERROR')
            })
            .catch(err => {
                console.log(err)
            })

    }

    

    return (
        <>
            <Typography className={classes.heading}>Post creation area!</Typography>

            <form className={classes.root} onSubmit={requestToSaveBlog}>

                <label>
                    <FormControl fullWidth className={classes.formControl}>
                        <Select
                            value={category}
                            onChange={(e) => { setCategory(e.target.value) }}
                            displayEmpty
                            className={classes.selectEmpty}
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem value="">
                                <>Category</>
                            </MenuItem>
                            {categoryOptions.map((category, index) =>
                                <MenuItem key={index} value={category}>
                                    {category}
                                </MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </label>

                <br />

                <label>
                    <TextField value={title} id="standard-basic" onChange={(e) => { setTitle(e.target.value) }} label="Title" fullWidth />
                </label>

                <label>
                    <TextField value={tagline} id="standard-basic" onChange={(e) => { setTagline(e.target.value) }} label="Tag line" fullWidth />
                </label>

                <label><br /><br />
                    <TextareaAutosize value={body} onChange={(e) => { setBody(e.target.value) }} aria-label="empty textarea" rowsMin={15} placeholder="Enter the body" className={styles.textArea} />
                </label>
                <Button fullWidth variant="contained" color="primary" type="submit">
                    Submit
</Button>
            </form>

        </>
    )
}

export default CreateNewBlog;