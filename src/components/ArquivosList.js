import useFetch from '../useFetch.js';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Aviso from '../Aviso.jpg'
import InputMask from "react-input-mask";


const ArquivosList = () =>
{
  const navigate = useNavigate();

  const { register, handleSubmit, getValues, formState: { errors } } = useForm({
    defaultValues: {
      CPF: "",
      Carteira: "",
      AnoReferencia: ""
    }
  });

  let urlApi = `${process.env.REACT_APP_API_URL}Arquivo`

  const { data, loading, error, refetch } = useFetch(urlApi);



  const onSubmit = (data) =>
  {
    // alert(JSON.stringify(data));
    if ((data.anoReferencia !== "") && (data.CPF !== ""))
    {
      data.CPF = data.CPF.replace(/\D/g,'');;
      navigate('/CartoesBeneficiario', { state: { data: data } });
    }

  };

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

  if (error) console.log(error);

  const getAnos = () =>
  {
    return data.map(({ anoReferencia }) =>
    {
      return <option key={anoReferencia} value={anoReferencia}>{anoReferencia}
      </option>;
    });
  }

  if (data)
  {

    return (
      
      <>

        <div className="container mt-10  ml-60  px-4">

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="w-60 text-align">
           
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Ano de Referência
              </label>
              <div className="relative">



                <select {...register("AnoReferencia", { required: true })} 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 
                           dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
                           dark:focus:border-blue-500"
                  id="anoRef-select">

                  {getAnos()}

                </select>
                {errors.AnoReferencia && <p className='text-red-500'>Ano obrigatório!</p>}

              </div>

              <InputMask  {...register("CPF")} placeholder='CPF' mask='999.999.999-99' maskChar={null} id="small-input" className="mt-5 block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />

            {/*   <input placeholder='CPF'
                {...register("CPF", {
                  required: true,
                  minLength: 11,
                  maxLength: 11,
                  pattern: /^(0|[0-9][0-9]*)$/
                })} type="text" id="small-input" className="mt-5 block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
               {errors.CPF && <p className="text-red-500">CPF Inválido!</p>} */}

              <div className='mt-6'>
                <button type="Submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Informe IR
                </button>
              </div>
            </div>
          </form>
        </div>
      </>
    );


  }
  else
  {
    return (
      <>

        <div className="flex justify-center ...">

          <div> <img src={Aviso} className="mx-auto ml-10 w-24 h-24 ..." alt="Aviso" /></div>

        </div>

        <div className="flex justify-center ...">
          <div>
            <label className="block  tracking-wide text-gray-700 text-xs font-bold mb-2">
              Informe para Imposto de Renda não disponível!
            </label>
          </div>

        </div>
      </>
    )

  }
}


export default ArquivosList;