import { useState } from 'react';
import { useRouter } from 'next/navigation';


const ProductForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [available, setAvailable] = useState('sim');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const product = { name, description, price, available };

    const res = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    if (res.ok) {
      router.push('/products');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nome do produto:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Descrição do produto:</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
      <div>
        <label>Valor do produto:</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
      </div>
      <div>
        <label>Disponível para venda:</label>
        <select value={available} onChange={(e) => setAvailable(e.target.value)}>
          <option value="sim">Sim</option>
          <option value="não">Não</option>
        </select>
      </div>
      <button type="submit">Cadastrar</button>
    </form>
  );
};

export default ProductForm;
