import {Routes, Route} from 'react-router-dom'
import MenuSuperior from "./components/MenuSuperior";
import InlcusaoLivros from "./components/InclusaoLivros"
import ManutencaoLivro from './components/ManutencaoLivros';
import ResumoLivros from './components/ResumoLivros';
const App = () => {
  return(
    <>
    <MenuSuperior/>
    <Routes>
      <Route path='/' element={<InlcusaoLivros/>}/>
      <Route path='manut' element={<ManutencaoLivro/>}/>
      <Route path='resumo' element={<ResumoLivros/>}/>
    </Routes>
    </>
  )
  };
  export default App;