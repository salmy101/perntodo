import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";


const InputTodo = () => {
  const [description, setDescription] = useState("");

  
  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
     console.log("response here",response)
     setDescription("")
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Fragment>
      <h1 className="text-center mt-5">ToDo</h1>
      <form className="d-flex mt-5"  onSubmit={onSubmitForm}>
        <input
          type="text"
          class="form-control"
          placeholder="Task"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit" class="btn btn-info">
          Add
        </button>
      </form>
    </Fragment>
  );
};

export default InputTodo;
