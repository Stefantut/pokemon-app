import React, { useState } from "react";
import Link from "next/link";
import { GetStaticProps, NextPage } from "next";

interface Pokemon {
  name: string;
  url: string;
}
interface PokemonListItemProps {
  pokemon: Pokemon;
  search: string;
}

interface HomePageProps {
  pokemons: Pokemon[];
}

const PokemonListItem: React.FC<PokemonListItemProps> = ({
  pokemon,
  search,
}) => {
  const highlightMatch = (name: string, search: string): JSX.Element => {
    if (!search.trim()) return <span>{name}</span>;

    const regex = new RegExp(`(${search.trim()})`, "gi");
    const parts = name.split(regex);

    return (
      <span>
        {parts.map((part, index) =>
          regex.test(part) ? (
            <mark className="bg-yellow-200" key={index}>
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  return (
    <li className="cursor-pointer px-2hover:bg-blue-100 hover:text-blue-500">
      <Link href={`/pokemon/${pokemon.name}`}>
        <span className="capitalize">
          {highlightMatch(pokemon.name, search)}
        </span>
      </Link>
    </li>
  );
};

const HomePage: NextPage<HomePageProps> = ({ pokemons }) => {
  const [search, setSearch] = useState("");

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex justify-center">
      <div className="max-w-xl mx-auto px-4" style={{ width: "500px" }}>
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
            {filteredPokemons.map((pokemon) => (
              <PokemonListItem
                key={pokemon.name}
                pokemon={pokemon}
                search={search}
              />
            ))}
          </ul>
        </div>
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
