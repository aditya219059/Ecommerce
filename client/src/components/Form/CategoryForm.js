import React from "react";

const CategoryForm = ({handleCreate, value, setValue}) => {
  return (
    <>
      <form onSubmit={handleCreate}>
        <div className="mb-3">
          
          <input
            type="text"
            className="form-control"
            placeholder="Create Category"
            value={value}
            onChange={(e) => {setValue(e.target.value)}}
          />

        </div>

        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
    </>
  );
};

export default CategoryForm;
