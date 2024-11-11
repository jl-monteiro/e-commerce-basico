import React, { useContext, useEffect, useState } from "react"
import Loading from "../../components/Loading"
import { SearchContext } from "../../contexts/SearchContext";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "../../components/ui/Card";
import Button from "../../components/form/Button";
import Modal from "../../components/Modal";
import ViewPedido from '../ViewPedido'

const GerenciarPedidos = () => {
    const [isModalPedidoOpen, setIsModalPedidoOpen] = useState(false)
    const [pedidoVisualizado, setPedidoVisualizado] = useState(null)
    const [pedidos, setPedidos] = useState([])
    const [cidadeEstado, setCidadeEstado] = useState([])

    const [error, setError] = useState("")

    const { loading, setLoading } = useContext(SearchContext);

    const openModalPedido = (tipo, pedido = null) => {
        setIsModalPedidoOpen(true)
        setPedidoVisualizado(pedido)
    }
    const closeModalPedido = () => setIsModalPedidoOpen(false)

    const fetchCidadeEstado = async (pedido) => {
        try {
            const res = await axios.get(`http://localhost:3003/sistema/cidades/${pedido.endereco.cidadeId}`)
            return res.data
        } catch (error) {
            console.error(error)
            return
        }
    }

    useEffect(() => {
        const fetchPedidos = async () => {
            try {
                const response = await axios.get("http://localhost:3003/sistema/pedidos")
                setPedidos(response.data)

                const cidadesData = {};
                for (const pedido of response.data) {
                    const cidade = await fetchCidadeEstado(pedido);
                    if (cidade) {
                        cidadesData[pedido.endereco.cidadeId] = cidade;
                    }
                }
                setCidadeEstado(cidadesData)

            }
            catch (err) {
                console.error(err)
            }
        }

        fetchPedidos()
        setLoading(false)
    }, [])


    return (
        (loading && <Loading />) || (
            <div className="flex flex-col container mx-auto p-6 items-center justify-center">
                <h1 className="text-3xl font-bold mb-4 text-gray-800">Visualizar Pedidos</h1>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold">Pedidos</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div>
                            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="p-4 text-left">ID</th>
                                        <th className="p-4 text-left">Nome do recebdor</th>
                                        <th className="p-4 text-left">CPF do recebedor</th>
                                        <th className="p-4 text-left">Status</th>
                                        <th className="p-4 text-left">Endereço</th>
                                        <th className="p-4 text-left">Valor Total</th>
                                        <th className="p-4 text-left">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pedidos.map((pedido) => {
                                        const cidade = cidadeEstado[pedido.endereco.cidadeId];
                                        const cidadeNome = cidade ? cidade.nome_cidade : "Carregando...";
                                        const estadoNome = cidade ? cidade.estado.nome_estado : "Carregando...";

                                        return (
                                            <tr key={pedido.id} className="border-b hover:bg-gray-50">
                                                <td className="p-4 text-left">{pedido.id}</td>
                                                <td className="p-4 text-medium">{pedido.nome_recebedor}</td>
                                                <td className="p-4 text-medium">{pedido.cpf_recebedor}</td>
                                                <td className="p-4 text-medium">{pedido.status}</td>
                                                <td className="p-4 text-medium">{pedido.endereco.logradouro},
                                                    {pedido.endereco.logradouro}, {pedido.endereco.numero}, {pedido.endereco.bairro},
                                                    {cidadeNome}, {estadoNome}
                                                </td>
                                                <td className="p-4 text-medium">{pedido.valorTotal}</td>
                                                <td className="p-4 flex space-x-2 bg-right">
                                                    <Button
                                                        Text="Visualizar itens"
                                                        onClick={() => openModalPedido("visualizar", pedido)}
                                                    />
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        {error && <label className="block mt-4 text-red-500">{error}</label>}
                    </CardContent>
                    <CardFooter>

                    </CardFooter>
                </Card>
                <Modal isOpen={isModalPedidoOpen} onClose={closeModalPedido}>
                    <ViewPedido onClose={closeModalPedido} pedido={pedidoVisualizado} />
                </Modal>
            </div>
        )
    )
}



export default GerenciarPedidos