import React,{Component} from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom';
import '../../scss/content.scss'

class ContList extends Component{
	constructor(){
		super();
		this.state={
			goodslist1:[],
			goodslist2:[],
			
		}
		this.handlerScroll=this.handlerScroll.bind(this)
	}
	componentWillMount(){
		axios.get('mlhapi/appapi/home/eventForH5?params=%7B%7D&timestamp=1543492928358&summary=53968cab57daafd9a0860534a9f9e0d7&platform_code=H5')
		.then((res)=>{
			
			let datalist = res.data.lists.map((item,idx)=>item.events)
//			console.log(datalist[0])
			this.setState({
				goodslist1:datalist[0],
				goodslist2:datalist[1]
			})
		})
	}
	handlerClick(goods){
		let {history} = this.props;
		console.log(history);
		 history.push({
            pathname:'/goods/'+goods.categoryId+"/"+goods.chineseName,
        });
	}
	componentDidMount(){
		window.addEventListener('scroll',this.handlerScroll())
	}
	handlerScroll(){
//		console.log("滚动条事件")
		let top = document.body.scrollTop;// 滚动条距离页面上边的距离
//   	console.log(top);
	}
	render(){
		let {goodslist1,goodslist2}=this.state
		return <div className="contlist">
				<div className="news">
					<h2>今日上新</h2>
					<ul>
						{goodslist1.map((item)=>{
							return <li key={item.categoryId} onClick={this.handlerClick.bind(this,item)}>
								<img src={item.imageUrl}/> 
								<div className="event">
									<div className="name">
										<p>{item.englishName}</p>
										<p>{item.chineseName}</p>
										<p>{item.discountText}</p>
									</div>
								</div>
							</li>
						})}
					</ul>
				</div>
				<div className="hot">
					<h2>热卖品牌</h2>
					<ul>
						{goodslist2.map((item,idx)=>{
							return <li key={item.categoryId} onClick={this.handlerClick.bind(this,item)}>
								<img src={item.imageUrl}/> 
								<div className="event">
									<div className="name">
										<p>{item.englishName}</p>
										<p>{item.chineseName}</p>
										<p>{item.discountText}</p>
									</div>
								</div>
							</li>
						})}
					</ul>
				</div>
		</div>
	}
}
ContList = withRouter(ContList);
export default ContList;