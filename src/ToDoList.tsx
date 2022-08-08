import React, { useState } from "react";
import { useForm } from "react-hook-form";

const ToDoList = () => {
  const { register, handleSubmit } = useForm();
  const onValid = (data: any) => {
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <input
          {...(register("toDo"), { required: true, minLength: 10 })}
          placeholder="Write a to do"
        />
        <input
          {...(register("firstname"), { required: true })}
          placeholder="firstname"
        />
        <input
          {...(register("lastname"), { required: true })}
          placeholder="lastname"
        />
        <input {...(register("age"), { required: true })} placeholder="age" />
        <button>Add</button>
      </form>
    </div>
  );
};

export default ToDoList;
