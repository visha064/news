import React, { Component } from 'react'

export default class NewsItem extends Component {
    render() {

        let { title, description, imageUrl, newsUrl, author, time, source } = this.props;

        return (
            <div>
                <div className="card" >
                    <span class="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left:"95%",zIndex:"1"}}>
                        {source}
                        <span class="visually-hidden">unread messages</span>
                    </span>
                    <img src={imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p class="card-text"><small class="text-muted">by {author ? author : "unknown"} at {time}</small></p>
                        <a href={newsUrl} className="btn btn-primary">Read more</a>
                    </div>
                </div>
            </div>
        )
    }
}
