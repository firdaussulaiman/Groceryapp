import React from 'react'
import { Link } from 'react-router-dom';
import Header from './component/Header';
import ProductList from './ProductList';

const Home = () => {
  return (
	<div>
		<Link>
			<Header />
			<ProductList />
		</Link>
	  
	</div>
  )
}

export default Home
