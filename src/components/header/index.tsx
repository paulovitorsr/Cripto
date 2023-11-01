import styles from './header.module.css';
import logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className={styles.container}>
        <div className={styles.logo}>
         <Link to="/">
            <img src={logo} alt="Logo cripto" />
         </Link>
        </div>
    </header>
  )
}
