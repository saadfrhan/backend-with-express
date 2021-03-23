import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import appSettings from '../../appSettings';

const ViewBlog = () => {
  let [blogDetails, setBlogDetails]  = useState({})

    let requestParam = useParams()
    useEffect = (() => {
        axios.get(`${appSettings.server_base_url}/blogs/${requestParam.id}`)
            .then(success => {
                console.log(success.data.requestedBlog)
                setBlogDetails(success.data.requestedBlog)
            })
            .catch(err => {
                console.log('Unable to find the requested blog.... :P')
            })
    }, [])
    return (
        <>
        {
            blogDetails._id ? <>
            <h1>{blogDetails.title}</h1>
            <img src={blogDetails.headerImageURL} /> </> : 
            <h1>Loading....</h1>
        }
        </>
    )
}

export default ViewBlog;
