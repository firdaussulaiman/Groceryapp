import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addCartItem } from '../Redux/productSlide';
import Zoom from 'react-image-zoom';

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const serverUrl = process.env.REACT_APP_SERVER_DOMAIN || 'http://localhost:5000';
    const apiUrl = `${serverUrl}/products/${productId}`;

    axios
      .get(apiUrl)
      .then((response) => {
        console.log('Server Response:', response.data);
        setProduct(response.data.product);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching product details:', error);
        setLoading(false);
      });
  }, [productId]);

  if (loading) {
    return <p>Loading product details...</p>;
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  const { image, name, price, category, spec, stock } = product;

  const handleAddCartProduct = () => {
    dispatch(
      addCartItem({
        _id: productId,
        name: name,
        price: price,
        category: category,
        image: image,
      })
    );
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex">
        <div className="w-1/2 pr-4 relative">
          {/* Large image */}
          <Zoom img={image} zoomScale={3} width={400} height={400} />
        </div>
        <div className="w-1/2 ml-4 relative">
          {/* Product details */}
          <div className="max-w-[400px] bg-white hover:shadow-lg drop-shadow-lg py-4 px-8 cursor-pointer flex flex-col items-center relative">
            <h3 className="font-semibold text-slate-600 capitalize text-lg mt-2">
              {name}
            </h3>
            {/* Small image */}
            <div className="h-[200px] w-[200px] mb-2">
              <img src={image} alt={name} className="h-full w-full object-cover" />
            </div>
            <p className="text-slate-500 font-medium">{category}</p>
            <p className="font-bold">
              <span className="text-red-500">$</span>
              <span>{price}</span>
            </p>
            <p className="text-gray-600">Spec: {spec}</p>
            <p className="text-gray-600">Stock: {stock}</p>
            <button
              className="bg-yellow-500 py-1 mt-2 w-full"
              onClick={handleAddCartProduct}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;