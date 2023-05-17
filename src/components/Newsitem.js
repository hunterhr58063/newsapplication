import React, { Component } from 'react'

export class Newsitem extends Component {

    render() {
        let {title, description, imageUrl, newsUrl, author, date ,source} = this.props;
        return (
            <div className='my-3'>
                <div className="card">
                    <img src={imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}<span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-dark">
                            {source}<span className="visually-hidden">unread messages</span>
                        </span></h5>
                        <p className="card-text">{description}</p>
                        <p className='card-text'><small className='text-muted'>by {!author ? "Unknown" : author}on {new Date(date).toUTCString()}</small></p>
                        <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Newsitem
