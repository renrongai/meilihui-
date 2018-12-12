import React,{Component} from 'react'
import axios from 'axios'
import '../../scss/content.scss'
import ContList from './ContList'

class Content extends Component{
	constructor(){
		super();
		this.state={
			banner:[]
		}
	}
	componentWillMount(){
		axios.get('http://www.mei.com/appapi/home/mktBannerApp/v3?silo_id=2013000100000000008&platform_code=PLATEFORM_H5')
		.then((res)=>{
			let data = res.data.banners[0]
			this.setState({
				banner:data
			})
		})
		
	}
	render(){
		let {banner} = this.state
		console.log(banner)
		{/*http://www.mei.com/appapi/search/searchDefault/v3*/}
		return <div className="content">
			<img src={banner.main_image}/>
			<div className="info">
				<h2>{banner.main_title}</h2>
				<p>{banner.sub_title}</p>
			</div>
			<img  className="tuijian" src={require('../../scss/img/tuijian1.jpg')}/> 
			<ContList/>
		</div>
	}
}
export default Content;