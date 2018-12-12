import React,{Component} from 'react'
import axios from 'axios'
import '../scss/page.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faAngleRight} from '@fortawesome/free-solid-svg-icons'
library.add(faUser,faAngleRight)

class Mine extends Component{
	constructor(){
		super();
		this.state={
			tap:[
				{name:"待付款"},
				{name:"待发货"},
				{name:"待收货"},
				{name:"待评价"},
				{name:"退款售后"}
			]
		}
	}

	render(){
		let {tap} = this.state
		{/*http://www.mei.com/appapi/search/searchDefault/v3*/}
		return <div className="mine">
			<div>
				<span><FontAwesomeIcon icon='user'/></span>
				<span>点击登录</span>
			</div>
			<div><p>查看全部订单 <i></i><FontAwesomeIcon icon='angle-right'/></p></div>
			<div>
				<ul>
				{tap.map((item,idx)=><li key={idx}>{item.name}</li>)}
				</ul>
			</div>
			<div></div>
		</div>
	}
}
export default Mine;