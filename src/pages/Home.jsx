import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUsersStart, loadUsersStart } from "../redux/actions";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
  MDBIcon,
  MDBTooltip,
  MDBSpinner,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.data);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete the user")) {
      dispatch(deleteUsersStart(id));
      toast.success("User deleted successfully");
    }
  };

  useEffect(() => {
    dispatch(loadUsersStart());
  }, []);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const tableFields = ["No.", "Name", "Email", "Phone", "Address", "Action"];

  return (
    <div className="container" state={{ marginTop: "150px" }}>
      <MDBTable>
        <MDBTableHead dark>
          <tr>
            {tableFields.map((item) => (
              <th scope="col">{item}</th>
            ))}
          </tr>
          {/* <tr>
            <th scope="col">No.</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Address</th>
            <th scope="col">Action</th>
          </tr> */}
        </MDBTableHead>
        {users && users.length
          ? users.map((item, index) => {
              return (
                <MDBTableBody key={index}>
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <th>{item.name}</th>
                    <th>{item.email}</th>
                    <th>{item.phone}</th>
                    <th>{item.address}</th>
                    <th>
                      <MDBBtn
                        className="m-1"
                        tag="a"
                        color="none"
                        onClick={() => handleDelete(item.id)}
                      >
                        <MDBTooltip title="Delete" tag="a">
                          <MDBIcon
                            fas
                            icon="trash"
                            style={{ color: "#dd4b39" }}
                            size="lg"
                          />
                        </MDBTooltip>
                      </MDBBtn>
                      {"   "}
                      <Link to={`/editUser/${item.id}`}>
                        <MDBTooltip title="Edit" tag="a">
                          <MDBIcon
                            fas
                            icon="pen"
                            style={{ color: "#55acee", marginBottom: "10px" }}
                            size="lg"
                          />
                        </MDBTooltip>
                      </Link>{" "}
                      <Link to={`/userInfo/${item.id}`}>
                        <MDBTooltip title="View" tag="a">
                          <MDBIcon
                            fas
                            icon="eye"
                            style={{ color: "#3b5998", marginBottom: "10px" }}
                            size="lg"
                          />
                        </MDBTooltip>
                      </Link>
                    </th>
                  </tr>
                </MDBTableBody>
              );
            })
          : ""}
      </MDBTable>
      {loading ? (
        <MDBSpinner style={{ marginTop: "150px" }} role="status">
          <span className="visually-hidden">Loading....</span>
        </MDBSpinner>
      ) : (
        ""
      )}
    </div>
  );
};

export default Home;
