import useFetch from '../useFetch.js';


function ArquivosList()
{
  const { data, loading, error, refetch } = useFetch("https://localhost:7095/api/Arquivo");

  const handleChange = event => {
    console.log(event.target.value);
  };
  
  if (loading) return <h1> LOADING...</h1>;

  if (error) console.log(error);

  if (data)
  {
    return (
      <>
        {data.map(({ id, anoReferencia, nome }) => (
          <p key={id}>{anoReferencia}</p>
        ))}
      </>
    );


  }
}


export default ArquivosList;