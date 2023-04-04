import axios from "axios";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css"

function Customer() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [address, setAddress] = useState(" ");

  const [customer, setUsers] = useState([]);

  useEffect(() => {
    (async () => await Load())();
  }, []);

  async function Load() {
    const result = await axios.get("http://localhost:9002/api/customer/");
    setUsers(result.data.data);
    console.log(result.data);
  }

  async function save(event) {
    event.preventDefault();
    try {
      await axios.post("http://localhost:9002/api/customer/add", {
        name: name,
        email: email,
        phone: phone,
        address: address,
      });
      alert("customer Registation Successfully");

      Load();
    } catch (err) {
      alert("User Registation Failed");
    }
  }
  async function editcustomer(customer) {
    setName(customer.name);
    setemail(customer.email);
    setphone(customer.phone);
    setAddress(customer.address);
    setId(customer.id);
  }

  async function Deletecustomer(id) {
    await axios.delete("http://localhost:9002/api/customer/delete/" + id);
    alert("customer deleted Successfully");
    Load();
  }

  async function update(event) {
    event.preventDefault();

    try {
      await axios.put(
        "http://localhost:9002/api/customer/update/" +
          customer.find((u) => u.id === id).id || id,
        {
          id: id,
          name: name,
          email: email,
          phone: phone,
        }
      );
      alert("Registation Updateddddd");
    } catch (err) {
      alert(" Registation Failed");
    }
  }

  return (
    <div>
      
      <div class="container mt-4">
      <h1>customer Details</h1>
        <form>
          <div className="row">
            <div class="form-group mb-3 col-lg-6 col-md-6 col-12">
              <input
                type="text"
                class="form-control"
                id="customer_id"
                hidden
                value={id}
                onChange={(event) => {
                  setId(event.target.value);
                }}
              />
              <label>customer Name</label>
              <input
                type="text"
                class="form-control"
                id="name"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
            </div>
            <div class="form-group mb-3 col-lg-6 col-md-6 col-12">
              <label>email</label>
              <input
                type="text"
                class="form-control"
                id="email"
                value={email}
                onChange={(event) => {
                  setemail(event.target.value);
                }}
              />
            </div>

            <div class="form-group mb-3 col-lg-6 col-md-6 col-12">
              <label>phone</label>
              <input
                type="text"
                class="form-control"
                id="phone"
                value={phone}
                onChange={(event) => {
                  setphone(event.target.value);
                }}
              />
            </div>
            <div class="form-group mb-3 col-lg-6 col-md-6 col-12">
              <label>Address</label>
              <input
                type="text"
                class="form-control"
                id="address"
                value={address}
                onChange={(event) => {
                  setAddress(event.target.value);
                }}
              />
            </div>
          </div>

          <div>
            <button class="btn btn-primary m-4" onClick={save}>
              Register
            </button>
            <button class="btn btn-warning m-4" onClick={update}>
              Update
            </button>
          </div>
        </form>
      </div>
      <div className="container">
        <table class="table table-dark" align="center">
          <thead>
            <tr>
              <th scope="col">customer Id</th>
              <th scope="col">customer Name</th>
              <th scope="col">email</th>
              <th scope="col">phone</th>
              <th scope="col">Address</th>
              <th scope="col">Option</th>
            </tr>
          </thead>
          {customer.map(function fn(customer) {
            return (
              <tbody>
                <tr>
                  <th scope="row">{customer.id} </th>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.address}</td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-warning"
                      onClick={() => editcustomer(customer)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      class="btn btn-danger mx-2"
                      onClick={() => Deletecustomer(customer.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </div>
  );
}
export default Customer;
