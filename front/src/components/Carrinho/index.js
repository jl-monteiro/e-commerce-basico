import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "../form/Button";
import { CiTrash } from "react-icons/ci";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";
import { Confirm } from 'react-admin';
import Loading from "../../components/Loading";
import { SearchContext } from "../../contexts/SearchContext";
import useAuth from "../../hooks/useAuth";

const Carrinho = ({ onClose }) => {
    const [totalCarrinho, setTotalCarrinho] = useState(0);
    const [openDialog, setOpenDialog] = useState(false);
    const [idRemove, setIdRemove] = useState(null);

    const { loading, setLoading, carrinho, setCarrinho, carrinhoId } = useContext(SearchContext);
    const { user } = useAuth();

    useEffect(() => {
        const total = carrinho.reduce((acc, prod) => acc + prod.produto.preco_prod * prod.qtd, 0);
        setTotalCarrinho(total);
        setLoading(false);
    }, [carrinho, setLoading, user]);

    const handleClick = (prodId) => {
        setOpenDialog(true);
        setIdRemove(prodId);
        console.log(prodId)
    };

    const handleDialogClose = () => setOpenDialog(false);

    const handleRemoveProd = async () => {
        try {
            await axios.delete(`http://localhost:3003/sistema/itens-carrinho/${carrinhoId}/${idRemove}`);
            const newCarrinho = carrinho.filter((prod) => prod.produto.id !== idRemove);
            setCarrinho(newCarrinho);
        } catch (error) {
            console.error("Erro ao remover item do carrinho:", error);
        } finally {
            setOpenDialog(false);
        }
    };


    const handleQtd = async (id, quant) => {
        const newCarrinho = carrinho.map((prod) => {
            if (prod.produto.id === id) {
                const newQtd = prod.qtd + quant;

                if (newQtd > 0) {
                    return { ...prod, qtd: newQtd };
                } else {
                    return null;
                }
            }
            return prod;
        }).filter(Boolean);

        setCarrinho(newCarrinho);

        try {
            await axios.put(`http://localhost:3003/sistema/itens-carrinho/${carrinhoId}/${id}`, { qtd: newCarrinho.find(prod => prod.produto.id === id).qtd });
        } catch (error) {
            console.error("Erro ao atualizar quantidade:", error);
        }
    };
    const base_url = "http://localhost:3003/sistema/produtos/files/users/"

    return (
        (loading ? <Loading /> :
            <div className="w-96">
                <Confirm
                    isOpen={openDialog}
                    title="Deletar item do carrinho?"
                    content="Tem certeza que deseja deletar este item?"
                    onConfirm={handleRemoveProd}
                    onClose={handleDialogClose}
                    confirm="Deletar"
                    cancel="Cancelar"
                />
                <h1 className="text-3xl font-bold mb-6 align-middle text-center">Carrinho</h1>
                {carrinho.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                        <p className="text-lg font-semibold text-gray-800">Seu carrinho está vazio.</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="bg-gray-100 p-6">
                            <div className="space-y-6">
                                {carrinho.map((prod) => (
                                    <div key={prod.produto.id} className="flex items-center justify-between border-b border-gray-300 pb-4 last:border-none">
                                        <div>
                                            <img className="h-16 w-full object-cover md:w-16" src={`${base_url}${prod.produto.imagem_prod}`} alt={prod.produto.nome_prod} />
                                            <h3 className="text-lg font-semibold text-gray-800">{prod.produto.nome_prod}</h3>
                                            <p className="text-gray-600">{prod.qtd} x R$ {parseInt(prod.produto.preco_prod).toFixed(2)}</p>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <div className="text-right">
                                                <p className="font-semibold text-gray-800">R$ {parseInt(prod.produto.preco_prod * prod.qtd).toFixed(2)}</p>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    className="text-gray-600 hover:text-gray-800 focus:outline-none"
                                                    onClick={() => handleQtd(prod.produto.id, -1)}
                                                    disabled={prod.qtd <= 1}
                                                >
                                                    <IoRemoveCircleOutline size={20} />
                                                </button>
                                                <p>{prod.qtd}</p>
                                                <button
                                                    className="text-gray-600 hover:text-gray-800 focus:outline-none"
                                                    onClick={() => handleQtd(prod.produto.id, 1)}
                                                >
                                                    <IoAddCircleOutline size={20} />
                                                </button>
                                                <button
                                                    className="text-gray-600 hover:text-red-600 focus:outline-none"
                                                    onClick={() => handleClick(prod.produtoId)}
                                                >
                                                    <CiTrash size={20} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex items-center justify-between border-t border-gray-300 pt-4 mt-6">
                                <p className="font-semibold text-gray-800">Total:</p>
                                <p className="text-2xl font-bold text-gray-900">R$ {totalCarrinho.toFixed(2)}</p>
                            </div>
                            <Link to="/compra" onClick={onClose}>
                                <Button Text="Finalizar Compra" className="w-full mt-6 rounded-lg py-2 px-4 transition duration-300" />
                            </Link>
                        </div>
                    </div>
                )}
            </div>)
    );
};

export default Carrinho;
