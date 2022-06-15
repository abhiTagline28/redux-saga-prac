import React, { useState, useEffect } from "react";
import { MDBValidation, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createUsersStart, updateUsersStart } from "../redux/actions";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  email: "",
  phone: "",
  address: "",
};

const AddEditUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formValue, setFormValue] = useState(initialState);
  const [editMode, setEditMode] = useState(false);
  const { name, email, phone, address } = formValue;
  const { id } = useParams();
  const { users } = useSelector((state) => state.data);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (name && email && phone && address) {
      if (!editMode) {
        dispatch(createUsersStart(formValue));
        toast.success("User Added Successfully....");
        setTimeout(() => navigate("/"), 500);
      } else {
        dispatch(updateUsersStart({ id, formValue }));
        setEditMode(false);
        toast.success("User updated Successfully....");
        setTimeout(() => navigate("/"), 500);
      }
    }
  };

  useEffect(() => {
    if (id) {
      setEditMode(true);
      const singleUser = users.find((item) => item.id === Number(id));
      setFormValue({ ...singleUser });
    } else {
      setEditMode(false);
      setFormValue({ ...initialState });
    }
  }, [id]);

  const fields = [
    {
      name: "name",
      value: name,
      type: "text",
      onChange: onInputChange,
      required: true,
      label: "Name",
      validation: "Please enter name",
      invalid: true,
    },
    {
      name: "email",
      value: email,
      type: "email",
      onChange: onInputChange,
      required: true,
      label: "Email",
      validation: "Please enter email",
      invalid: true,
    },
    {
      name: "phone",
      value: phone,
      type: "phone",
      onChange: onInputChange,
      required: true,
      label: "Phone",
      validation: "Please enter phone",
      invalid: true,
    },
    {
      name: "address",
      value: address,
      type: "address",
      onChange: onInputChange,
      required: true,
      label: "Address",
      validation: "Please enter address",
      invalid: true,
    },
  ];

  return (
    <MDBValidation
      className="row g-3"
      style={{ marginTop: "100px" }}
      noValidate
      onSubmit={handleSubmit}
    >
      <p className="fs-2 fw-bold">
        {!editMode ? "Add User Detail" : "Update User Detail"}
      </p>
      <div
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
      >
        {fields.map((item) => (
          <>
            <MDBInput
              value={item.value || ""}
              name={item.name}
              type={item.type}
              onChange={item.onChange}
              required={item.required}
              label={item.label}
              validation={item.validation}
              invalid={item.invalid}
            />
            <br />
          </>
        ))}

        {/* <MDBInput
          value={email || ""}
          name="email"
          type="email"
          onChange={onInputChange}
          required
          label="Email"
          validation="Please enter email"
          invalid
        />
        <br />
        <MDBInput
          value={phone || ""}
          name="phone"
          type="number"
          onChange={onInputChange}
          required
          label="Phone"
          validation="Please enter phone number"
          invalid
        />
        <br />
        <MDBInput
          value={address || ""}
          name="address"
          type="text"
          onChange={onInputChange}
          required
          label="Address"
          validation="Please enter address"
          invalid
        /> */}
        <br />
        <div className="col-12">
          <MDBBtn style={{ marginRight: "10px" }} type="submit">
            {!editMode ? "Add" : "Update"}
          </MDBBtn>
          <MDBBtn onClick={() => navigate("/")} color="danger">
            Go Back
          </MDBBtn>
        </div>
      </div>
    </MDBValidation>
  );
};

export default AddEditUser;
