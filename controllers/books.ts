import { Request, Response, NextFunction } from "express";
import prisma from "../db";

const getBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //Getting all books list.
    let result = await prisma.books_Inventory.findMany({});
    // Send the response with a 200 status code and the user data
    return res.status(200).json({
      response: result,
    });
  } catch (error) {
    // If there's an error, handle it by sending a 500 status code and an error message
    return res.status(500).json({
      error: "Failed to get books.",
    });
  }
};

const getBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //getting a specific book.
    let name: string = req.params.name || "";
    let author: string = req.params.author || "";
    let edition: number = parseInt(req.params.edition) || 0;
    let result = await prisma.books_Inventory.findFirst({
      where: {
        name: name,
        author: author,
        edition: edition,
      },
    });
    if (!result) {
      return res.status(404).json({ error: "Book not found" });
    }
    return res.status(200).json({
      response: result,
    });
  } catch (error) {
    return res.status(500).json({
      response: error,
    });
  }
};
const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { author, quantity, description, edition, image, name } = req.body;
    //create record.
    let key: string = author + "`" + name + "`" + edition;
    let result = await prisma.books_Inventory.create({
      data: {
        author: author,
        quantity: quantity,
        description: description,
        edition: edition,
        image: image,
        name: name,
        key: key,
      },
    });
    return res.status(200).json({
      response: result,
    });
  } catch (error) {
    return res.status(500).json({
      response: error,
    });
  }
};

//** Requires edition, name and author to update. */
const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { author, quantity, description, edition, image, name } = req.body;
    const key = `${author}\`${name}\`${edition}`;

    // Create a data object with only the fields that are present in the request body
    const dataToUpdate: any = {};

    if (author !== undefined) {
      dataToUpdate.author = author;
    }

    if (quantity !== undefined) {
      dataToUpdate.quantity = quantity;
    }

    if (description !== undefined) {
      dataToUpdate.description = description;
    }

    if (edition !== undefined) {
      dataToUpdate.edition = edition;
    }

    if (image !== undefined) {
      dataToUpdate.image = image;
    }

    if (name !== undefined) {
      dataToUpdate.name = name;
    }

    // Perform the update operation with the data object
    const result = await prisma.books_Inventory.update({
      where: {
        key: key,
      },
      data: dataToUpdate,
    });

    return res.status(200).json({
      response: result,
    });
  } catch (error) {
    return res.status(500).json({
      response: error,
    });
  }
};

const deleteBook=async(req:Request,res:Response,next:NextFunction)=>{
    try{
        //Get the record and delete.
        const { author,edition, name } = req.body;
        const key = `${author}\`${name}\`${edition}`;
        let result=await prisma.books_Inventory.delete({
            where:{
                key:key
            }
        });
        return res.status(200).json({
            response: result,
        }); 
    }catch(error){
        return res.status(500).json({
            response: error,
        }); 
    }
};
export default { getBooks, getBook, createBook, updateBook, deleteBook };
