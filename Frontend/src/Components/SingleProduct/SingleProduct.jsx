import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function SingleProduct() {
  const [singleProductDetail, setSingleProductDetail] = useState(null);
  const [error, setError] = useState("");
  const { product_id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8900/getSingleProduct/${product_id}`)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Unable to load product");
        }
        return data;
      })
      .then((data) => {
        if (Array.isArray(data)) {
          const filteredArray = data.filter(
            (item) => String(item.product_id) === String(product_id),
          );
          setSingleProductDetail(filteredArray[0] || null);
        } else {
          setSingleProductDetail(data);
        }
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setError(err.message);
      });
  }, [product_id]);

  // SAFE DESTRUCTURING: If singleProductDetail is null, fall back to an empty object {}
  // This keeps your variables safe from crashing on the initial render!
  const {
    product_url: id,
    product_name: title,
    product_img: img,
    product_brief_description: Brief,
    starting_price: StartPrice,
    price_range: PriceRange,
    product_description: details,
  } = singleProductDetail || {};

  // CLEAN TERNARY OPERATOR
  return error ? (
    <p role="alert" className="title-wraper text-center top-100">{error}</p>
  ) : singleProductDetail ? (
    <div className="internal-page-wrapper top-100">
      <div className="container">
        <div key={id} className="bottom-100">
          <div className="row justify-content-center text-center bottom-50">
            <div className="col-12">
              <br />
              <br />
              <br />
              <div className="title-wraper bold">{title}</div>
              <div className="brief-description">{Brief}</div>
              <br />
            </div>
          </div>
          <div className="row justify-content-center text-center product-holder h-100">
            <div className="col-sm-12 col-md-6 my-auto">
              <div className="starting-price">{`Starting at ${StartPrice}`}</div>
              <div className="monthly-price">{PriceRange}</div>
              <div className="product-details">{details}</div>
            </div>
            <div className="col-sm-12 col-md-6">
              <div className="product-image">
                <img src={img} alt={title || "Product"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <>
      <br />
      <br />
      <br />
      <h2 className="title-wraper text-center">Product not found</h2>
    </>
  );
}

export default SingleProduct;
