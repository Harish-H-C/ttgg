import React, { Component } from 'react';
import DurMisDisplay from './DurationMisDisplay';
import axios from "axios";
import ReactPaginate from 'react-paginate';
import {Link} from 'react-router-dom';

class DurationChart extends Component {
    constructor(props){
        super(props)
        this.state={
          
          offset: 0,
          tableData: [],
          orgtableData: [],
          perPage: 18,
          currentPage: 0
          }
          this.handlePageClick = this.handlePageClick.bind(this);
       }
        
       handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;
    
        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.loadMoreData()
        });
    
      };
    
      loadMoreData() {
        const data = this.state.orgtableData;
    
        const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
    
        this.setState({
          pageCount: Math.ceil(data.length / this.state.perPage),
          tableData:slice
        })
      }

      handlePageChange(pageNumber) { 
        console.log(`active page is ${pageNumber}`); 
        // start={holdStart} end={holdEnd}
        this.setState({activePage: pageNumber}); 
      } 

    render(){
        return(
            <div>
               <DurMisDisplay userData={this.state.tableData}/> 


              <div className="row">
                <div className="col-sm-11">
                  <ReactPaginate
                  previousLabel={"Prev"}
                  nextLabel={"Next"}
                  breakLabel={"..."}
                  breakClassName={"break-me"}
                  pageCount={this.state.pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={this.handlePageClick}
                  containerClassName={(this.state.data === 0 ? "pagination hidden" : "pagination justify-content" )}
                  subContainerClassName={"pages pagination"}
                  activeClassName={this.state.activePage}/>
                </div>
                <div className="col-sm-1">
                  <Link to="/detail/mismatch"><button className="button">Back</button></Link>
                </div>
              </div>
              
              <div className="jumbotron">
                <li><span className="square2">&nbsp;&nbsp;Duration Mismatch&nbsp;&nbsp;</span></li>
              </div>

            </div>
        )
    }

    componentDidMount(){
        this.getData();
      }
      getData() {
        axios
        .get(`http://localhost:8900/durationmised`)
        
        .then(res => {
          var data = res.data;
          console.log(data)
          var slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
          // console.log(slice)
    
          this.setState({
            pageCount: Math.ceil(data.length / this.state.perPage),
            orgtableData :res.data,
            tableData:slice
          })
        });
    }
    
}

export default DurationChart;