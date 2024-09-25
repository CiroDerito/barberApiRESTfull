import { Request, Response, NextFunction } from "express";

const MIN_TIME = '08:00';
const MAX_TIME = '18:00';

function isTimeInRange(time: string): boolean {
    return time >= MIN_TIME && time <= MAX_TIME;
}

export function validateAppointmentTime(req: Request, res: Response, next: NextFunction): void {
    const { time } = req.body;

    if (!time || !isTimeInRange(time)) {
        res.status(400).send('El horario de atencion es de 08:00 hs. a 18:00 hs.');
        return;
    }

    next();
}
