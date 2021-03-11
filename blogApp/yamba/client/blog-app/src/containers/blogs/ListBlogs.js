import SETTING from '../../appSettings';
import axios from 'axios'
import { useEffect, useState } from 'react';

function ListBlogs() {


    let getListOfAllCreatedBlogs = () => {

        axios.get(`${SETTING.server_base_url}/blogs`)
            .then(success => {
                if (success.data.status) {
                    setListOfBlogs(success.data.list)
                } else {
                    console.log('ERROR')
                }
            })
            .catch(err => {
                alert('ERROR')
            })
    }

    let [listOfBlogs, setListOfBlogs] = useState([])
    useEffect(() => {
        getListOfAllCreatedBlogs()
    }, [])
    console.log(listOfBlogs)
    return <>
        <h1>Total Blog:{listOfBlogs.length}</h1>
    </>
}

export default ListBlogs;