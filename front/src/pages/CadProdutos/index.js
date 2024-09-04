import React, { useEffect, useState } from "react";
//import { useNavigate } from 'react-router-dom';
import axios from "axios";

import Input from "../../components/form/Input";
import Button from "../../components/form/Button";

const CadProdutos = ({ onClose, produto }) => {
  const [nome_prod, setNome_prod] = useState(produto ? produto.nome_prod : "");
  const [descricao_prod, setDescricao_prod] = useState(
    produto ? produto.descricao_prod : ""
  );
  const [preco_prod, setPreco_prod] = useState(
    produto ? produto.descricao_prod : ""
  );
  const [categoriaId, setCategoriaId] = useState(produto ? produto.categoriaId : "")
  const [image, setImage] = useState("");
  const [categorias, setCategorias] = useState([])
  const [error, setError] = useState("");

  const fetchCategoria = async () => {
    try {
      const res = await axios.get("http://localhost:3003/sistema/categorias")
      setCategorias(res.data)

    }
    catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchCategoria()
  }, [])

  useEffect(() => {
    if (produto) {
      setNome_prod(produto.nome_prod);
      setDescricao_prod(produto.descricao_prod);
      setPreco_prod(produto.preco_prod);
      setCategoriaId(produto.categoriaId)
    }
  }, [produto]);

  const handleSalvar = async (e) => {
    e.preventDefault();
    console.log(image)
    if (!nome_prod || !descricao_prod || !preco_prod || !categoriaId) {
      setError("Preencha todos os campos");
      return;
    }
    if (!image) {
      setError("Insira uma imagem");
      return;
    }

    const formData = new FormData();
    formData.append("nome_prod", nome_prod);
    formData.append("descricao_prod", descricao_prod);
    formData.append("preco_prod", preco_prod);
    formData.append("categoriaId", categoriaId);
    if (image) formData.append("image", image);

    try {
      if (produto) {
        await axios.put(
          `http://localhost:3003/sistema/produtos/${produto.id}`,
          formData
        );
      } else {
        await axios.post("http://localhost:3003/sistema/produtos", formData);
      }

      onClose();
    } catch (err) {
      if (err.response) {
        setError(err.response.data.mensagem);
      } else {
        console.log("Back end desligado, tente novamente mais tarde.");
      }
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form
        encType="multipart/form-data"
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h1 className="text-2xl font-bold mb-4">Cadastro de Produtos</h1>
        <div>
          <label className="block mb-2">Nome do Produto</label>
          <Input
            type="text"
            placeholder="Digite o nome do produto"
            value={nome_prod}
            onChange={(e) => [setNome_prod(e.target.value), setError("")]}
            className="mb-4"
          />

          <label className="block mb-2">Descrição do Produto</label>
          <textarea
            placeholder="Digite a descrição do produto"
            value={descricao_prod}
            onChange={(e) => [setDescricao_prod(e.target.value), setError("")]}
            rows={5}
            className="w-full p-2 border rounded mb-4"
          />

          <label className="block mb-2">Preço do Produto</label>
          <Input
            type="number"
            placeholder="Digite o preço do produto"
            value={preco_prod}
            onChange={(e) => [setPreco_prod(e.target.value), setError("")]}
            className="mb-4"
          />

          <div className="py-4">
            <label className="block mb-2">Categoria do Produto</label>

            <select
              id="categoriaId"
              className="block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={categoriaId}
              onChange={(e) => setCategoriaId(e.target.value)}
            >
              <option value="" disabled>Selecione a categoria</option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>{categoria.nome_categoria}</option>
              ))}
            </select>
          </div>
          <input
            type="file"
            id="image"
            name="image"
            onChange={(e) => setImage(e.target.files[0])}
            className="mb-4"
          />

          {image && (
            <center className="mb-4">
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                width="100"
                height="100"
                className="rounded"
              />
            </center>
          )}

          <label className="block mb-2 text-red-500">{error}</label>
          <Button Text="Cadastrar" onClick={handleSalvar} className="mt-4" />
        </div>
      </form>
    </div>
  );
};

export default CadProdutos;
