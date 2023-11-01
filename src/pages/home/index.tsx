import { Link, useNavigate } from 'react-router-dom';
import styles from './home.module.css';

import { BiSearch } from 'react-icons/bi'
import { FormEvent, useEffect, useState } from 'react';

//https://coinlib.io/api/v1/coinlist?key=7ce8203374c71b9a&pref=BRL
//http://https//sujeitoprogramador.com/api-cripto/?key=b4cd8f8fb3de94c6

interface CoinProps {
  name: string;
  delta_24h: string;
  price: string;
  symbol: string;
  volume_24h: string;
  market_cap: string;
  formatedPrice: string;
  formatedMarket: string;
  numberDelta?: number;
}

interface DataProps {
  coins: CoinProps[];
}

const Home = () => {
  const [coin, setCoin] = useState<CoinProps[]>([]);
  const [inputValue, setInputValue] = useState("");

  const navigate = useNavigate();

  useEffect( () => {
    function getData() {
      fetch('https://sujeitoprogramador.com/api-cripto/?key=b4cd8f8fb3de94c6')
      .then(response => response.json())
      .then( (data: DataProps) => {
          const coninsData = data.coins.slice(0, 15)


          const price = Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
          })

          const formatResult = coninsData.map( (item) => {
            const formated = {
              ...item,
              formatedPrice: price.format(Number(item.price)),
              formatedMarket: price.format(Number(item.market_cap)),
              numberDelta: parseFloat(item.delta_24h.replace(",","."))
            }

            return formated;
          } )
          

          setCoin(formatResult)

      } )
      .catch( (err) => {
        console.log(err)
      } )
    }

    getData()
  }, [] )

  function handleSearch(e: FormEvent) {
    e.preventDefault();

    if(inputValue === "") return;

    navigate(`/detail/${inputValue}`);
  }

  return (
    <main className={styles.container}>
      <form className={styles.form} onSubmit={handleSearch}>
        <input 
          type="text" 
          placeholder='Digite o símbolo da moeda ex: BTG..'
          value={inputValue}
          onChange={ (e) => setInputValue(e.target.value) }
        />
        <button type='submit'>
          <BiSearch size={30} color="#fff"/>
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th scope='col'>Moeda</th>
            <th scope='col'>Valor mercado</th>
            <th scope='col'>Preço</th>
            <th scope='col'>Volume</th>
          </tr>
        </thead>

        <tbody>
          {coin.map( coin => (
            <tr key={coin.name} className={styles.tr}>
              <td className={styles.tdLabel} data-label="Moeda">
                <Link to={`/detail/${coin.symbol}`} className={styles.link}>
                  <span>{coin.name}</span> | {coin.symbol}
                </Link>
              </td>

              <td className={styles.tdLabel} data-label="Mercado">
                {coin.formatedMarket}
              </td>
              <td className={styles.tdLabel} data-label="Preço">
                {coin.formatedPrice}
              </td>
              <td className={coin.numberDelta && coin.numberDelta >= 0 ? styles.tdProfit : styles.tdLass} data-label="Volume">
                <span>{coin.delta_24h}</span>
              </td>
          </tr>
          ) )}
        </tbody>
      </table>
    </main>
  )
}

export default Home