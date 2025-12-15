import React, { useEffect, useState } from "react";
import { getPatients, addPatient, getDoctors, addDoctor, getAppointments, addAppointment } from "./api";
import "./App.css";

function App() {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const [newPatient, setNewPatient] = useState({ name: "", birthDate: "", email: "", phone: "" });
  const [newDoctor, setNewDoctor] = useState({ name: "", specialty: "" });
  const [newAppointment, setNewAppointment] = useState({ patientId: "", doctorId: "", startAt: "", endAt: "", notes: "" });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const patientsRes = await getPatients();
      setPatients(patientsRes.data);

      const doctorsRes = await getDoctors();
      setDoctors(doctorsRes.data);

      const appointmentsRes = await getAppointments();
      setAppointments(appointmentsRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAddPatient = async () => {
    if (!newPatient.name || !newPatient.birthDate) return alert("Name and BirthDate required!");
    await addPatient(newPatient);
    setNewPatient({ name: "", birthDate: "", email: "", phone: "" });
    fetchData();
  };

  const handleAddDoctor = async () => {
    if (!newDoctor.name || !newDoctor.specialty) return alert("Name and Specialty required!");
    await addDoctor(newDoctor);
    setNewDoctor({ name: "", specialty: "" });
    fetchData();
  };

  const handleAddAppointment = async () => {
    if (!newAppointment.patientId || !newAppointment.doctorId || !newAppointment.startAt || !newAppointment.endAt) {
      return alert("All appointment fields are required!");
    }
    await addAppointment(newAppointment);
    setNewAppointment({ patientId: "", doctorId: "", startAt: "", endAt: "", notes: "" });
    fetchData();
  };

  return (
    <div className="container">
      <h1>Clinic Management Dashboard</h1>

      <section>
        <h2>Patients</h2>
        <div className="form">
          <input placeholder="Name" value={newPatient.name} onChange={e => setNewPatient({ ...newPatient, name: e.target.value })} />
          <input type="date" value={newPatient.birthDate} onChange={e => setNewPatient({ ...newPatient, birthDate: e.target.value })} />
          <input placeholder="Email" value={newPatient.email} onChange={e => setNewPatient({ ...newPatient, email: e.target.value })} />
          <input placeholder="Phone" value={newPatient.phone} onChange={e => setNewPatient({ ...newPatient, phone: e.target.value })} />
          <button onClick={handleAddPatient}>Add Patient</button>
        </div>
        <div className="cards">
          {patients.map(p => (
            <div className="card" key={p._id}>
              <h3>{p.name}</h3>
              <p>Email: {p.email || "-"}</p>
              <p>Phone: {p.phone || "-"}</p>
              <p>Birth: {p.birthDate}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Doctors</h2>
        <div className="form">
          <input placeholder="Name" value={newDoctor.name} onChange={e => setNewDoctor({ ...newDoctor, name: e.target.value })} />
          <input placeholder="Specialty" value={newDoctor.specialty} onChange={e => setNewDoctor({ ...newDoctor, specialty: e.target.value })} />
          <button onClick={handleAddDoctor}>Add Doctor</button>
        </div>
        <div className="cards">
          {doctors.map(d => (
            <div className="card" key={d._id}>
              <h3>{d.name}</h3>
              <p>Specialty: {d.specialty}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Appointments</h2>
        <div className="form">
          <select value={newAppointment.patientId} onChange={e => setNewAppointment({ ...newAppointment, patientId: e.target.value })}>
            <option value="">Select Patient</option>
            {patients.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
          </select>
          <select value={newAppointment.doctorId} onChange={e => setNewAppointment({ ...newAppointment, doctorId: e.target.value })}>
            <option value="">Select Doctor</option>
            {doctors.map(d => <option key={d._id} value={d._id}>{d.name}</option>)}
          </select>
          <input type="datetime-local" value={newAppointment.startAt} onChange={e => setNewAppointment({ ...newAppointment, startAt: e.target.value })} />
          <input type="datetime-local" value={newAppointment.endAt} onChange={e => setNewAppointment({ ...newAppointment, endAt: e.target.value })} />
          <input placeholder="Notes" value={newAppointment.notes} onChange={e => setNewAppointment({ ...newAppointment, notes: e.target.value })} />
          <button onClick={handleAddAppointment}>Add Appointment</button>
        </div>
        <div className="cards">
          {appointments.map(a => (
            <div className="card" key={a._id}>
              <h3>Patient: {a.patientId}</h3>
              <p>Doctor: {a.doctorId}</p>
              <p>Start: {new Date(a.startAt).toLocaleString()}</p>
              <p>End: {new Date(a.endAt).toLocaleString()}</p>
              <p>Notes: {a.notes || "-"}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
