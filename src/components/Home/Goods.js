import React,{Component} from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom';
import { NavBar, Icon } from 'antd-mobile';
import '../../scss/goods.scss'
import GoodsList from '../commons/GoodsList'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortUp,faSortDown} from '@fortawesome/free-solid-svg-icons'
library.add(faSortUp,faSortDown )



class Goods extends Component{
	
	constructor(){
		super();
		this.state={
			eventName:'',
			menu:[
				{name:"人气",icon:'',keyword:'',sort:''},
				{name:"折扣",icon:'',keyword:1,sort:'ASC'},
				{name:"价格",icon:'sort-up',keyword:'',sort:'DESC'},
				{name:"筛选",icon:'',keyword:'',sort:'',keyword:'',sort:'ASC'}],
			icon:0,
			index:'',
			tool:[{keyword:'',sort:''}]		
		}
	}
	componentWillMount(){
		console.log(this.props.location.pathname.split('/')[3])
      let thirdCategories = window.localStorage.getItem('title');
      console.log(thirdCategories)
	  this.setState({
		eventName:thirdCategories	
	  	})
    }
	handlerTaget(idx,menu){
		let hash = window.location.hash.split('/')[2];
		this.setState({
			index:idx,
			tool:[{keyword:menu.keyword,sort:menu.sort}]
		})

		if(idx==2){
				this.setState({
					icon:!this.state.icon,
				})
				if(this.state.icon==0){
					console.log("DESC")
					this.setState({
						tool:[{keyword:menu.keyword,sort:"DESC"}]
					})
				}else{
					console.log("ASC")
					this.setState({
						tool:[{keyword:menu.keyword,sort:"ASC"}]
					})
				}
			}
		}
	
	handClick(){
		this.props.history.goBack()
	}
	render(){
		let { eventName,products,tagListDto,promotions,menu,index,tool} = this.state;
		console.log(eventName)
		return <div className="goodsitem">
			    <NavBar
			      mode="light"
			      icon={<Icon type="left" onClick={this.handClick.bind(this)}/>}
			      onLeftClick={() => console.log('onLeftClick')}
			      rightContent={[
			        <Icon key="1" type="ellipsis" />,
			      ]}
			    >{eventName}</NavBar>
			    {/*<ul className="menu" onClick={this.handlerTaget.bind(this)}>
			    	<li>人气</li>
			    	<li>折扣</li>
			    	<li>
			    		价格<div className="aesc"></div>
			    	</li>
			    	<li>筛选</li>
			    </ul>*/}
			   	<ul className="menu" >
			    	{menu.map((menu,idx)=>{
			    		return <li key={idx} onClick={this.handlerTaget.bind(this,idx,menu)} className={index==idx?'active':null}>
			    			{menu.name}
			    			{menu.icon==''?'':<i><FontAwesomeIcon icon={this.state.icon==0?'sort-up':'sort-down'}/></i>}
			    			
			    		</li>
			    	})}
			    </ul>
			    <GoodsList data={tool}/>
			</div>
	}
}
Goods = withRouter(Goods);
export default Goods;

{/* 人气 http://www.mei.com/appapi/event/product/v3?pageIndex=1&categoryId=2121005100000001457&key=&sort=*/}
{/* 折扣 http://www.mei.com/appapi/event/product/v3?pageIndex=1&categoryId=2121005100000001457&key=1&sort=ASC*/}
{/* 降序 http://www.mei.com/appapi/event/product/v3?pageIndex=1&categoryId=2121005100000001457&key=&sort=DESC*/}
{/* 升序 http://www.mei.com/appapi/event/product/v3?pageIndex=1&categoryId=2121005100000001457&key=&sort=ASC*/}
{/* 筛选 http://www.mei.com/appapi/event/search/v3?brandNames=&thirdCategories=&chineseCodes=&eventId=2121005100000001457
	&siloId=2013000100000000001&minPrice=500&maxPrice=1000&sort=ASC&key=&pageIndex=1*/}
{/* 筛选 http://www.mei.com/appapi/event/search/v3?brandNames=&thirdCategories=&chineseCodes=&eventId=2121005100000001457&siloId=2013000100000000001&minPrice=400&maxPrice=1000&sort=ASC&key=&pageIndex=1*/}