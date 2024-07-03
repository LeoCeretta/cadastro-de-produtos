import { NextApiRequest, NextApiResponse } from 'next';
import { Product } from '../../interfaces/Product';

let products: Product[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(products);
  } else if (req.method === 'POST') {
    const { name, description, price, available } = req.body;

    if (!name || !description || price === undefined || !available) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    const newProduct: Product = {
      id: Date.now().toString(),
      name,
      description,
      price: parseFloat(price),
      available: available === 'sim',
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
  }
}
