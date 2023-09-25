import { Request, Response } from "express";
import { products } from "./database";

let id = 1;

export const createProducts = (req: Request, res: Response) => {
  const date = new Date();
  const oneYear = date.setFullYear(date.getFullYear() + 1);

  const newProduct = {
    id: id++,
    name: req.body.name,
    price: req.body.price,
    weight: req.body.weight,
    calories: req.body.calories,
    section: req.body.section,
    expirationDate: new Date(oneYear),
  };

  products.push(newProduct);

  return res.status(201).json(newProduct);
};

export const getAllProducts = (req: Request, res: Response) => {
  const sumValues = products.reduce(
    (acc, product) => acc + product.price,
    0
  );

  res.status(200).json({ total: sumValues, products });
};

export const getProductsById = (req: Request, res: Response) => {
  const product = products.find(
    (product) => product.id === Number(req.params.id)
  );

  return res.status(200).json(product);
};

export const updateProducts = (req: Request, res: Response) => {
    const product = products.find(product => product.id === Number(req.params.id));

    const newProduct = {...product, ...req.body};

    const index = products.findIndex(product => product.id === Number(req.params.id))

    products.splice(index, 1, newProduct);

    return res.status(200).json(newProduct)
}

export const deleteProducts = (req: Request, res: Response) => {
    const index = products.findIndex(product => product.id === Number(req.params.id))

    products.splice(index, 1)

    res.status(204).send()
}