import React,{Component} from 'react'
import '../../scss/header.scss'
import { SearchBar, Button, WhiteSpace, WingBlank } from 'antd-mobile';
import axios from 'axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import Select from '../commons/Select.js'
import NavList from './NavList'
import Content from '../commons/Content'

library.add(faShoppingCart )


class Header extends Component{
	constructor(){
		super();
		
		this.state={
			tabs:[
				{
					title:"登录",
					path:"/login"
				},
				{
					title:"",
					path:"/cart",
					icon:"shopping-cart"
				}
			],
//			scrollTop:0
		}
		this.handleScroll=this.handleScroll.bind(this)
	}
	componentDidMount(){
		document.addEventListener('scroll',this.handleScroll)
//		regScroll(this.handler.bind(this));
	}
//	_handleScroll(scrollTop){
//		console.log(scrollTop)
//	}
//	handleScroll(event){
//		console.log(event);
//		let scrollTop = event.srcElement.body.scrollTop;
//		this._handleScroll(scrollTop);
//	}
	componentWillUnmount() {
		window.onscroll='';
// 		 window.removeEventListener('scroll', this.handleScroll);  //移除事件监听
 	 }
//	function regScroll(myHandler){
//		if(window.onscroll===null){
//			window.onscroll=myHandler
//		}
//		else if (typeof window.onscroll === 'function'){
//			var oldHandler = window.onscroll;
//			window.onscroll = function (){
//				myHandler();
//				oldHandler();
//			}
//		}
//	}
	handleScroll() {
		console.log(this);
		console.log(1111);
     	let top = document.documentElement.scrollTop;// 滚动条距离页面上边的距离
     	console.log(top);
     	if(top>100){
     		this.setState({
     			scrollTop:top
     		})
     	}
     	else{
     		this.setState({
     			scrollTop:0
     		})
     	}
   	}
	render(){
		let {tabs,scrollTop}=this.state;
//		console.log(scrollTop);
		return (
			<div className={`header ${scrollTop>100?"change":null}`}> 
			    <div className="header-top">
			    	<span className="login">登录</span>
					<div className="Home">
					  	<Select  data={scrollTop>100?scrollTop:null}  />
				   </div>
					<span className="icon">
					{/*{<FontAwesomeIcon icon="shopping-cart"/>}*/}
					</span>
			    </div>
				<NavList data={scrollTop>100?scrollTop:null}/>
			</div>)
	}
}

export default Header;
