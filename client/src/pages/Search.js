import React from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/search";
import { FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../context/cart";

const Search = () => {
  const [values, setValues] = useSearch();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  return (
    <Layout title={"Search Results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {`Found ${values?.results.length} results for "${values.keyword}"`}
          </h6>
          <div className='d-flex flex-wrap mt-4'>
          {values?.results.map((p) => (
            <div className="card neon__card" style={{ width: "18rem" }} key={p._id}>
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
        </div>
      </div>
    </Layout>
  );
};

export default Search;
