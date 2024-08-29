import React, { useContext, useState, useEffect } from 'react'
import { SearchContext } from '../../contexts/SearchContext';

import Loading from '../../components/Loading';
import { IoMdClipboard } from "react-icons/io";

import {QrCodePix} from 'qrcode-pix'

const Pagamento = () => {
    const [totalCarrinho, setTotalCarrinho] = useState(0)
    const { loading, setLoading, carrinho } = useContext(SearchContext)
    const [qrCode, setQrCode] = useState('');
    const [rawPix, setRawPix] = useState('');

    
    useEffect(() => {
        const total = carrinho.reduce(
            (acc, prod) => acc + prod.preco_prod * prod.qtd,
            0
        );
        setTotalCarrinho(total);
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
        setLoading(false)
    }, [carrinho, setLoading]);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(rawPix);
            console.log('Texto copiado para a área de transferência');
        } catch (err) {
            console.log('Falha ao copiar o texto', err);
        }
    };

    useEffect(() => {
        async function generateDynamicPix() {
            /*
                version: '01' //versão do pix (não altere)
                key: chave pix
                name: seu nome/empresa
                city: sua cidade
                transactionId: é o identificador que aparecerá no momento do pix (max: 25 caracteres)
                message: mensagem que aparecerá no momento do pix (opcional)
                value: valor que você quer cobrar (opcional)
            */
            const qrCodePix = QrCodePix({
                version: '01',
                key: 'a1e4b310-aa65-469a-bf57-e2cad6923b54',
                name: 'Joao Lucas Monteiro Pantaleao',
                city: 'Criciuma',
                transactionId: 'jlcommerce',
                value: totalCarrinho,
            })

            const rawPixStr = qrCodePix.payload()
            const qrCodeBase64 = await qrCodePix.base64()

            setRawPix(rawPixStr)
            setQrCode(qrCodeBase64)
        }

        generateDynamicPix();
    }, [totalCarrinho])

    
    return (
        (loading && <Loading />) || (

            <div className="w-full max-w-md p-6 mx-auto bg-white shadow-md rounded-lg">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Pagamento via Pix</h1>
                <p className="mb-4 text-gray-700">
                    Para concluir o pagamento, utilize o QR Code abaixo ou copie os dados para fazer o pagamento via Pix.
                </p>
                <p className="mt-4 mb-6 text-gray-700">
                    Ou copie os dados abaixo:
                </p>

                <div className="flex justify-center mb-4">
                    <img src={qrCode} alt='QR Code pix' />
                </div>

                <div className="relative mb-6">
                    <code className="block p-4 bg-gray-100 border border-gray-300 rounded-md text-gray-800 break-all">{rawPix}</code>
                    <IoMdClipboard className="cursor-pointer" onClick={copyToClipboard}/>
                </div>

                <p className="font-semibold text-lg text-gray-800">Valor: R$ {totalCarrinho.toFixed(2)}</p>
            </div>
        ))
}

export default Pagamento