import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Input from '../../components/form/Input';
import Button from '../../components/form/Button';

const CadProdutos = () => {
  const [nome_prod, setNome_prod] = useState('');
  const [descricao_prod, setDescricao_prod] = useState('');
  const [preco_prod, setPreco_prod] = useState();
  const [image, setImage] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleCadastro = async (e) => {
    e.preventDefault();
    if (!nome_prod || !descricao_prod || !preco_prod) {
      setError('Preencha todos os campos');
      return;
    }

    const formData = new FormData();
    formData.append('nome_prod', nome_prod);
    formData.append('descricao_prod', descricao_prod);
    formData.append('preco_prod', preco_prod);
    formData.append('image', image);

    await axios.post("http://localhost:3003/sistema/produtos/", formData)
      .then((response) => {
        console.log(response);
      }).catch((err) => {
        if (err.response) {
          console.log(err.response);
        } else {
          console.log("Back end desligado, tente novamente mais tarde.");
        }
      });

    alert("Produto cadastrado com sucesso!");
    navigate("/home");
  }

  return (
    <div className="container mx-auto p-4">
      <form encType="multipart/form-data" className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Cadastro de Produtos</h1>
        <div>
          <label className="block mb-2">Nome do Produto</label>
          <Input
            type="text"
            placeholder="Digite o nome do produto"
            value={nome_prod}
            onChange={(e) => [setNome_prod(e.target.value), setError('')]}
            className="mb-4"
          />

          <label className="block mb-2">Descrição do Produto</label>
          <textarea
            placeholder="Digite a descrição do produto"
            value={descricao_prod}
            onChange={(e) => [setDescricao_prod(e.target.value), setError('')]}
            rows={5}
            className="w-full p-2 border rounded mb-4"
          />

          <label className="block mb-2">Preço do Produto</label>
          <Input
            type="number"
            placeholder="Digite o preço do produto"
            value={preco_prod}
            onChange={(e) => [setPreco_prod(e.target.value), setError('')]}
            className="mb-4"
          />

          <input type="file" id="image" name="image" onChange={e => setImage(e.target.files[0])} className="mb-4" />

          {image && (
            <center className="mb-4">
              <img src={URL.createObjectURL(image)} alt="Preview" width="100" height="100" className="rounded" />
            </center>
          )}

          <label className="text-red-500">{error}</label>
          <Button Text="Cadastrar" onClick={handleCadastro} className="mt-4" />
        </div>
      </form>
    </div>
  );
}

export default CadProdutos;
