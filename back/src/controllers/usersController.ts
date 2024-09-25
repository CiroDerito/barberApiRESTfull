import { NextFunction, Request, Response } from "express";
import { getAllUsersService, getUserByIdService, createUserService, updateUserProfileImageService } from "../services/usersService";
import cloudinary from '../config/cloudinaryConfig';
import { verifyCredential } from "../services/credentialsService";
import { UserRepository } from "../repositories/userRepository";
import { User } from "../entities/User";


export const getUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await getAllUsersService();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send('Error al obtener los usuarios');
    }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const userById = await getUserByIdService(Number(id));
        if (userById) {
            res.status(200).json(userById);
        } else {
            res.status(404).send('Usuario no encontrado');
        }
    } catch (error) {
        console.error('Error al buscar el usuario');
        res.status(500).send('Error al buscar el usuario');
    }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
    const { name, email, birthdate, nDni, username, password } = req.body;
    if (!name || !email || !birthdate || !nDni || !username || !password) {
        res.status(400).send("Todos los campos son obligatorios.");
        return;
    }

    try {
        const newUser = await createUserService(name, email, birthdate, nDni, username, password);
        if (newUser) {
            res.status(201).json({ message: 'Usuario registrado con éxito', data: newUser });
        } else {
            res.status(400).send("Error al crear el usuario.");
        }
    } catch (error) {
        console.error("Error al registrar el usuario:", error);
        res.status(500).send('Error al registrar el usuario');
    }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;

    try {
        if (!username || !password) {
            res.status(400).send("Nombre de usuario y contraseña son requeridos.");
            return;
        }

        const credentialId = await verifyCredential(username, password);

        if (credentialId) {
            const user = await getUserByIdService(credentialId);
            if (user) {
                const { credential, ...userData } = user;
                res.status(200).json({ message: "Login exitoso", data: { ...userData, login: true } });
            } else {
                res.status(404).send("Usuario no encontrado.");
            }
        } else {
            res.status(401).send("Credenciales incorrectas.");
        }
    } catch (error) {
        console.error("Error al realizar el login:", error);
        res.status(500).send('Error al realizar el login');
    }
};

export const updateUserProfileImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = Number(req.params.id);
        const imagePath = req.file?.path;

        if (!imagePath) {
            return res.status(400).json({ message: "No se ha proporcionado ninguna imagen." });
        }

        const updatedUser = await updateUserProfileImageService(userId, imagePath);
        res.status(200).json({ message: "Imagen de perfil actualizada exitosamente", user: updatedUser });
    } catch (error: any) {
        console.error("Error en updateUserProfileImage:", error.message);
        next(error);
    }
};