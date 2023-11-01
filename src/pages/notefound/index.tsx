import { Link } from 'react-router-dom';
import styles from './noteFound.module.css';

const Notefound = () => {
    return (
      <div className={styles.container}>
        <h1>Erro 404</h1>
        <h2>Página não existe</h2>
        <Link to="/">
          Acessar cripto moedas
        </Link>
      </div>
    )
  }
  
  export default Notefound