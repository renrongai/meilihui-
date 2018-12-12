import React,{Component} from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import { Tabs, WhiteSpace } from 'antd-mobile';
import '../../../node_modules/antd-mobile/dist/antd-mobile.css';
import '../../scss/navlist.scss'

class NavList extends Component{
   	constructor(){
   		super();
   		this.state={
   			tabs:[
	      { 
	      	title: '推荐' ,
	      	path:'/index',
	      	categoryId:'',
	      	ids:''
	      },
	      {
	      	title: '海外' ,
	      	path:'/crossborder',
	      	categoryId:'2013000100000000011',
	      	ids:'2041000100000000206'
	      },
	      { 
	      	title: '女士',
	      	path:'/women',
	      	categoryId:'2013000100000000001',
	      	ids:'2120000100000000276'
	      },
	      { 
	      	title: '男士' ,
	      	path:'/men',
	      	categoryId:'2013000100000000002',
	      	ids:'2121000100000000234'
	      },
	      { 
	      	title: '美妆',
	      	path:'/cosmetics',
	      	categoryId:'2013000100000000003',
	      	ids:'2042000100000000431'
	      },
	      {
	      	title: '家居' ,
	      	path:"/lifestyle",
	      	categoryId:'2013000100000000004',
	      	ids:'2121000100000000291'
	      },
	      { 
	      	title: '婴童' ,
	      	path:'/kids',
	      	categoryId:'2013000100000000005',
	      	ids:'2120000100000000146'
	      }],
	      index:'',
		}
   	}
   	handlerClick(idx,tab){
   		this.setState({
   			index:idx
   		})
		let {history} =this.props
   		history.push({
   			pathname:'/silo'+tab.path+'/'+tab.categoryId+"/"+tab.ids,
   		}); 		
   	}
  render() {
	{/*http://www.mei.com/appapi/search/searchDefault/v3*/}
	let data = this.props.data
	let {tabs,index} = this.state
	return  <div className="navlist">	
        <ul className={`tabs ${data>100?"change":''}`}>
	        {
	            tabs.map((tab,idx)=>{
	                return <li key={idx} onClick={this.handlerClick.bind(this,idx,tab)}>
	                		{tab.title}<div className={index==idx?'active':null}></div>
	                	</li>
	            })
	        }
	       	
        </ul>
 	 </div>
	}
}
NavList =withRouter(NavList)
export default NavList;

{/*http://www.mei.com/appapi/cms/cmsDetail/v3?silo=2013000100000000011&ids=2041000100000000206&
	timestamp=1543927665963&summary=f0592a9e2ac5990d948d2c087c922cae&platform_code=H5*/}
{/*http://www.mei.com/appapi/cms/cmsDetail/v3?silo=2013000100000000001&ids=2120000100000000276&
	timestamp=1543927879084&summary=d8fa60e95ef73e3fae9cbd13e7bce95c&platform_code=H5*/}
{/*http://www.mei.com/appapi/cms/cmsDetail/v3?silo=2013000100000000011&ids=2041000100000000206*/}
