import { GetServerSideProps, NextPage } from "next";
import React from "react";
import { Pokemon } from "../../interfaces/Pokemon";

interface DetailsPageProps {
  pokemon: Pokemon;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const pokemon: Pokemon = await response.json();

  return {
    props: {
      pokemon,
    },
  };
};

const DetailsPage: NextPage<DetailsPageProps> = ({ pokemon }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold capitalize text-center my-4">
        {pokemon.name}
      </h1>

      <div className="my-2">
        <h2 className="text-xl font-semibold">Basic Info</h2>
        <p>Height: {pokemon.height / 10} meters</p>
        <p>Weight: {pokemon.weight / 10} kg</p>
      </div>

      <div className="my-2">
        <h2 className="text-xl font-semibold">Types</h2>
        <ul className="list-disc pl-5">
          {pokemon.types.map((type, index) => (
            <li key={index} className="capitalize">
              {type.type.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="my-2">
        <h2 className="text-xl font-semibold">Abilities</h2>
        <ul className="list-disc pl-5">
          {pokemon.abilities.map((ability, index) => (
            <li key={index} className="capitalize">
              {ability.ability.name} (Hidden: {ability.is_hidden ? "Yes" : "No"}
              )
            </li>
          ))}
        </ul>
      </div>

      <div className="my-2">
        <h2 className="text-xl font-semibold">Stats</h2>
        <ul className="list-disc pl-5">
          {pokemon.stats.map((stat, index) => (
            <li key={index} className="capitalize">
              {stat.stat.name}: {stat.base_stat}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DetailsPage;
