import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function Iphone() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    fetch("http://localhost:8900/getAllProducts")
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Unable to load products");
        }
        return data;
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((fetchError) => {
        console.error("Error fetching products:", fetchError);
        setError(fetchError.message);
      });
  }, []);
  let order = 1;
  return (
    <div className="internal-page-wrapper top-100">
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-12">
            <br />
            <br />
            <br />
            <div className="title-wraper bold">Iphone</div>
            <div className="brief-description">The best for the brightest</div>
            <br />
          </div>
        </div>
        {error && <p role="alert">{error}</p>}
        {products?.map((product) => {
          let product_id = product.product_id;
          let title = product.product_name;
          let img = product.product_img;
          let Brief = product.product_brief_description;
          let StartPrice = product.starting_price;
          let PriceRange = product.price_range;
          
          let order1 = 1;
          let order2 = 2;
          if (order !== 1) {
            order1 = 2;
            order2 = 1;
            order--;
          } else {
            order++;
          }
          return (
            <div
              key={product_id}
              className="row justify-content-center text-center product-holder h-100 top-100 bottom-100"
            >
              <div className={`col-sm-12 col-md-6 my-auto order-${order1}`}>
                <div className="product-title">{title}</div>
                <div className="product-brief">{Brief}</div>
                <div className="starting-price">{`Starting at ${StartPrice}`}</div>
                <div className="monthly-price">{PriceRange}</div>
                <div className="link-wrapper">
                  <ul>
                    <li>
                      <Link to={`/iphone/${product_id}`}>Learn more</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className={`col-sm-12 col-md-6 order-${order2}`}>
                <div className="product-image">
                  <img src={img} alt="" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Iphone;
