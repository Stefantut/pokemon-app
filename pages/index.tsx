import Link from "next/link";
import { GetStaticProps, NextPage } from "next";

interface Pokemon {
  name: string;
  url: string;
}

interface HomePageProps {
  pokemons: Pokemon[];
}

const HomePage: NextPage<HomePageProps> = ({ pokemons }) => {
  return (
    <div>
      <h1>Pokémon List</h1>
      <ul>
        {pokemons.map((pokemon, index) => (
          <li key={pokemon.name}>
            <Link href={`/pokemon/${index + 1}`}>
              <span>{pokemon.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  const data = await res.json();
  const pokemons: Pokemon[] = data.results;

  return {
    props: {
      pokemons,
    },
  };
};

export default HomePage;
