import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { ConfigProvider, Select, Space } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const { Option } = Select;

const UpdateProduct = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [photo, setPhoto] = useState("");
    const [id, setId] = useState("");
  
    //Get single product
    const getSingleProduct = async () => {
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/single-product/${params.slug}`);
            setName(data.product.name);
            setId(data.product._id);
            setDescription(data.product.description);
            setQuantity(data.product.quantity);
            setPrice(data.product.price);
            setCategory(data.product.category._id);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getSingleProduct();
        //eslint-disable-next-line
    }, [])

    //get all categories
    const getAllCategory = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      try {
        if (data?.success) {
          setCategories(data?.category);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong in getting category");
      }
    };
    useEffect(() => {
      getAllCategory();
    }, []);
  
    //Create Product
    const handleUpdate = async (e) => {
      e.preventDefault();
      try {
        const productData = new FormData();
        productData.append("name", name)
        productData.append("description", description)
        productData.append("price", price)
        productData.append("quantity", quantity)
        productData.append("category", category)
        photo && productData.append("photo", photo)
        const {data} = axios.put(`${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`, productData );
        if(data?.success) {
          toast.error(data?.message)
        }
        else{
          setTimeout(() => {
            toast.success("Product Updated Successfully")
            
          }, 400);
        }
      } catch (error) {
        console.log(error)
        toast.error("Something went wrong")
      }
    }

    //Delete product
    const handleDelete = async () => {
        try {
            let answer = window.prompt("Are you sure want to delete this product ?");
            if(!answer) return;
            const {data} = await axios.delete(`${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`);
            toast.success("Product deleted successfully");
            navigate('/dashboard/admin/products');
        } catch (error) {
            console.log(error);
            toast.error("Something wrong in deleting product")
        }
    }

  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Product</h1>
            <div className="m-1 w-75">
            <ConfigProvider
                theme={{
                  token: {
                    colorBgBase: "transparent",
                    lineWidth: 1,
                    // optionSelectedBg: "transparent",
                    // optionActiveBg: "transparent",
                    // optionSelectedColor:"rgba(0, 0, 0, 0.88)"
                  },
                }}
              >
                <Space>
                  <Select
                    placeholder="Select a category"
                    size="large"
                    showSearch
                    className="from-select mb-3 w-100"
                    onChange={(value) => {
                      setCategory(value);
                    }}
                  >
                    {categories?.map((c) => (
                      <Option key={c._id} value={c._id}>
                        {c.name}
                      </Option>
                    ))}
                  </Select>
                </Space>
              </ConfigProvider>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => {
                      setPhoto(e.target.files[0]);
                    }}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="Product Photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                    <div className="text-center">
                      <img
                        src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${id}`}
                        alt="Product Photo"
                        height={"200px"}
                        className="img img-responsive"
                      />
                    </div>
                  )}
              </div>
              <div className="mb-3">
                <input type="text" value={name} placeholder="Write a product name" className="form-control" onChange={(e) => setName(e.target.value)}/>
              </div>
              <div className="mb-3">
                <textarea type="text" value={description} placeholder="Write a product description" className="form-control" onChange={(e) => setDescription(e.target.value)}/>
              </div>
              <div className="mb-3">
                <input type="text" value={price} placeholder="Write a product price" className="form-control" onChange={(e) => setPrice(e.target.value)}/>
              </div>
              <div className="mb-3">
                <input type="number" value={quantity} placeholder="Write a product Quantity" className="form-control" onChange={(e) => setQuantity(e.target.value)}/>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleUpdate}>Update Product</button>
              </div>
              <div className="mb-3">
                <button className="btn btn-danger" onClick={handleDelete}>Delete Product</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default UpdateProduct