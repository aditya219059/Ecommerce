import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import CategoryForm from "../../components/Form/CategoryForm.js";
import { Modal } from 'antd';

const CreateCategory = () => {
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("")
  const [visible, setVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  //Create category form handle
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`, {name});
      if(data?.success) {
        toast.success(`'${name}' Category is created`);
        getAllCategory();
        setName("");
      }
      else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in creating category")
    }
  }


  //get all categories
  const getAllCategory = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
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


  //update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.put(`${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`, {name: updatedName})
      if(data.success) {
        toast.success(`${updatedName} is Updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      }
      else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong1111")
    }
  }

  //Delete category
  const handleDelete = async (cid) => {
    try {
      const {data} = await axios.delete(`${process.env.REACT_APP_API}/api/v1/category/delete-category/${cid}`)
      if(data.success) {
        toast.success(data.message);
        getAllCategory();
      }
      else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong1111")
    }
  }
  return (
    <Layout title={"Dashboard Create Category"}>
      <div className="">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
            <div className="p-3">
              <CategoryForm handleCreate={handleCreate} value={name} setValue={setName} />
            </div>
            <div className="w-75">
              <table className="table category-table">
                <thead>
                  <tr>
                    <td scope="col">Name</td>
                    <td scope="col">Action</td>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <>
                      <tr>
                        <td key={c._id}>{c.name}</td>
                        <td>
                          <button className="btn btn-primary ms-2" key={c._id} onClick={() => {setVisible(true); setUpdatedName(c.name); setSelected(c)}}>
                            Edit
                          </button>
                          <button className="btn btn-danger ms-2" key={c._id} onClick={() => {handleDelete(c._id)}}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal onCancel={() => setVisible(false)} footer={null} open={visible}>
              <CategoryForm value={updatedName} setValue={setUpdatedName} handleCreate={handleUpdate}/>
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
