import Card from './components/Card';
import { AdmnistracaoFields, ImplementacaoFields, ManutencaoFields, VendasFields } from './data/constants/card/fields';
import "./styles/App.css";

export default function App() {


  return (
    <div>
      <header className='container' style={{border: '3px solid white'}}>
        <h1>Matriz 5W2H</h1>
      </header>
      <main className='container'>
        <Card titulo="Administração" fields={AdmnistracaoFields} />
        <Card titulo="Implementação" fields={ImplementacaoFields} />
        <Card titulo="Manutenção" fields={ManutencaoFields} />
        <Card titulo="Vendas" fields={VendasFields} />
      </main>
    </div>
  );
}
