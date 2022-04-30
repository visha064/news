import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export default class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 12,
        category: "general"
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    constructor() {
        super()
        console.log("constructor of news");
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0,

        }
    }

    async componentDidMount() {
        console.log("cdm");
        this.setState({ loading: true })
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b3cf7ef537514246b3a32c8f7c76731b&page=1&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parrseData = await data.json();
        this.setState({ articles: parrseData.articles, totalResults: parrseData.totalResults, loading: false })
    }

    handlepre = async () => {
        console.log("prev");
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b3cf7ef537514246b3a32c8f7c76731b&page=${this.state.page - 1}&pageSize=${this.state.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        let parrseData = await data.json();
        this.setState({ articles: parrseData.articles, page: this.state.page - 1, loading: false })


    }

    handlenext = async () => {
        console.log("next");
        {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b3cf7ef537514246b3a32c8f7c76731b&page=${this.state.page + 1}&pageSize=${this.state.pageSize}`;
            this.setState({ loading: true })
            let data = await fetch(url);
            let parrseData = await data.json();
            this.setState({ articles: parrseData.articles, page: this.state.page + 1, loading: false })
        }
    }
    fetchMoreData = async () =>{

    }
    

    render() {
        return (
            <div className='container my-4' style={{ border: "3px solid rgb(13,110,253)" }}>
                <h1 className='d-block p-2 bg-primary text-white' style={{ border: "2px solid lightblue" }}>DAILY NEWS TOP HEADING <span style={{ color: "red" }}> <i className="fab fa-hotjar"></i></span></h1>
                {this.state.loading && <Spinner />}
                {/* <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={true}
                    loader={<Spinner/>} */}
                {/* > */}
                    <div className="row">
                        {this.state.articles.map((element) => {
                            return <div className="col-lg-4 col-md-6" key={element.url}>
                                <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} time={element.publishedAt} source={element.source.name} /></div>
                        })}
                    
                    {/* </InfiniteScroll> */}
                    <div className="container my-4 d-flex justify-content-between" >
                <button type="button" disabled={this.state.page<=1} onClick={this.handlepre} className="btn btn-lg btn-primary">&larr; Previous</button>
                <button type="button" disabled={!(Math.ceil(this.state.totalResults/18)>=this.state.page+1)} onClick={this.handlenext} className="btn btn-lg btn-primary">Next &rarr;</button>
                </div>
            </div>
            </div>
        )
    }
}
