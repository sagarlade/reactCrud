import axios from "axios";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css"


function Booking() {
  const [id, setId] = useState("");
  const [location, setLocation] = useState("");
  const [shot, setShot] = useState("");
  const [time, setTime] = useState("");

  const [booking, setBooking] = useState([]);

  useEffect(() => {
    (async () => await Load())();
  }, []);

  async function Load() {
    const result = await axios.get("http://localhost:9002/api/booking/");
    setBooking(result.data.data);
    console.log(result.data);
  }

  async function save(event) {
    event.preventDefault();
    try {
      await axios.post("http://localhost:9002/api/booking/add", {
        location: location,
        shot: shot,
        time: time,
      });
      alert("booking Registation Successfully");

      Load();
    } catch (err) {
      alert("booking Registation Failed");
    }
  }
  async function editbooking(booking) {
    setLocation(booking.location);
    setShot(booking.shot);
    setTime(booking.time);
    setId(booking.id);
  }

  async function Deletebooking(id) {
    await axios.delete("http://localhost:9002/api/booking/delete/" + id);
    alert("booking deleted Successfully");
    Load();
  }

  async function update(event) {
    event.preventDefault();

    try {
      await axios.put(
        "http://localhost:9002/api/booking/update/" +
          booking.find((b) => b.id === id).id || id,
        {
          id: id,
          location: location,
          shot: shot,
          time: time,
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
      <h1 className="h1">booking Details</h1>
        <form>
          <div className="row">
            <div class="form-group mb-3 col-lg-6 col-md-6 col-12">
              <input
                type="text"
                class="form-control"
                id="booking_id"
                hidden
                value={id}
                onChange={(event) => {
                  setId(event.target.value);
                }}
              />
              <label>Location</label>
              <input
                type="text"
                class="form-control"
                id="loaction"
                value={location}
                onChange={(event) => {
                  setLocation(event.target.value);
                }}
              />
            </div>
            <div class="form-group mb-3 col-lg-6 col-md-6 col-12">
              <label>Shot</label>
              <input
                type="text"
                class="form-control"
                id="shot"
                value={shot}
                onChange={(event) => {
                  setShot(event.target.value);
                }}
              />
            </div>

            <div class="form-group mb-3 col-lg-6 col-md-6 col-12">
              <label>Time</label>
              <input
                type="datetime-local"
                class="form-control"
                id="time"
                value={time}
                onChange={(event) => {
                  setTime(event.target.value);
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
              <th scope="col">booking Id</th>
              <th scope="col">Location</th>
              <th scope="col">Shot Type</th>
              <th scope="col">Date-Time</th>

              <th scope="col">Option</th>
            </tr>
          </thead>
          {booking.map(function fn(booking) {
            return (
              <tbody>
                <tr>
                  <th scope="row">{booking.id} </th>
                  <td>{booking.location}</td>
                  <td>{booking.shot}</td>
                  <td>{booking.time}</td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-warning"
                      onClick={() => editbooking(booking)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      class="btn btn-danger mx-2"
                      onClick={() => Deletebooking(booking.id)}
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
export default Booking;
