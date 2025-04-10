import React from "react";
import Layout from "../components/Layout/Layout";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [ask, setAsk] = useState("");

  const handleContact = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/contact/create-contact`,
        { name, email, phone, ask }
      );
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title={"Contact us - Ecommerce"}>
      <div className="contact">
        <h1 className="contact-form mb-3">Contact page</h1>
        <form className="contact-form" onSubmit={handleContact}>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control"
              id="exampleInputname"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="email"
              className="form-control"
              id="exampleInputemail"
              placeholder="Your Mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="tel"
              className="form-control"
              id="exampleInputphone"
              placeholder="Your Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="form-group mb-3 ask">
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows={3}
              defaultValue={""}
              placeholder="Ask or Suggest us"
              value={ask}
              onChange={(e) => setAsk(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary mb-3 form-group">
            Register
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Contact;
