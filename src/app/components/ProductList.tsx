import { useEffect, useState } from 'react';
import { Product } from '../interfaces/Product';

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('/api/products');
      const data: Product[] = await res.json();
      setProducts(data.sort((a, b) => a.price - b.price));
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Lista de Produtos</h1>
      <button onClick={() => window.location.href = '/products/new'}>Cadastrar Novo Produto</button>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
