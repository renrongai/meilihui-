import React,{Component} from 'react'
import axios from 'axios'
import Select from './commons/Select'
import '../scss/page.scss'
class Find extends Component{
	constructor(){
		super();
		this.state={
			tabs:[
			{
				name:"精选大牌",
				cont:["GUCCI","CANADA DOOSE","SCHOTT DAVIS","PARADA","JIMMY CHOO","SK-II","LAMER"]}	,
			{
				name:"品牌"
			},
			{	
				name:"女士"
			},
			{
				name:"男士"	
			},
			{
				name:"美妆"				
			},
			{
				name:"家居"
			},
			{
				name:"婴童"
			}],
			index:0
		}
//		this.handlerClick=this.handlerClick.bind(this);
	}
	handlerClick(idx){
		console.log(idx)
		this.setState({
			index:idx
		})
	}
	render(){
		let {tabs,index} = this.state
		{/*http://www.mei.com/appapi/search/searchDefault/v3*/}
		return <div className="find">
		<div className="whitespace"></div>
			<Select/>
			<div>
				<ul>
					{tabs.map((item,idx)=><li className={index==idx?'active':null} key={idx} onClick={this.handlerClick.bind(this,idx)}>
							<a>{item.name}</a>
						</li>)}
				</ul>
				<div>
					{}
				</div>
			</div>
		</div>
	}
}
export default Find;