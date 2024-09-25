import { Request, Response } from "express";
import { getAllAppointmentsService, getAppointmentByIdService, createAppointmentService, cancelAppointmentByIdService } from "../services/appointmentsService";


export const getAppointments = async (req: Request, res: Response) => {
    try {
        const allAppointments = await getAllAppointmentsService();
        res.status(200).json(allAppointments);
    } catch (error) {
        res.status(404).send('Error al cargar los turnos');
    }
}

export const getAppointmentsById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const appointment = await getAppointmentByIdService(Number(id));
        if (appointment) {
            res.status(200).json(appointment);
        } else {
            res.status(404).send("Turno no encontrado.");
        }
    } catch (error) {
        console.error('Error al cargar el turno')
    }
}

export const createAppointments = async (req: Request, res: Response): Promise<void> => {
    const { date, time, userId, description } = req.body;

    try {
        if (!userId || !description || !date || !time) {
            res.status(400).send("Datos incompletos para crear un turno.");
            return;
        }

        const newAppointment = await createAppointmentService(date, time, Number(userId), description);
        res.status(201).json({ message: 'Turno agendado con éxito', data: newAppointment })
        
    } catch (error) {
        console.error("Error al agendar el turno:", error);

    }
}

export const cancelAppointments = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    if (!id) {
        res.status(400).send("ID del turno es requerido.");
        return;
    }

    try {
        const success = await cancelAppointmentByIdService(Number(id));
        if (success) {
            res.status(200).send("Turno cancelado con éxito.");
        } else {
            res.status(404).send("Turno no encontrado.");
        }
    } catch (error) {
        console.error("Error al cancelar el turno:", error);
    }
}