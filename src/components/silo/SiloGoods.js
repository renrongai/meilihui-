import React,{Component} from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom';
import { NavBar, Icon } from 'antd-mobile';
import '../../scss/goods.scss'
import SiloGoodsList from './SiloGoodsList'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortUp,faSortDown} from '@fortawesome/free-solid-svg-icons'
library.add(faSortUp,faSortDown )

class Goods extends Component{
	
	constructor(){
		super();
		this.state={
			products:[],
			eventName:'',   // 列表名
			tagListDto:[], 
			promotions:'', 
			// 免邮
			menu:[
				{name:"人气",icon:'',keyword:'',sort:''},
				{name:"折扣",icon:'',keyword:1,sort:'ASC'},
				{name:"价格",icon:'sort-up',keyword:'',sort:'DESC'},
				{name:"筛选",icon:'',keyword:'',sort:'',keyword:'',sort:'ASC'}],
				index:'',
				tool:[{keyword:'',sort:''}]
		}
	}
	componentWillMount(){
      let thirdCategories = this.props.location.pathname.split('/')[4]
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
		let { eventName,products,tagListDto,menu,index,tool} = this.state;
		console.log("eventName:"+eventName)
		console.log(1111)
		return <div className="goodsitem">
			    <NavBar
			      mode="light"
			      icon={<Icon type="left" onClick={this.handClick.bind(this)}/>}
			      onLeftClick={() => console.log('onLeftClick')}
			      rightContent={[
			        <Icon key="1" type="ellipsis" />,
			      ]}
			    >{eventName}</NavBar>
			    {/*<div className="mianyun">
			    	<i></i>{promotions}
			    </div>*/}
			    <ul className="menu" >
			    	{menu.map((menu,idx)=>{
			    		return <li key={idx} onClick={this.handlerTaget.bind(this,idx,menu)} className={index==idx?'active':null}>
			    			{menu.name}
			    			{menu.icon==''?'':<i><FontAwesomeIcon icon={this.state.icon==0?'sort-up':'sort-down'}/></i>}
			    			
			    		</li>
			    	})}
			    </ul>
			     <SiloGoodsList data={tool}/>
			</div>
	}
}
Goods = withRouter(Goods);
export default Goods;

{/* 折扣： http://www.mei.com/appapi/secondcategory/search/v3?brandNames=&chineseCodes=&pageIndex=1&categoryId=1000000338&
	siloId=2013000100000000001&thirdCategories=%E4%BC%91%E9%97%B2%E9%9E%8B&key=1&sort=ASC*/}
{/*降序： http://www.mei.com/appapi/secondcategory/search/v3?brandNames=&chineseCodes=&pageIndex=1&categoryId=1000000338&
	siloId=2013000100000000001&thirdCategories=%E4%BC%91%E9%97%B2%E9%9E%8B&key=&sort=DESC*/}
{/*升序：http://www.mei.com/appapi/secondcategory/search/v3?brandNames=&chineseCodes=&pageIndex=1&categoryId=1000000338&
	siloId=2013000100000000001&thirdCategories=%E4%BC%91%E9%97%B2%E9%9E%8B&key=&sort=ASC*/}
