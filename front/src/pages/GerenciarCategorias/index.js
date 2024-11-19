import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import Button from "../../components/form/Button";
import Modal from "../../components/Modal";

import { SearchContext } from "../../contexts/SearchContext";
import Loading from "../../components/Loading";
import CadCategoria from "../CadCategoria";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";

const GerenciarCategorias = () => {
    const [isModalCategoriaOpen, setIsModalCategoriaOpen] = useState(false);
    const [categoriaEmEdicao, setCategoriaEmEdicao] = useState(null);
    const [categorias, setCategorias] = useState([])

    const [error, setError] = useState("")

    const { loading, setLoading } = useContext(SearchContext);

    const openModalCategoria = (tipo, categoria = null) => {
        setCategoriaEmEdicao(categoria)
        setIsModalCategoriaOpen(true)
    }

    const closeModal = () => {
        setIsModalCategoriaOpen(false)
    };

    const handleExcluirCategoria = async (id) => {
        console.log(id)
        try {
            await axios.delete(`http://localhost:3003/sistema/categorias/${id}`)
            const response = await axios.get(
                "http://localhost:3003/sistema/categorias"
            );
            setCategorias(response.data);
        }
        catch (error) {
            console.error("erro: ", error)
            setError(error.response.data.error)
        }
    }

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await axios.get("http://localhost:3003/sistema/categorias")
                setCategorias(response.data)
            }
            catch (error) {
                console.error(error)
            }
        }
        fetchCategorias()
        setLoading(false);
    }, [isModalCategoriaOpen]);

    return (
        (loading && <Loading />) || (
            <div className="flex flex-col container mx-auto p-6 items-center justify-center">
                <h1 className="text-3xl font-bold mb-4 text-gray-800">Gerenciar Categorias</h1>
                <div className="flex space-x-4 mb-6">
                    <Button Text="Cadastrar Produto" onClick={openModalCategoria} />
                </div>
                <Card className="flex-grow shadow-lg rounded-lg">
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold">Categorias</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div>
                            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="p-4 text-left">ID</th>
                                        <th className="p-4 text-left">Nome</th>
                                        <th className="p-4 text-left">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categorias.map((categoria) => (
                                        <tr key={categoria.id} className="border-b hover:bg-gray-50">
                                            <td className="p-4 text-left">{categoria.id}</td>
                                            <td className="p-4 text-medium">{categoria.nome_categoria}</td>
                                            <td className="p-4 flex space-x-2 bg-right">
                                                <Button
                                                    Text="Editar"
                                                    onClick={() => openModalCategoria("editar", categoria)}
                                                />
                                                <Button
                                                    Text="Excluir"
                                                    onClick={() => handleExcluirCategoria(categoria.id)}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {error && <label className="block mt-4 text-red-500">{error}</label>}
                    </CardContent >
                </Card >
                <Modal isOpen={isModalCategoriaOpen} onClose={closeModal}>
                    <CadCategoria onClose={closeModal} categoria={categoriaEmEdicao} />
                </Modal>
            </div >
        )
    )
}

export default GerenciarCategorias