import { User } from "../entities/User";
import { createCredential } from "./credentialsService";
import { UserRepository } from "../repositories/userRepository";
import cloudinary from "../config/cloudinaryConfig";

export const getAllUsersService = async (): Promise<User[] | undefined> => {
  try {
    const users = await UserRepository.find();
    return users;
  }
  catch (error) {
    console.error("Error al obtener usuarios:", error);
  }
}

export const getUserByIdService = async (id: number): Promise<User | null> => {
  const user = UserRepository.findOne({
    where: { id },
    relations: ['appointment'],//'credential', 

  })
  return user || null;
}

export const createUserService = async (
  name: string,
  email: string,
  birthdate: string,
  nDni: number,
  username: string,
  password: string
): Promise<User | undefined> => {
  try {
    if (!name || !email || !birthdate || !nDni || !username || !password) {
      throw new Error("Todos los campos son obligatorios.");
    }

    const newCredential = await createCredential(username, password);
    if (!newCredential) {
      throw new Error("Error creando credencial");
    }

    const newUser = UserRepository.create({
      name,
      email,
      birthdate,
      nDni,
      credential: newCredential
    });
    const savedUser = await UserRepository.save(newUser);
    return savedUser;
  } catch (error) {
    console.error("Error al crear usuario:", error);
    return undefined;
  }
};


export const updateUserProfileImageService = async (userId: number, imagePath: string): Promise<User> => {
  try {
    
    const user = await UserRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    const result = await cloudinary.uploader.upload(imagePath, {
      folder: 'profile_images',
      public_id: `user_${userId}`,  
      overwrite: true,
    });

    console.log("Imagen subida exitosamente, URL:", result.secure_url);

    user.profileImage = result.secure_url;
    await UserRepository.save(user);

    return user;
  } catch (error: any) {
    throw new Error(`Error al actualizar la imagen de perfil: ${error.message}`); 
  }
};