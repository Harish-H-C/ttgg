// import React, { Component } from 'react';
// import TouchDownDisplay from './TouchDownDisplay';
// import Footer from '../component/Footer';
// import axios from "axios";
// import ReactPaginate from 'react-paginate';
// import {Link} from 'react-router-dom';
// // import './pagination.css';


// class TouchDown extends Component{
//   constructor(props){
//     super(props)
//     this.state={
      
//       offset: 0,
//       tableData: [],
//       orgtableData: [],
//       perPage: 15,
//       currentPage: 0
//       }
//       this.handlePageClick = this.handlePageClick.bind(this);
//    }

//    handlePageClick = (e) => {
//     const selectedPage = e.selected;
//     const offset = selectedPage * this.state.perPage;

//     this.setState({
//         currentPage: selectedPage,
//         offset: offset
//     }, () => {
//         this.loadMoreData()
//     });

//   };

//   loadMoreData() {
//     const data = this.state.orgtableData;

//     const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)

//     this.setState({
//       pageCount: Math.ceil(data.length / this.state.perPage),
//       tableData:slice
//     })
//   }

//   handlePageChange(pageNumber) { 
//     console.log(`active page is ${pageNumber}`); 
//     this.setState({activePage: pageNumber}); 
//     } 

  

  

//   render(){
//     return(
//       <div>
//         <TouchDownDisplay userData={this.state.tableData}/>

//         <div className="row">
//           <div className="col-sm-11">
//             <ReactPaginate
//             previousLabel={"Prev"}
//             nextLabel={"Next"}
//             breakLabel={"..."}
//             breakClassName={"break-me"}
//             pageCount={this.state.pageCount}
//             marginPagesDisplayed={2}
//             pageRangeDisplayed={5}
//             onPageChange={this.handlePageClick}
//             containerClassName={(this.state.data === 0 ? "pagination hidden" : "pagination justify-content" )}
//             subContainerClassName={"pages pagination"}
//             activeClassName={this.state.activePage}/>
//           </div>
//           <div className="col-sm-1">
//           <Link to="/dashboard"><button className="button">Back</button></Link>
//           </div>
//         </div>

        
//           <li><span className="square">&nbsp;&nbsp;Appointment Match&nbsp;&nbsp;</span></li>
//           <li><span className="square1">&nbsp;&nbsp;Internet Down&nbsp;&nbsp;</span></li>
//           <li><span className="square2">&nbsp;&nbsp;Duration Mismatch&nbsp;&nbsp;</span></li>
//           <li><span className="square3">&nbsp;&nbsp;Appointment Deletion after Service&nbsp;&nbsp;</span></li>
        
//         <br/>
//         <br/>
//         <br/>
//         <br/>
//         <br/>
//         <br/>
//         <br/>
//         <Footer/>
        
          
//       </div>
//     )
//   }

//   componentDidMount(){
//     this.getData();
//   }
//   getData() {
//     axios
//     .get(`http://localhost:8900/tables`)
    
//     .then(res => {
//       var data = res.data;
//       //console.log(data)
//       var slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
//       console.log(slice)

//       this.setState({
//         pageCount: Math.ceil(data.length / this.state.perPage),
//         orgtableData :res.data,
//         tableData:slice
//       })
//     });
//   }
// }


// export default TouchDown;







// //<TouchDownDisplay userData={this.state.touchdown}/>



import React, { Component } from 'react';
import TouchDownDisplay from './TouchDownDisplay';

const url="http://localhost:8900/api";

class TouchDown extends Component{
  constructor(){
    super()
    this.state={
      touchdown:''
    }
  }

  render(){
    return(
      <div>
        <TouchDownDisplay userData={this.state.touchdown}/>
      </div>
    )
  }

  componentDidMount(){
    fetch(url,{method:'GET'})
    .then((response) => response.json())
    //.then((data) =>{console.log(data)})
    .then((data) => {this.setState({touchdown:data})})
  }
}


export default TouchDown;







//<TouchDownDisplay userData={this.state.touchdown}/>