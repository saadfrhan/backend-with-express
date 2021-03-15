import appSettings from '../../appSettings';
import axios from 'axios'
import { useEffect, useState } from 'react';
import BlogIntro from './BlogIntro';

function ListBlogs() {

    let [listOfBlogs, setListOfBlogs] = useState([])

    let getListOfAllCreatedBlogs = () => {
        
        axios.get(`${appSettings.server_base_url}/blogs`)
            .then(success => {
                if (success.data.status) {
                    setListOfBlogs(success.data.list)
                } else {
                    console.log('ERROR')
                }
            })
            .catch(err => {
                alert(err)
            })

    }

    useEffect(() => {
        getListOfAllCreatedBlogs()
    }, [])

    console.log(listOfBlogs)

    return <>
        <h1>Total Blog:{listOfBlogs.length}</h1>
        {listOfBlogs.map(blog => 
            <BlogIntro key={blog._id} _id={blog._id} title={blog.title} tagline={blog.tagline} />
        )}
    </>
    
}

export default ListBlogs;