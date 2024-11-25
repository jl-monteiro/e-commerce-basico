import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "../../components/ui/Card";
import { SearchContext } from "../../contexts/SearchContext";
import Loading from "../../components/Loading";

const ViewPedido = ({ onClose, pedido }) => {
    const [itens, setItens] = useState([])
    const [endereco, setEndereco] = useState({})
    const { loading, setLoading } = useContext(SearchContext)

    const fetchItensPedido = async () => {
        try {
            const response = await axios.get(`http://localhost:3003/sistema/itens-carrinho/${pedido.carrinhoId}`)
            setItens(response.data)
        }
        catch (error) {
            console.error(error)
        }
    }

    const fetchEndereco = async () => {
        try {
            const response = await axios.get(`http://localhost:3003/sistema/enderecos/${pedido.enderecoId}`)
            setEndereco(response.data)
        }
        catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        fetchEndereco()
        fetchItensPedido()
        setLoading(false)
    }, [])

    const base_url = "http://localhost:3003/sistema/produtos/files/users/"

    return (loading && <Loading /> || (
        <div className="container mx-auto p-4">
            
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl">Carrinho</CardTitle>
                    <CardDescription>Confirme o pedido.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        {itens.map((prod) => (
                            <div key={prod.id} className="flex items-center space-x-4 py-4 border-b border-gray-200 last:border-b-0">
                                <img
                                    className="h-20 w-20 rounded-md object-cover"
                                    src={`${base_url}${prod.produto.imagem_prod}`}
                                    alt={prod.produto.nome_prod}
                                />
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-gray-900">{prod.produto.nome_prod}</h3>
                                    <p className="text-sm text-gray-600">{prod.qtd} x R$ {parseFloat(prod.produto.preco_prod).toFixed(2)}</p>
                                </div>
                                <p className="text-lg font-semibold text-gray-900">
                                    R$ {(prod.produto.preco_prod * prod.qtd).toFixed(2)}
                                </p>

                            </div>
                        ))}
                        <div className="flex justify-between items-center py-4 border-t border-gray-200">
                            <p className="text-sm font-medium text-gray-700">Frete</p>
                            <p className="text-lg font-semibold text-gray-900">R$ 7,00</p>
                        </div>

                        <div className="mt-6">
                            <h4 className="text-xl font-semibold text-gray-800">Dados do Usuário</h4>
                            <div className="space-y-2 mt-2">
                                <p className="text-sm text-gray-600"><strong>Nome:</strong> {pedido.usuario.nome}</p>
                                <p className="text-sm text-gray-600"><strong>Login:</strong> {pedido.usuario.login}</p>
                                <p className="text-sm text-gray-600"><strong>Email:</strong> {pedido.usuario.email}</p>
                            </div>
                        </div>

                        <div className="mt-6">
                            <h4 className="text-xl font-semibold text-gray-800">Endereço de Entrega</h4>
                            <div className="space-y-2 mt-2">
                                {!endereco || !endereco.cidade ? <Loading /> : (
                                    <>
                                        <p className="text-sm text-gray-600"><strong>Rua:</strong> {endereco.logradouro}, {endereco.numero} </p>
                                        <p className="text-sm text-gray-600"><strong>Bairro:</strong> {endereco.bairro}</p>
                                        <p className="text-sm text-gray-600"><strong>Cidade:</strong> {endereco.cidade.nome_cidade}</p>
                                        <p className="text-sm text-gray-600"><strong>Estado:</strong> {endereco.estado.sigla}</p>
                                        <p className="text-sm text-gray-600"><strong>CEP:</strong> {endereco.cep}</p>
                                    </>
                                )}
                            </div>
                        </div>

                    </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                    <p className="text-lg font-medium text-gray-700">Total</p>
                    <p className="text-2xl font-bold text-gray-900">R$ {pedido.valorTotal}</p>
                </CardFooter>
            </Card>

        </div>
    ))
}

export default ViewPedido