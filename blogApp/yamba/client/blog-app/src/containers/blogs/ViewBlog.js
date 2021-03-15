import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import appSettings from '../../appSettings';

const ViewBlog = () => {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [tagline, setTagline] = useState('')
    const [category, setCategory] = useState('');

    let requestParam = useParams()
    useEffect(() => {
        axios.get(`${appSettings.server_base_url}/blogs/${requestParam.id}`)
            .then(success => {
                console.log(success.data.requestedBlog)
                setTitle(success.data.requestedBlog.title)
                setBody(success.data.requestedBlog.body)
                setCategory(success.data.requestedBlog.category)
                setTagline(success.data.requestedBlog.tagline)
            })
            .catch(err => {
                console.log('Unable to find the requested blog.... :P')
            })
    }, [])
    return (
        <div>
            <h1>{title}</h1>
            <h2>{tagline} {category}</h2>
            <h3>{body}</h3>
        </div>
    )
}

export default ViewBlog;
