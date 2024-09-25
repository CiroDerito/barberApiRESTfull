import { Appointment, AppointmentStatus } from "../entities/Appointment";
import { appointmentRepository } from "../repositories/appointmentRepository";
import { UserRepository } from "../repositories/userRepository";

export const getAllAppointmentsService = async (): Promise<Appointment[] | undefined> => {
  try {
    const appointments = appointmentRepository.find(
      // {
      //   relations: ['user']
      // }
    )
    return appointments;
  }
  catch {
    console.error('Error al cargar turnos')
  }
}

export const getAppointmentByIdService = async (id: number): Promise<Appointment | null> => {
  const appointment = appointmentRepository.findOne({
    where: { id },
    relations: ['user']
  });
  return appointment || null;
}

export const createAppointmentService = async (date: string, time: string, userId: number, description: string): Promise<Appointment> => {
  if (!userId) {
    throw new Error('No se puede crear un turno sin un ID de usuario');
  }
  const user = await UserRepository.findOneBy({ id: userId });
  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  const newAppointment = appointmentRepository.create({
    date,
    time,
    description
  });
  newAppointment.user = user;
  await appointmentRepository.save(newAppointment);
  return newAppointment;
}

export const cancelAppointmentByIdService = async (id: number): Promise<boolean> => {
  const appointment = await appointmentRepository.findOneBy({ id });
  if (!appointment) {
    return false;
  }
  appointment.status = AppointmentStatus.CANCELLED;
  await appointmentRepository.save(appointment);

  return true;
}