import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { SearchContext } from "../../contexts/SearchContext";
import Loading from "../../components/Loading";
import useAuth from "../../hooks/useAuth";

const Endereco = ({ onClose }) => {
  const { loading, setLoading } = useContext(SearchContext);
  const { user } = useAuth()

  const [estadoSelecionado, setEstadoSelecionado] = useState("");
  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [cidadesFiltradas, setCidadesFiltradas] = useState([]);

  const [cidade, setCidade] = useState(0)
  const [logradouro, setLogradouro] = useState("")
  const [numero, setNumero] = useState("")
  const [complemento, setComplemento] = useState("")
  const [bairro, setBairro] = useState("")
  const [cep, setCep] = useState("")
  const [error, setError] = useState("")

  const fetchDados = async () => {
    try {
      const responseEstados = await axios.get("http://localhost:3003/sistema/estados");
      setEstados(responseEstados.data);

      const responseCidades = await axios.get("http://localhost:3003/sistema/cidades");
      setCidades(responseCidades.data);
    } catch (err) {
      console.error("Erro ao buscar dados:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDados();
  }, []);

  const handleSalvar = async (e) => {
    e.preventDefault()
    if (!logradouro || !numero || !complemento || !bairro || !cep || !cidade) {
      setError("Preencha todos os campos!")
      console.log(logradouro, numero, complemento, bairro, cep, cidade)
      return
    }
    try {
      await axios.post("http://localhost:3003/sistema/enderecos", {
        logradouro,
        numero,
        complemento,
        bairro,
        cep,
        cidadeId: cidade,
        usuarioId: user.id
      })
    } catch (err) {
      console.error("Erro ao salvar dados:", err);
    }
    finally{
      onClose()
    }
  }

  const handleEstadoChange = (e) => {
    const idEstado = e.target.value;
    setEstadoSelecionado(idEstado);

    const filtrarCidades = cidades.filter((cidade) => cidade.estadoId === parseInt(idEstado, 10));

    setCidadesFiltradas(filtrarCidades);
  };

  return (
    (loading && <Loading />) || (
      <div className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg sm:max-w-[425px] w-full">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Novo Endereço</h2>
            <p className="text-sm text-gray-600">Adicione um novo endereço à sua conta.</p>
          </div>
          <form className="grid gap-4">
            <div className="grid gap-2">
              <label htmlFor="estado" className="block text-sm font-medium text-gray-700">Estado</label>
              <select
                id="estadoId"
                className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={estadoSelecionado}
                onChange={handleEstadoChange}
              >
                <option value="" disabled>Selecione o estado</option>
                {estados.map((estado) => (
                  <option key={estado.id} value={estado.id}>{estado.nome_estado}</option>
                ))}
              </select>
            </div>
            <div className="grid gap-2">
              <label htmlFor="cidade" className="block text-sm font-medium text-gray-700">Cidade</label>
              <select
                id="cidadeId"
                className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                disabled={!estadoSelecionado}
                onChange={(e) => setCidade(e.target.value)}
              >
                <option value="" disabled>Selecione a cidade</option>
                {cidadesFiltradas.map((cidade) => (
                  <option key={cidade.id} value={cidade.id}>{cidade.nome_cidade}</option>
                ))}
              </select>
            </div>
            <div className="grid gap-2">
              <label htmlFor="logradouro" className="block text-sm font-medium text-gray-700">Logradouro</label>
              <input
                id="logradouro"
                type="text"
                placeholder="Rua, Avenida, etc."
                className="block w-full border-gray-300 rounded-md shadow-sm sm:text-sm focus-visible:outline-none"
                onChange={(e) => setLogradouro(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="numero" className="block text-sm font-medium text-gray-700">Número</label>
              <input
                id="numero"
                type="text"
                placeholder="Número do endereço"
                className="block w-full border-gray-300 rounded-md shadow-sm sm:text-sm focus-visible:outline-none"
                onChange={(e) => setNumero(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="complemento" className="block text-sm font-medium text-gray-700">Complemento</label>
              <input
                id="complemento"
                type="text"
                placeholder="Apartamento, casa, etc."
                className="block w-full border-gray-300 rounded-md shadow-sm sm:text-sm focus-visible:outline-none"
                onChange={(e) => setComplemento(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="Bairro" className="block text-sm font-medium text-gray-700">Bairro</label>
              <input
                id="Bairro"
                type="text"
                placeholder="Bairro"
                className="block w-full border-gray-300 rounded-md shadow-sm sm:text-sm focus-visible:outline-none"
                onChange={(e) => setBairro(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="CEP" className="block text-sm font-medium text-gray-700">CEP</label>
              <input
                id="CEP"
                type="text"
                placeholder="00000-000"
                className="block w-full border-gray-300 rounded-md shadow-sm sm:text-sm focus-visible:outline-none"
                onChange={(e) => setCep(e.target.value)}
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="flex justify-end gap-4 mt-4">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600"
                onClick={handleSalvar}
              >
                Salvar endereço
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md shadow-sm hover:bg-gray-100"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default Endereco;
