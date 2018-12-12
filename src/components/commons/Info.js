import React,{Component} from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom';
import { NavBar, Icon,Carousel, WingBlank} from 'antd-mobile';

import '../../scss/goods.scss'
import GoodsList from '../commons/GoodsList'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortUp,faSortDown} from '@fortawesome/free-solid-svg-icons'
library.add(faSortUp,faSortDown )

class Info extends Component{
	constructor(){
		super();
		this.state={
			info:[],   // 商品详情
			zhekou:'',
			haiwai:'',
			service_labels:[],  // 服务 
			size:[],   // 尺码
			bigImgUrl:[],   // 图片
			name:[],    // 商品属性名
			value:[],   // 商品属性值
			banner:[],
			hot:[],
			message:'',
			pinlun:[]   // 评论
		}
		
	}
	componentWillMount(){
		let categoryId =  window.location.hash.split('/')[2]
		console.log("categoryId:"+categoryId);
		let hash = window.location.hash.split('/')[3];
		console.log("hash:"+hash);
		{/*http://www.mei.com/appapi/product/detail/v3?categoryId=2121005100000001775&productId=2042204299000706993*/}
		axios.get('http://www.mei.com/appapi/product/detail/v3',{params:{
			categoryId:categoryId,
			productId:hash
		}})
		.then((res)=>{
			console.log(res.data.infos);
			let infos = res.data.infos
		    let label_title = infos.service_labels.map((item)=>item.label_title)
		    let size = infos.size.map((item)=>item.sizeValue)
		    let bigImgUrl = infos.description.product_img1.map((img)=>img.bigImgUrl)
		    let name = infos.description.attributesList.map((name)=>name.name) // 商品详情
		    let value = infos.description.attributesList.map((val)=>val.value)
		    let share = infos.share.imgUrl
		    let Banner =[];
		    let message = infos.description.message;
		    let haiwai = ''
		    if(infos.newTagList[1]==undefined){
		    }else{
		    	haiwai=infos.newTagList[1].tag
		    	this.setState({
		    		haiwai:haiwai
		    	})
		    }
		    if(infos.images==undefined){
		    	for(var i=0;i<4;i++){
			    	Banner.push(share)
			    }
		    }else{
		    	Banner = infos.images.map(img=>img.smallImgUrl)
		    }
		    let pinlun = infos.productReviews
		    console.log(pinlun);
			this.setState({
				info:infos,
				zhekou:infos.newTagList[0].tag,
				message:message,
				service_labels:label_title,
				size:size,
				bigImgUrl:bigImgUrl,
				name:name,
				value:value,
				banner:Banner,
				pinlun:pinlun
			})
		})
		axios.get('http://www.mei.com/appapi/product/hot/v3',{
			params:{
				categoryId:categoryId,
				productId:hash,
				platform_code:"H5"
			}
		})
		.then((res)=>{
			console.log(res);
			let hot = res.data.categoryList
			this.setState({
				hot:hot
			})
		})
	}
	componentDidMount() {
    // simulate img loading
    setTimeout(() => {
      this.setState({
        data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
      });
    }, 100);
  }
	
	handClick(){
		this.props.history.goBack()
	}
	
