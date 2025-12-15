import axios from "axios";

export const getPatients = () => axios.get(`/patients`);
export const addPatient = (patient) => axios.post(`/patients`, patient);

export const getDoctors = () => axios.get(`/doctors`);
export const addDoctor = (doctor) => axios.post(`/doctors`, doctor);

export const getAppointments = () => axios.get(`/appointments`);
export const addAppointment = (appointment) => axios.post(`/appointments`, appointment);
