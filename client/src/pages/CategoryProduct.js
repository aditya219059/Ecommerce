import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FiShoppingCart } from "react-icons/fi";
import toast from "react-hot-toast";
import { useCart } from "../context/cart";

const CategoryProduct = () => {
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (params?.slug) getCategoryProduct();
  }, [params?.slug]);

  //Get category product
  const getCategoryProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/category-product/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="container">
        <h5 className="text-center">{category?.name}</h5>
        <h6 className="text-center">{products?.length} results found</h6>
        <div className="d-flex flex-wrap neon__container">
          {products?.map((p) => (
            <div
              className="card neon__card"
              style={{ width: "16rem" }}
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
                title="Add to cart"
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
        {/* <div className='m-2 p-3'>
            {products && products.length < total && (
              <button className='btn btn-warning' onClick={(e) => {
                e.preventDefault();
                setPage(page + 1);
              }}>
                {loading ? "loading..." : "Load more"}
              </button>
            )}
          </div> */}
      </div>
    </Layout>
  );
};

export default CategoryProduct;
