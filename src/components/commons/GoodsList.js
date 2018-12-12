import React,{Component} from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom';
import { NavBar, Icon } from 'antd-mobile';
import '../../scss/goods.scss'




class GoodsList extends Component{
	
	constructor(){	
		super();
		this.state={
			products:[],
			eventName:'',
			tagListDto:[],
			promotions:'',
			
			icon:0,
			index:'',
		}
	}
	componentWillMount(){
		console.log(this.props.data[0])
      //获取hash值
      let hash = window.location.hash.split('/')[2];//#list
      let keyword = this.props.data[0].keyword
      let sort = this.props.data[0].sort
	  this.renqi(hash,keyword,sort);  
	 
 }
	componentWillReceiveProps(nextProps){
		console.log(nextProps)
		let hash = nextProps.location.pathname.split('/')[2];//#list
	     let keyword = nextProps.data[0].keyword
	     console.log("componentWillReceiveProps:"+keyword)
	     let sort =  nextProps.data[0].sort
	  	this.renqi(hash,keyword,sort);  
	}
	renqi(hash,keyword,sort){  
		axios.get('mlhapi/appapi/event/product/v3',{
		  	params:{
		  		pageIndex:1,
		  		categoryId:hash,
		  		key:keyword,
		  		sort:sort
		  	}
		  })
		  .then((res)=>{
	//	  	console.log(res);
		  	let tag = res.data.products.map((item)=>item.tagListDto)
//		  	console.log(tag);
		  	let data = res.data
		  	console.log(data);
		  	window.localStorage.setItem('title',data.eventName);
		  	this.setState({
		  		products:data.products,
		  		eventName:data.eventName,
		  		tagListDto:tag,
		  		promotions:data.promotions.info.split(';')[0]
		  	})
		})
	}
	handlerClick(product,eventName){
		console.log(product);
		let hash = window.location.hash.split('/')[2]   // 获取哈希值
		let {history} = this.props
		history.push({
			pathname:'/info/'+hash+"/"+product.productId
		})
	
	}
	render(){
		console.log(this.state.eventName);
		console.log("products:",this.state.products);
		return <div className="goodslist">
			   
			   <ul>
			     	{
			     		this.state.products.map((product,idx)=>{
//			     			return <li key={product.productId}> hhh{product.productName}</li>
			     			return <li key={product.productId} onClick={this.handlerClick.bind(this,product)}>
			     				<img src={product.imageUrl}/>
			     				<h4>{product.brandName}</h4>
			     				<p>{product.productName}</p>
			     				<span>￥{product.price}</span><del>￥{product.marketPrice}</del> <span>{product.discount}折</span>
			     			</li>      
			     		})
			     		
			     	}
			     	<p>{this.state.products==''?'没有更多数据':''}</p>
	    		 </ul>  
			</div>
	}
}
//<p>{this.state.products==''?'没有更多数据':''}</p>
GoodsList = withRouter(GoodsList);
export default GoodsList;

