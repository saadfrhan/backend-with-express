import React from 'react'
import { Link } from 'react-router-dom';
import styles from './BlogIntro.module.css';

const BlogIntro = (props) => {
    return (
        <div className={styles.intro}>
            <h1 className={styles.title}>
                {props.title}
            </h1>
            <div className={styles.tagline}>
                {props.tagline}
                <br />
                <p><Link to={`/blog/${props._id}`}>VIEW BLOG</Link></p>
            </div>
        </div>
    )
}

export default BlogIntro
