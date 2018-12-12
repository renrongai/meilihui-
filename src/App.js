import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Route,NavLink,Redirect,Switch,withRouter} from 'react-router-dom';
import { TabBar } from 'antd-mobile';
//引入ant-design-mobile的样式
import 'antd-mobile/dist/antd-mobile.css';
import './scss/common.scss'

import Home from './components/Home'
import Content from './components/commons/Content'
import Header from './components/Home/Header'
import NavList from './components/Home/NavList'
import List from './components/List';
import Cart from './components/Cart';
import Mine from './components/Mine';
import Silo from './components/Silo';
import Goods from './components/Home/Goods'
import SiloGoods from './components/silo/SiloGoods'
import Info from './components/commons/Info'
// fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faHome,
    faListUl,
    faShoppingCart,
    faAssistiveListeningSystems,
		faUser} from '@fortawesome/free-solid-svg-icons'

library.add(
    faHome,
    faListUl,
    faShoppingCart,
    faAssistiveListeningSystems,
    faUser
)

class App extends Component {
	constructor(){
    super();
    this.state = {
        tabs:[
            {
                title:'首页',
                path:'/home',
                icon:'home'
            },
            {
                title:'列表',
                path:'/list',
                icon:'list-ul'
            },
            {
                title:'购物车',
                path:'/cart',
                icon:'shopping-cart'
            },
            {
                title:'我的',
                path:'/my',
                icon:'user'
            }
        ],
        currentTab:0
    }
  }

  handlerClick(idx,path){
  	console.log(path);
      this.setState({
          currentTab:idx
      });

      //编程式导航
      //获取history的方式
      // * 通过Route渲染App
      // * 利用withRouter高阶组件实现
      this.props.history.push(path);
  }

  componentWillMount(){
      //获取hash值
      let hash = window.location.hash.slice(1);//#list
//	  console.log(hash);
      //找出对应索引值
      let currentTab = 0
      this.state.tabs.some((item,idx)=>{
          currentTab = idx;
          return item.path === hash
      });

      this.setState({
          currentTab
      });

      console.log('app props:',this.props)
  }
  render() {

    return (
      <div className="container">
        <div className="content">
	        <Switch>
	            <Route path="/home" component={Home} />
	            <Route path="/list" component={List} />
	            <Route path="/info/:id" component={Info}/>
	            <Route path="/goods/:id" component={Goods}/>
	            <Route path="/silogoods/:id" component={SiloGoods}/>
	            
	            <Route path="/silo/index//" component={Home}/>
	            <Route path="/silo/:id" component={Silo}/>
	            
	            <Route path="/cart" component={Cart} />
	            <Route path="/my" component={Mine} />
	            <Redirect from="/" to="/home" exact/>
	            
	        </Switch>
        </div>
        <TabBar
            tintColor="#000"
            noRenderContent={true}
            >
            {
                this.state.tabs.map((tab,idx)=>{
                return <TabBar.Item
                title={tab.title}
                key={tab.path}
                icon={<FontAwesomeIcon icon={tab.icon}/>}
                selectedIcon={<FontAwesomeIcon icon={tab.icon}/>}
                selected={this.state.currentTab === idx}
                onPress={this.handlerClick.bind(this,idx,tab.path)}
                badge={tab.path == '/cart' ? this.props.cartQty : null}
                
                >
                {tab.title}
                </TabBar.Item>
                })
            }
            
        </TabBar>
      </div>
    );
  }
}
App = withRouter(App);
export default App;
