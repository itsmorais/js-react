import { useState, useEffect } from "react";
import { inAxios } from "../config_axios";
import { useForm } from 'react-hook-form'
import ItemLista from "./ItemLista";

const ManutencaoLivro = () => {

  const { register, handleSubmit, reset } = useForm();
  const [livros, setLivros] = useState([])

  const obterLista = async () => {
    try {
      const lista = await inAxios.get("livros");
      setLivros(lista.data);
    } catch (error) {
      alert(`ERRO... não foi possível obter os dados: ${error}`)
    }
  }

  const filtrarLista = async (campos) => {
    try {
      console.log(campos)
      const lista = await inAxios.get(`livros/filtro/${campos.palavra}`)
      lista.data.length ? setLivros(lista.data)
        : alert("Não há livros com a palavra pesquisada!")

    } catch (error) {
      alert(`ERRO... Não foi possível obter dados: ${error}`)

    }
  }

  useEffect(() => {
    obterLista();
  }, [])


  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-7">
          <h4 className="fst-italic mt-3">Manutenção</h4>
        </div>
        <div className="col-sm-5">
          <form onSubmit={handleSubmit(filtrarLista)}>
            <div className="input-group mt-3">
              <input type="text" className="form-control"
                placeholder="Título ou autor" required {...register("palavra")} />
              <input type="submit" className="btn btn-primary" value="Pesquisar" />
              <input type="button" className="btn btn-danger" value="Todos"
                onClick={() => { reset({ palavra: "" }); obterLista(); }} />
            </div>
          </form>
        </div>
      </div>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Cód.</th><th>Título</th>
            <th>Autor</th>
            <th>Ano</th>
            <th>Preço R$</th>
            <th>Foto</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {livros.map((livro) => (
            <ItemLista key={livro.id} id={livro.id} titulo={livro.titulo}
              autor={livro.autor} ano={livro.ano} preco={livro.preco}
              foto={livro.foto} />
          ))}
        </tbody>
      </table>
    </div>
  )
}


export default ManutencaoLivro;