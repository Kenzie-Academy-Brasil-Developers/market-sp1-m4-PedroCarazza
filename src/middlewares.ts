import { NextFunction, Request, Response } from "express";
import { products } from "./database";

export const isProductNameUnique = (req: Request, res: Response, next: NextFunction) => {
    if(products.some(product => product.name === req.body.name)){
        return res.status(409).json({message: "Product already registered."})
    }
    next()
}

export const isProductIdValid = (req: Request, res: Response, next: NextFunction) => {
    if(!products.some(product => product.id === Number(req.params.id))){
        return res.status(404).json({message: "Product not found."})
    }
    next()
}