	render(){
		let {info,zhekou,haiwai,service_labels,size,bigImgUrl,name,value,banner,hot,message,pinlun} = this.state
	
		console.log(banner)
		return <div id="g_info">
			
			<NavBar
			      mode="light"
			      icon={<Icon type="left" onClick={this.handClick.bind(this)}/>}
			      onLeftClick={() => console.log('onLeftClick')}
			      rightContent={[
			        <Icon key="1" type="ellipsis" />,
			      ]}
			    ><p className="titleP">{info.brand}</p><span className="namePrice">￥{info.price}</span></NavBar>
		   
			    <div className="container">
			    <div>
			    	<WingBlank>
			        <Carousel
			          autoplay={true}
			          infinite
			          beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
			          afterChange={index => console.log('slide to', index)}
			        >
			          {banner.map(val => (
			            <a
			              key={val}
			              href="http://www.alipay.com"
			              style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
			            >
			              <img
			                src={val}
			                alt="为森么"
			                style={{ width: '100%', verticalAlign: 'top' }}
			                onLoad={() => {
			                  // fire window resize event to change height
			                  window.dispatchEvent(new Event('resize'));
			                  this.setState({ imgHeight: 'auto' });
			                }}
			              />
			            </a>
			          ))}
			        </Carousel>
			      </WingBlank>
			    </div>
			    <p className="name">{info.name}</p>
			    <del>￥{info.marketPrice}</del>
			    <p className="g_price"> <strong>￥{info.price} </strong> <a>{zhekou}</a> <a>{haiwai}</a></p>
			    <p className="g_send"><strong>{info.warehouse_name}</strong> <span>{info.deliver_date}</span></p>
			    <div className="g_server">
			    	<div className="serverBox">
			    		<span>服务</span>
				    	<div>
				    		<ul >
						    	{service_labels.map((item,idx)=>(
						    		<li key={idx}>{item}</li>
						    	))}
						    	
						    </ul>
				    	</div>
			    	</div>
				    <div className="serverBox" id="server">
				    	<span>尺码</span>
					    <div>
				    		<ul>
					    	
						    	{size.map((item,idx)=>(
						    		<li key={idx}>{item}</li>
						    	))}
						    	
						    </ul>
				    	</div>
				    </div>
				   
			    </div>
			    <div className="g_param">
			    	<h2>商品参数</h2>
				    <ul className="paramName">
				    	{name.map((item,idx)=>(
				    		<li key={idx}>{item}</li>
				    	))}
				    </ul>
				    <ul>
				    	{value.map((item,idx)=>(
				    		<li key={idx}>{item}</li>
				    	))}
			    	</ul>
			    </div>
			  
			    <div>
			    	{bigImgUrl.map((item,idx)=>(
			    		<img key={idx} src={item} / >
			    	))}
			    </div>
			    
			    <div className="promotion">
			    	<p>{message}</p>
			    	<h2>退货提示</h2>
			    	<p>{info.returnNote}</p>
			    </div>
			    <div className="pinpai">
			    	
			    		<h2>{info.brand}<span>品牌主页</span></h2>
			    	{info.brandImg==''?'':<img src={info.brandImg}/>}
			    	<p>{info.brand_story}</p>
			    </div>
			    <div className="postSellUrls">{info.postSellUrls==''?'':<img src={info.postSellUrls}/>}</div>
			    <div className="postSellUrl">{info.postSellUrl==''?'':<img src={info.postSellUrl}/>}</div>
			    <div className="pinpai">
			    	
			    	<h2>用户评论({pinlun.totalCount})<span>查看全部</span></h2>
			    	
			    
			    </div>
			   <div className="goodsitem">
			   		{hot==''?'':<h2>大家都在看</h2>}   	
					<ul>
			     		{
			     		hot.map((product,idx)=>{
//			     			return <li key={product.productId}> hhh{product.productName}</li>
			     			return <li key={product.productId}>
				     				<img src={product.imgUrl}/>
				     				<h4>{product.brand_name}</h4>
				     				<p>{product.product_name}</p>
				     				<span>￥{product.price}</span><del>￥{product.market_price}</del> <span>{product.discount}折</span>
			     				</li>      
			     			})
			     		
			     		}
	    		 	</ul>  
			  	 </div>
			</div>
			<div className="buyNow">
				<a><i></i>购物袋</a>
				<span>加入购物车</span>
				<span>立即购买</span>
			</div>
		</div>
	}
}
Info = withRouter(Info)
export default Info
{/* 大家都在看 http://www.mei.com/appapi/product/hot/v3?categoryId=2121005100000001775&
	productId=2042204299000706993&platform_code=H5*/}
{/*http://www.mei.com/appapi/product/detail/v3?
	categoryId=2121005100000001775&productId=2041204199000761693*/}
{/*http://www.mei.com/appapi/product/hot/v3?
	categoryId=2040204090000005893&productId=2041204199000743477*/}
