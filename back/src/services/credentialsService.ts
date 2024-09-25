import { AppDataSource } from "../config/data-source";
import { Credential } from "../entities/Credential";
import { credentialRepository } from "../repositories/credentialRepository";
// separar parametros y agregar dtos para recortar codigo

export const createCredential = async (username: string, password: string): Promise<Credential | undefined> => {
  try {

    const newCredential = credentialRepository.create({ username, password });
    const savedCredential = await credentialRepository.save(newCredential);
    return savedCredential;
  } catch (error) {
    console.error("Error al crear credencial:", error);
    return undefined;
  }
};

export const verifyCredential = async (username: string, password: string): Promise<number | undefined> => {
  const credential = await credentialRepository.findOneBy({
    username,
    password
  });

  if (credential) {
    return credential.id;
  }

  return undefined;
};
