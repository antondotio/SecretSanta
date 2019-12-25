import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './pageNotFound.css';

class PageNotFound extends Component {
	render() {
		return (
			<div className='PageNotFound'>
				<a className='NotFoundHeader'>Page Not Found</a>
				<p>Sorry, there is nothing to see here.</p>
				<p><Link to="/home">Back to Home!</Link></p>
			</div>
		);
	}
}

export default PageNotFound;