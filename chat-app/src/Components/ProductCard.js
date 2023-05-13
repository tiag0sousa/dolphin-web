import React from 'react';
import '../css/productCard.css';

function ProductCard({ product }) {

  let gender = product.gender.toLowerCase()
  let brand = product.brand.name.toLowerCase().replace(/ /g, '-');
  let description = product.shortDescription.toLowerCase().replace(/ /g, '-');

  const url = `https://www.farfetch.com/shopping/${gender}/${brand}-${description}-item-${product.id}.aspx`

  return (
      <div className="product-card">
        <a href={url} target="_blank" rel="noopener noreferrer">
          <img src={product.images[0].url} alt={product.name} />
          <b>{product.brand.name}</b>
          <p>{product.shortDescription}</p>
          <p>${product.price}</p>
        </a>
      </div>
  );
}

export default ProductCard;
