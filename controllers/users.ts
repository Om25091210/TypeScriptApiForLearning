import { Express, Request, Response, NextFunction } from "express";
import prisma from "../db";

// Get all users from the database
const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get all users from the database using Prisma's findMany method
    const result = await prisma.users.findMany({});

    // Send the response with a 200 status code and the user data
    return res.status(200).json({
      response: result,
    });
  } catch (error) {
    // If there's an error, handle it by sending a 500 status code and an error message
    return res.status(500).json({
      error: "Failed to get users.",
    });
  }
};

// Get a specific user from the database based on the provided email
const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Extract the email from the request parameters
    const email: string = req.params.email;

    // Get the user from the database using Prisma's findFirst method and the provided email
    const result = await prisma.users.findFirst({
      where: {
        email: email,
      },
    });

    // Send the response with a 200 status code and the user data
    return res.status(200).json({
      response: result,
    });
  } catch (error) {
    // If there's an error, handle it by sending a 500 status code and an error message
    return res.status(500).json({
      error: "Failed to get user.",
    });
  }
};

// Update a user's information in the database
const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Extract the email and other data from the request body
    const email: string = req.params.email;
    const name: string = req.body.name;
    const password: string = req.body.password;
    const phoneNo: number = parseInt(req.body.phoneNo);

    // Update the user's information in the database using Prisma's update method
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

    // Send the response with a 200 status code and the updated user data
    return res.status(200).json({
      response: result,
    });
  } catch (error) {
    // If there's an error, handle it by sending a 500 status code and an error message
    return res.status(500).json({
      error: "Failed to update user.",
    });
  }
};

// Create a new user in the database
const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Extract the user data from the request body
    const email: string = req.body.email;
    const name: string = req.body.name;
    const password: string = req.body.password;
    const phoneNo: number = parseInt(req.body.phoneNo);

    // Create a new user in the database using Prisma's create method
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

    // Send the response with a 200 status code and the newly created user data
    return res.status(201).json({
      response: result,
    });
  } catch (error) {
    // If there's an error, handle it by sending a 500 status code and an error message
    return res.status(500).json({
      error: "Failed to create user.",
    });
  }
};

// Delete a user from the database
const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Extract the email from the request parameters
    const email: string = req.params.email;

    // Delete the user from the database using Prisma's delete method
    const result = await prisma.users.delete({
      where: {
        email: email,
      },
    });

    // Send the response with a 200 status code and the deleted user data
    return res.status(200).json({
      response: result,
    });
  } catch (error) {
    // If there's an error, handle it by sending a 500 status code and an error message
    return res.status(500).json({
      error: "Failed to delete user.",
    });
  }
};

export default { getUsers, getUser, updateUser, deleteUser, createUser };
