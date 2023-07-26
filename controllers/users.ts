import { Request, Response, NextFunction } from "express";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all users from the database
const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await prisma.users.findMany({});

    return res.status(200).json({
      response: result,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Failed to get users.",
    });
  }
};

// Get a specific user from the database based on the provided email
const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.params;

    const result = await prisma.users.findFirst({
      where: {
        email: email,
      },
    });

    return res.status(200).json({
      response: result,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Failed to get user.",
    });
  }
};

// Update a user's information in the database
const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.params;
    const { name, password, phoneNo } = req.body;

    const result = await prisma.users.update({
      where: {
        email: email,
      },
      data: {
        name: name,
        password: password,
        phoneNo: phoneNo,
        updatedAt: new Date().toISOString(),
      },
    });

    return res.status(200).json({
      response: result,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Failed to update user.",
    });
  }
};

// Create a new user in the database
const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, name, password, phoneNo } = req.body;

    const result = await prisma.users.create({
      data: {
        email: email,
        name: name,
        password: password,
        phoneNo: phoneNo,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    });

    return res.status(201).json({
      response: result,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Failed to create user.",
    });
  }
};

// Delete a user from the database
const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.params;

    const result = await prisma.users.delete({
      where: {
        email: email,
      },
    });

    return res.status(200).json({
      response: result,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Failed to delete user.",
    });
  }
};

export default { getUsers, getUser, updateUser, deleteUser, createUser };
