import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import toast from "react-hot-toast";
import { useCart } from "../context/cart";

const ProductDetails = () => {
  const [cart, setCart] = useCart();
  const [product, setProduct] = useState();
  const [similarProduct, setSimilarProduct] = useState();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  //Get product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/single-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  //Similar Products
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/similar-product/${pid}/${cid}`
      );
      setSimilarProduct(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="row container mx-2 mt-5">
        <div className="row mb-2 p-3 card flex-row neon__card">
          <div className="col-md-6">
            <img
              className=""
              src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product?._id}`}
              alt={product?.name}
              height={"300px"}
              width={"300px"}
            />
          </div>
          <div className="col-md-6">
            <h1 className="text-center">Product Details</h1>
            <h6>Name : {product?.name}</h6>
            <h6>Description : {product?.description}</h6>
            <h6>Price : {product?.price}</h6>
            <h6>Category : {product?.category.name}</h6>
            {/* <h6>Shipping : {product?.shipping}</h6> */}
            <div className=""></div>
            <button
                title="Add to cart"
              className="btn btn-secondary neon__button w-100 cb"
              onClick={() => {
                setCart([...cart, product]);
                localStorage.setItem("cart", JSON.stringify([...cart]));
                toast.success("Successfully added to cart");
              }}
            >
              <FiShoppingCart
                style={{ marginRight: "2px", marginTop: "4px" }}
              />
            </button>
          </div>
        </div>
      </div>
      <div className="row container">
        <h6>Similar Product</h6>
        {similarProduct?.length < 1 && (
          <p className="text-center">No Similar Product Found</p>
        )}
        {similarProduct?.map((p) => (
          <div
            className="card neon__card"
            style={{ width: "18rem" }}
            key={p._id}
          >
            <img
              className=""
              src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
              alt={p.name}
            />
            <div className="card-body">
              <h6 className="card-title neon__title">{p.name}</h6>
              <p className="neon__description">
                {p.description.substring(0, 30)}...
              </p>
              <p className="card-text neon__description">$ {p.price}</p>
              <div className="butbox">
                <button
                  className="btn btn-primary ms-1 neon__button b"
                  onClick={() => navigate(`/product/${p.slug}`)}
                >
                  More Details
                </button>
                <button
                  className="btn btn-secondary ms-1 neon__button cb"
                  onClick={() => {
                    setCart([...cart, p]);
                    localStorage.setItem("cart", JSON.stringify([...cart]));
                    toast.success("Successfully added to cart");
                  }}
                >
                  <FiShoppingCart
                    style={{ marginRight: "2px", marginTop: "4px" }}
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default ProductDetails;
