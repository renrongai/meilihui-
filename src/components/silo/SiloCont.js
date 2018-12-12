import React,{Component} from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom';
import '../../scss/content.scss'

class SiloCont extends Component{
	constructor(){
		super();
		this.state={
			goodslist:[],
		
		}
		this.handlerScroll=this.handlerScroll.bind(this)
	}
	componentWillMount(){
		let {location} = this.props;
		let categoryid =location.pathname.split('/')[2];
		this.getList(categoryid);
	}
	componentWillReceiveProps(nextProps){
//      console.log("nextProps:",nextProps)
        let categoryid = nextProps.location.pathname.split('/')[2]
        this.getList(categoryid);
    }
	getList(categoryid){
		axios.get('mlhapi/appapi/silo/eventForH5',{params:{
			categoryId:categoryid,
			pageIndex:1
		}})
		.then((res)=>{
			let datalist = res.data.eventList	
			this.setState({
				goodslist:datalist
			})
		})
	}
	handlerClick(goods){
		let {history} = this.props;
//		console.log(history);
		 history.push({
            pathname:'/goods/'+goods.categoryId,
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
		let {goodslist}=this.state
		console.log(goodslist);
		return <div className="contlist">
			<ul>
				{goodslist.map((item)=>{
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
	}
}
SiloCont = withRouter(SiloCont);
export default SiloCont;
{/*http://www.mei.com/appapi/event/product/v3?pageIndex=1&categoryId=2121005100000001767&key=&sort=&
	timestamp=1544010547973&summary=dfe95e7ed79ffdd9149228629109a357&platform_code=H5*/}
{/*http://www.mei.com/appapi/event/product/v3?pageIndex=1&categoryId=2041204190000005808&key=&sort=&
	timestamp=1544010219435&summary=9bfcbd2e6422e21cd4902c52befd0c2c&platform_code=H5*/}
