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
    <div className="flex justify-center items-center">
      <div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-800 my-6">
          Pokémon List
        </h1>
        <input
          type="text"
          placeholder="Search for a Pokémon..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-input px-4 py-1 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-500 bg-blue-100"
          style={{ caretColor: "blue" }}
        />
        <ul>
          {filteredPokemons.map((pokemon, index) => (
            <li key={pokemon.name} className="capitalize">
              <Link href={`/pokemon/${pokemon.name}`}>
                <span>{pokemon.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
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
