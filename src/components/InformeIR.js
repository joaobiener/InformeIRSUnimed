import { useLocation } from "react-router-dom";
import useFetch from '../useFetch.js';
import { useNavigate } from "react-router-dom";
import React, { useRef } from "react";
import { useReactToPrint } from 'react-to-print';
import Logo from '../layout_set_logo.png'

const InformeIR = () =>
{
  const componentRef = useRef();
  const handePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'emp-data'
  });

  const navigate = useNavigate();
  const location = useLocation();

  let urlApi = `https://localhost:7095/api/InformeIRValores/BuscaPorAnoContratoDocumentoTitular/${location.state.ano}/${location.state.Contrato}/${location.state.DocumentoTitular}`;


  const { data, loading, error, refetch } = useFetch(urlApi);


  const GetInfoIRPDF = (data) =>
  {
    navigate('/InformePDFNovo',
      {
        state:
        {
          data: data
        }
      });

  };

  var cpf = "00000000000";
  var matricula = "0000000000000";


  const formataData = (data) =>
  {
    //retira os caracteres indesejados...

    //realizar a formatação...
    return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(data);

  }
  const formataMatricula = (matricula) =>
  {
    //retira os caracteres indesejados...
    matricula = matricula.replace(/[^\d]/g, "");

    //realizar a formatação...
    return matricula.replace(/(\d{4})(\d{6})(\d{2})(\d{1})/, "$1.$2.$3-$4");
  }

  const formataCPF = (cpf) =>
  {
    //retira os caracteres indesejados...
    cpf = cpf.replace(/[^\d]/g, "");

    //realizar a formatação...
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }

  const formateCurrency = (valor) =>
  {
    return valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
  }


  if (!data) return
  (


    <div className="container mx-auto mt-10 px-4">

      <div>
        <svg className="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
        </svg>
        <span className="sr-only">carregando...</span>
      </div>
    </div>

  );


  if (data)
  {
    let temPagamentos = data.filter(data => data.tipoRegisto <= 2).length > 0
    let temReembolso = data.filter(data => data.tipoRegisto >= 3).length > 0

    return (
      <>

        {/* <button onClick={() => GetInfoIRPDF(data)} type="button" className="inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out">Download IR</button> */}
        <button onClick={() => navigate(-1)} type="button" className="inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out">Voltar</button>
        <button onClick={handePrint} type="button" className="inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out">Imprimir</button>

        <div ref={componentRef} className="container mx-auto mt-5 px-4">
          <div className="overflow-x-auto relative shadow-md sm:rounded-lg mb-5">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                  <th colspan="1" scope="col" className="py-3 px-6 ">
                  <img src={Logo}/>
                  </th>
                  <th colspan="1" scope="col" className="py-3 px-6 ">
                  <span className="inline uppercase">
                        Unimed São Gonçalo/Niteroi 
                    <br/>Cooperativa de trabalho médico 
                    <br/>Rua Dr. Borman 51 Centro - CEP: 24020-320 - NITEROI-RJ
                    <br/>CPNJ 28.630.531/0001-87 - INSC. ESTADUAL ISENTO
                  </span>
                  </th>
                  <th colspan="1" scope="col" className="py-3 px-4 ">
                   ANS - Nº 34.3731
                  </th>
                </tr>
                <tr>
                  <th scope="col" className="py-3 px-6 ">
                  
                  </th>
                  <th scope="col" className="py-3 px-6 ">
                  Informe de Pagamento -  <span className="text-red-800">{data[0].anoReferencia}</span>
                  </th>
                  <th scope="col" className="py-3 px-4 ">
                
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Cliente
                  </th>
                  <td className="py-4 px-6">
                    {data[0].nomeTitular} - CPF: {formataCPF(data[0].documentoTitular)}
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Contrato
                  </th>
                  <td className="py-4 px-6">
                    {data[0].contrato}
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Codigo Beneficiário
                  </th>
                  <td className="py-4 px-6">
                    {formataMatricula(data[0].codigoCartaoTitular)}
                  </td>
                </tr>

              </tbody>
            </table>
          </div>


          {temPagamentos &&
            <>
              <h3 className="px-5">Usuários:</h3>
              <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="py-2 inline-block min-w-full sm:px-4 lg:px-4">
                    <div className="overflow-hidden">
                      <table className="min-w-full">
                        <thead className="bg-white border-b">


                          <tr>

                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                              CPF
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                              Data de Inclusão
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                              Grau de Parantesco
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                              Nome
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-right">
                              Valor Pago
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.filter(data => data.tipoRegisto <= 2).map((pagamento, index) => (

                            <tr key={index} className="border-b transition duration-300 ease-in-out hover:bg-gray-100">

                              <td className="text-xs text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {formataCPF(pagamento.documentoBenefiario)}
                              </td>
                              <td className="text-xs text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {pagamento.dataInclusaoBeneficiario.substring(0, 10)}
                              </td>
                              <td className="text-xs text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {pagamento.tipoDependencia}
                              </td>
                              <td className="text-xs text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {pagamento.nomeBeneficiario}
                              </td>
                              <td className="text-xs text-gray-900 font-light px-6 py-4 whitespace-nowrap text-right">
                                {formateCurrency(pagamento.valorInforme)}
                              </td>

                            </tr>

                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </>
          }
          {temReembolso &&
            <>
              <h3 className="px-5 py-4">Reembolso:</h3>
              <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                      <table className="min-w-full">
                        <thead className="bg-white border-b">
                          <tr>

                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                              Matricula
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-right">
                              Valor Reembolsado
                            </th>

                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                              Emissor
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                              CPF/CNPJ
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.filter(data => data.tipoRegisto >= 3).map((reembolso, index) => (

                            <tr className="border-b transition duration-300 ease-in-out hover:bg-gray-100">

                              <td className="text-xs text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {reembolso.codigoCartaoBeneficiario}
                              </td>
                              <td className="text-xs text-gray-900 font-light px-6 py-4 whitespace-nowrap text-right">
                                {formateCurrency(reembolso.valorInforme)}
                              </td>
                              <td className="text-xs text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {reembolso.nomeBeneficiario}
                              </td>
                              <td className="text-xs text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {reembolso.documentoBenefiario}
                              </td>


                            </tr>

                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </>
          }
        </div>
      </>
    )

  }
}



export default InformeIR