import { useLocation } from "react-router-dom";
import useFetch from '../useFetch.js';
import { useNavigate } from "react-router-dom";
import Aviso from '../Aviso.jpg'
import { redirect } from "react-router-dom";

const CartoesBeneficiario = () =>
{
  const navigate = useNavigate();
  const location = useLocation();

  //let urlApi = `https://localhost:7095/api/InformeIRValores/BuscaPorAnoCartoesBenef/${location.state.data.AnoReferencia}/${location.state.data.CPF}`;


  const formataMatricula = (matricula) =>
  {
    //retira os caracteres indesejados...
    matricula = matricula.replace(/[^\d]/g, "");

    //realizar a formatação...
    return matricula.replace(/(\d{4})(\d{6})(\d{2})(\d{1})/, "$1.$2.$3-$4");
  }

  let urlApi = `${process.env.REACT_APP_API_URL}InformeIRValores/BuscaPorAnoCartoesBenef/${location.state.data.AnoReferencia}/${location.state.data.CPF}`;
  const { data, loading, error, refetch } = useFetch(urlApi);


  if (loading) 
  {
    return (

      <div className="text-center mt-10">
        <button disabled type="button" className="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center">
          <svg role="status" className="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
          </svg>
          Carregando...
        </button>
      </div>

    )
  }

  const GetInfoIR = (AnoReferencia, contrato, documentoTitular) =>
  {
    //console.log(`contato: ${contrato} CPF do Titular = ${documentoTitular}`);
    navigate('/InformeIR',
      {
        state:
        {
          ano: AnoReferencia,
          Contrato: contrato,
          DocumentoTitular: documentoTitular
        }
      });
  };



  if (data)
  {
    if (data.length===0) {
      return (
        <>
          <div className="text-center mt-10">
              <button onClick={() => navigate(-1)} type="button" className="inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out">Voltar</button>
          </div>

          <div className="flex justify-center mt-5">
                
          <div> <img src={Aviso} className="mx-auto ml-10 w-24 h-24 ..." alt="Aviso" /></div>
          
                  <label className="block  tracking-wide text-gray-700 text-xs font-bold mt-7">
                  Informe para Imposto de Renda não disponível!
                </label>
            </div>
          
        
        </>
      )

    }

    return (
      <>

        <div className="container mx-auto mt-5 px-4">
          <button onClick={() => navigate(-1)} type="button" className="inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out">Voltar</button>

          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full">
                    <thead className="bg-white border-b">
                      <tr>

                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                          Cartão de Beneficiário
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                          Contrato
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">

                        </th>
                      </tr>
                    </thead>
                    <tbody>

                      {data.map(({ codigoCartaoBeneficiario, documentoBenefiario, documentoTitular, contrato, anoReferencia, index }) => (
                        <tr key="{index}" className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">

                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {formataMatricula(codigoCartaoBeneficiario)}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {contrato}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            <button onClick={() => GetInfoIR(anoReferencia, contrato, documentoTitular)} type="button" className="inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out">Download IR</button>
                          </td>
                        </tr>

                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )

  }
}


export default CartoesBeneficiario;