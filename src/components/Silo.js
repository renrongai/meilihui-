import React,{Component} from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom';
import '../scss/content.scss'
import SiloCont from './silo/SiloCont'
import Header from './Home/Header'
class Silo extends Component{
	constructor(){
		super();
		this.state={
			banner:[],
			typelist:[],	
		}
	}
	
	componentWillMount(){
		let hash = window.location.hash.split('/')[3];
		console.log(hash);
		console.log(window.location.hash.split('/'));
		let ids = window.location.hash.split('/')[4]
		
//		console.log(this.props);
		if(hash=="2013000100000000011"){
			console.log("if:"+hash);
			hash="2013000100000000001"
			this.banner(hash)
			hash="2013000100000000011"
			this.getType(hash,ids)
		}
		else{
			console.log("else:"+hash);
			this.banner(hash);
			this.getType(hash,ids)
        	
		}
		
		{/*列表：http://www.mei.com/appapi/silo/eventForH5?categoryId=crossborder&pageIndex=1&timestamp=1543974569295&summary=1af7e6799e6bbd6d7171f24d8d37beb2&platform_code=H5*/}
		{/*http://www.mei.com/appapi/silo/eventForH5?categoryId=women&pageIndex=1&timestamp=1543974858416&summary=74edece78a808ffd0bb5be904f85cb26&platform_code=H5*/}
		{/*分类：http://www.mei.com/appapi/cms/cmsDetail/v3?silo=2013000100000000011&ids=2041000100000000206&timestamp=1543974569397&summary=604440e83660e7ffddb6586794f85fcc&platform_code=H5*/}
		{/*http://www.mei.com/appapi/cms/cmsDetail/v3?silo=2013000100000000001&ids=2120000100000000276&timestamp=1543974858544&summary=dfb1f2c0f587203e37ac6afd9f94d6aa&platform_code=H5*/}
	}
	componentWillReceiveProps(nextProps){
        console.log("nextProps:",nextProps)
        let hash = nextProps.location.pathname.split('/')[3];
       	console.log(hash)
		let ids = nextProps.location.pathname.split('/')[4]
        if(hash=="2013000100000000011"){
			hash="2013000100000000001"
			this.banner(hash)
			hash="2013000100000000011"
			this.getType(hash,ids)
		}
		else{
			this.banner(hash);
			this.getType(hash,ids) // 分类 	 
		}
    }
	banner(hash){
		axios.get('http://www.mei.com/appapi/home/mktBannerApp/v3',{params:{
			silo_id:hash,
			platform_code:"PLATEFORM_H5"
		}})
		.then((res)=>{
			let data = res.data.banners[0]
			
			this.setState({
				banner:data,	
			})
		})
	}

	getType(hash,ids){
		axios.get('http://www.mei.com/appapi/cms/cmsDetail/v3',{params:{
			silo:hash,
			ids:ids
		}
		})
		.then((res)=>{
			let data = res.data.resultList[0].data;
			console.log(res.data.resultList[0])
			this.setState({
				typelist:data
			})
		})
	}
	handlerClick(type){
		let {history} = this.props;
		console.log(type);
		 history.push({
            pathname:'/silogoods/'+type.categoryTwoId+"/"+type.siloId+"/"+type.categroyTwoName+"/"+type.categoryOneId,
            
        });
	}
	render(){
		let {banner,typelist} = this.state
			console.log(typelist);
		return <div className="silo">
			<Header/>
			<img src={banner.main_image}/>
			<div className="info">
				<h2>{banner.main_title}</h2>
				<p>{banner.sub_title}</p>
			</div>
			<div className="type" >
				{typelist.map((type,idx)=><div key={idx} onClick={this.handlerClick.bind(this,type)}>
						<img  src={type.categoryImgStr}/>
					</div>
				)}
				
			</div>
			<SiloCont/>
		</div>
	}
}
Silo = withRouter(Silo)
export default Silo;