import React,{Component} from 'react'
import Header from './Home/Header'
import axios from 'axios'
import Content from './commons/Content'
class Home extends Component{

	render(){
		
		{/*http://www.mei.com/appapi/search/searchDefault/v3*/}
		return <div >
		<Header/>
			<Content/>
		</div>
	}
}
export default Home;