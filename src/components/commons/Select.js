import React,{Component} from 'react'
import axios from 'axios'
import '../../scss/header.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch} from '@fortawesome/free-solid-svg-icons'

library.add(faSearch)

class Select extends Component{
	constructor(){
		super();
		this.state={
			selWords:[]
		}
	}
	componentWillMount(){
		axios.get('/mlhapi/appapi/search/searchDefault/v3',{
		}).then(res=>{
			let data = res.data;
			this.setState({
				selWords:data.words,
			});
		});
    }
	
	render(){
		let data = this.props.data
		return <div className="select">
			<a  className={`${data>100?"selChange":null}`}>
				<span>{<FontAwesomeIcon icon="search"/>} </span>
				{this.state.selWords}
			</a>
		</div>
	}
}
export default Select;