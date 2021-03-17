import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";
import * as yup from 'yup';
import { AppError } from "../errors/AppError";

class UserController {
  async create(request: Request, response: Response) {
    const { name, email } = request.body;

    const schema = yup.object().shape({
      name: yup.string().required('name is obrigatoried'),
      email: yup.string().email().required('email is obrigatoried')
    });

    /* if (!await schema.isValid(request.body)) {
      return response.status(400).json({ error: "Validation failed!" });
    } */

    try {
      await schema.validate(request.body, { abortEarly: false });
    } catch (e) {
      throw new AppError(e);
    }


    const usersRepository = getCustomRepository(UserRepository);

    // SELECT * FROM USERS WHERE EMAIL = "EMAIL"
    const userAlreadyExists = await usersRepository.findOne({
      email,
    });

    if (userAlreadyExists) {
      throw new AppError("User already exists")
    }

    const user = usersRepository.create({
      name,
      email,
    });

    await usersRepository.save(user);

    return response.status(201).json(user);

  }
}

export { UserController };
