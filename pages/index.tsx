import React, { useState } from "react";
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
  const [search, setSearch] = useState("");

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Pokémon List</h1>
      <input
        type="text"
        placeholder="Search for a Pokémon..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {filteredPokemons.map((pokemon, index) => (
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
