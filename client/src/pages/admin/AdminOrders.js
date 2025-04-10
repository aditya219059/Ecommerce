import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";
import moment from "moment";
import { Select, ConfigProvider, Space } from "antd";
const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancel",
  ]);
  //   const [changeStatus, setChangeStatus] = useState("");
  const [orders, setOrders] = useState();
  const [auth, setAuth] = useAuth();

  //Get orders
  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/all-orders`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  //Handle status change
  const handleChange = async (value, orderId) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/order-status/${orderId}`,
        {
          status: value,
        }
      );
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"All Orders Data"}>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Orders</h1>
          {orders?.map((o, i) => {
            return (
              <div className="border-shadow bg-transparent">
                <table className="table table-dark category-table">
                  <thead className="">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Status</th>
                      <th scope="col">Buyer</th>
                      <th scope="col">Orders</th>
                      <th scope="col">Payment</th>
                      <th scope="col">Quantity</th>
                    </tr>
                  </thead>
                  <tbody className="">
                    <tr>
                      <td>{i + 1}</td>
                      <td>
                        <ConfigProvider
                          theme={{
                            token: {
                              colorBgBase: "transparent",
                              // optionSelectedBg: "transparent",
                              // optionActiveBg: "transparent",
                              // optionSelectedColor:"rgba(0, 0, 0, 0.88)"
                            },
                          }}
                        >
                          <Space>
                            <Select
                              onChange={(value) => handleChange(value, o._id)}
                              defaultValue={o?.status}
                            >
                              {status.map((s, i) => (
                                <Option key={i} value={s}>
                                  {s}
                                </Option>
                              ))}
                            </Select>
                          </Space>
                        </ConfigProvider>
                      </td>
                      <td>{o?.buyer?.name}</td>
                      <td>{moment(o?.createdAt).fromNow()}</td>
                      <td>{o?.payment.success ? "Success" : "Failed"}</td>
                      <td>{o?.products?.length}</td>
                    </tr>
                  </tbody>
                </table>
                {o?.products?.map((p, i) => (
                  <div
                    className="row mb-2 p-3 card flex-row neon__card"
                    key={p._id}
                  >
                    <div className="col-md-4">
                      <img
                        className=""
                        src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                        alt={p.name}
                      />
                    </div>
                    <div className="col-md-8" style={{ fontSize: "2rem" }}>
                      <p className="neon__title" style={{ fontSize: "2rem" }}>
                        {p.name}
                      </p>
                      <p
                        className="neon__description"
                        style={{ fontSize: "1rem" }}
                      >
                        {p.description}
                      </p>
                      <p
                        className="neon__description"
                        style={{ fontSize: "1rem" }}
                      >
                        Price : {p.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
