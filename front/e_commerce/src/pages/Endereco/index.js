import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { SearchContext } from "../../contexts/SearchContext";
import Loading from "../../components/Loading";

const Endereco = ({ onClose }) => {
  const { loading, setLoading } = useContext(SearchContext);
  const [estadoSelecionado, setEstadoSelecionado] = useState("");
  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [cidadesFiltradas, setCidadesFiltradas] = useState([]);

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
                id="estado"
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
                id="cidade"
                className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                disabled={!estadoSelecionado}
              >
                <option value="" disabled>Selecione a cidade</option>
                {cidadesFiltradas.map((cidade) => (
                  <option key={cidade.id} value={cidade.nome_cidade}>{cidade.nome_cidade}</option>
                ))}
              </select>
            </div>
            <div className="grid gap-2">
              <label htmlFor="street" className="block text-sm font-medium text-gray-700">Logradouro</label>
              <input
                id="street"
                type="text"
                placeholder="Rua, Avenida, etc."
                className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="number" className="block text-sm font-medium text-gray-700">Número</label>
              <input
                id="number"
                type="text"
                placeholder="Número do endereço"
                className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="complement" className="block text-sm font-medium text-gray-700">Complemento</label>
              <input
                id="complement"
                type="text"
                placeholder="Apartamento, casa, etc."
                className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="neighborhood" className="block text-sm font-medium text-gray-700">Bairro</label>
              <input
                id="neighborhood"
                type="text"
                placeholder="Bairro"
                className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="zip" className="block text-sm font-medium text-gray-700">CEP</label>
              <input
                id="zip"
                type="text"
                placeholder="00000-000"
                className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="flex justify-end gap-4 mt-4">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600"
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
