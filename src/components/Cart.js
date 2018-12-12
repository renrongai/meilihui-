import React,{Component} from 'react'
import axios from 'axios'
import '../scss/page.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft} from '@fortawesome/free-solid-svg-icons'
library.add(faAngleLeft )


class Cart extends Component{

	render(){
		
		{/*http://www.mei.com/appapi/search/searchDefault/v3*/}
		return <div className="cart">
			<div className="c_header">
				<i><FontAwesomeIcon icon='angle-left'/></i>我的购物车
			</div>
			<div className="main">
				<p className="num">订单数量不能超过10个</p>
				<div className="tanhao">!</div>
				<p>亲, 你的购物车里没有东西</p>
				<div className="tap">
					<span>返回首页</span><span>全部商品</span>
				</div>
			</div>
			<div className="foot">
				 <div>
				 	<i></i><a>全选</a>
				 </div>
				<span>立即下单</span>
			</div>
		</div>
	}
}
export default Cart;