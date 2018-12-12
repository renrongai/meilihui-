import React,{Component} from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom';
import { NavBar, Icon } from 'antd-mobile';
import '../../scss/goods.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortUp,faSortDown} from '@fortawesome/free-solid-svg-icons'
library.add(faSortUp,faSortDown )



class SiloGoodsList extends Component{
	
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
      //获取hash值
       console.log(this.props);
      let hash = window.location.hash.split('/')[2];//#list
     
      let categoryId = this.props.location.pathname.split('/')[2]
      let siloId = this.props.location.pathname.split('/')[3]
      let thirdCategories = this.props.location.pathname.split('/')[4]
	  let keyword=this.props.data[0].keyword
	  let sort =this.props.data[0].sort
      if(siloId=="2013000100000000011"){
      		let urlname = "product"
      		this.siloGoods(categoryId,siloId,thirdCategories,urlname)
      }else{
      		let urlname = "search"
      		categoryId = this.props.location.pathname.split('/')[5]
      		this.siloGoods(categoryId,siloId,thirdCategories,urlname,keyword,sort)
      }
	  
  }
	componentWillReceiveProps(nextProps){
		console.log(nextProps)
      let categoryId = nextProps.location.pathname.split('/')[2]
      let siloId = nextProps.location.pathname.split('/')[3]
      let thirdCategories = nextProps.location.pathname.split('/')[4]
      let keyword = nextProps.data[0].keyword;
      let sort = nextProps.data[0].sort;
      if(siloId=="2013000100000000011"){
      		let urlname = "product"
      		this.siloGoods(categoryId,siloId,thirdCategories,urlname)
      	}else{
      		let urlname = "search"
      		categoryId = nextProps.location.pathname.split('/')[5]
      		this.siloGoods(categoryId,siloId,thirdCategories,urlname,keyword,sort)
      }
	}
	siloGoods(categoryId,siloId,thirdCategories,urlname,keyword,sort){
		axios.get(`http://www.mei.com/appapi/secondcategory/${urlname}/v3`,{
	  	params:{
	  		brandNames:'',
	  		chineseCodes:'',
	  		pageIndex:1,
	  		categoryId:categoryId,
			siloId:siloId,
			thirdCategories:thirdCategories,
			key:keyword,
			sort:sort,
			isCrossBorder:1	
	  	}
	  })
	  .then((res)=>{
//	  	console.log(res);
	  	let tag = res.data.products
	  	
	    let data = res.data
	    if(tag==''){
	    	tag="没有更多数据"
	    }
	  	this.setState({
	  		products:data.products,
	  		eventName:thirdCategories,
	  		tagListDto:tag,
	  	})
	  })
	}
	handlerClick(product){
		console.log(product);
		let hash = window.location.hash.split('/')[2]   // 获取哈希值
		let {history} = this.props
		history.push({
			pathname:'/info/'+hash+"/"+product.productId
		})
	}
	render(){
//		console.log(this.props); nu,index,keyword,sort} = this.state;
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
SiloGoodsList = withRouter(SiloGoodsList);
export default SiloGoodsList;

