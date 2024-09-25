import { Router } from "express";
import { getAppointments, getAppointmentsById, createAppointments, cancelAppointments } from "../controllers/appointmentsController";
import { validateAppointmentTime } from "../middlewares/appointmentTimeRange";
const appointmentsRouter: Router = Router();

appointmentsRouter.get("/", getAppointments)

appointmentsRouter.get("/:id", getAppointmentsById)

appointmentsRouter.post("/schedule", validateAppointmentTime, createAppointments)

appointmentsRouter.put("/cancel/:id", cancelAppointments)

export default appointmentsRouter