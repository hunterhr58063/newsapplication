import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: 'general'
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  capitalizerFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loding: true,
      page: 1,
      totalResults: 0
    }
    document.title = `${this.capitalizerFirstLetter(this.props.category)}-DailyNews`;
  }
  updateNews= async (props)=> {
    this.props.setProgress(30);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loding: true });
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    this.setState({ articles: parseData.articles, totalResults: parseData.totalResults, loding: false })
    this.props.setProgress(100);

  }
  async componentDidMount() {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=391686d6539a4d71975565689910dd34&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({loding:true});
    // let data = await fetch(url);
    // let parseData = await data.json();
    // console.log(parseData);
    // this.setState({ articles: parseData.articles, totalResults: parseData.totalResults ,loding:false })
    this.updateNews();
  }

  // handleprevClick = async () => {
  //   // console.log('previous');

  //   // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=391686d6539a4d71975565689910dd34&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
  //   // this.setState({loding:true});
  //   // let data = await fetch(url);
  //   // let parseData = await data.json();
  //   // console.log(parseData);

  //   // this.setState({
  //   //   page: this.state.page - 1,
  //   //   articles: parseData.articles,
  //   //   loding:false
  //   // })
  //   this.setState({ page: this.state.page - 1 });
  //   this.updateNews();
  // }
  // handlenextClick = async () => {
  //   // console.log("next");
  //   // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) { 
  //   //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=391686d6539a4d71975565689910dd34&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
  //   //   this.setState({loding:true});
  //   //   let data = await fetch(url);
  //   //   let parseData = await data.json();


  //   //   this.setState({
  //   //     page: this.state.page + 1,
  //   //     articles: parseData.articles,
  //   //     loding:false
  //   //   })
  //   // }
  //   this.setState({ page: this.state.page + 1 });
  //   this.updateNews();

  // }
  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 })
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    // this.setState({ loding: true });
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    this.setState({ articles: this.state.articles.concat(parseData.articles), totalResults: parseData.totalResults, loding: false })
  };




  render() {
    return (
      <div className='container my-3 '>
        <h1 className='text-center'>DailyNews - Top {this.capitalizerFirstLetter(this.props.category)} Headlines </h1>
        {this.state.loding && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
                return <div className="col-md-4" key={element.url}>
                  <Newsitem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
      </div>
    )
  }
}

export default News
