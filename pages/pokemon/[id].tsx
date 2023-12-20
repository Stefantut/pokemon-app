import { GetServerSideProps, NextPage } from "next";
import React from "react";
import { useRouter } from "next/router";
import { Pokemon } from "../../interfaces/Pokemon";
import Link from "next/link";

import { GrSearch } from "react-icons/gr";
import { usePokemon } from "@/hooks/usePokemon";

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

const DetailsPage: NextPage<DetailsPageProps> = () => {
  const router = useRouter();

  const { id } = router.query as { id: string },
    { data: pokemon, isLoading, isError } = usePokemon(id);

  console.info("Pokemon data: ", pokemon);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading Pokémon data</div>;
  }

  if (!pokemon) {
    return <div>Pokémon not found</div>;
  }

  const handlePrev = () => {
    if (pokemon.id > 1) {
      router.push(`/pokemon/${pokemon.id - 1}`);
    }
  };

  const handleNext = () => {
    router.push(`/pokemon/${pokemon.id + 1}`);
  };

  return (
    <div className="flex justify-center">
      <div className="max-w-xl mx-auto px-4" style={{ width: "500px" }}>
        <div className="container mx-auto p-4">
          <Link
            href={`/`}
            className="flex items-center px-2 cursor-pointer hover:bg-blue-100 hover:text-blue-500"
          >
            <GrSearch />
            <span className="ml-2">Return to search</span>
          </Link>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-800 my-6 capitalize">
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
                  {ability.ability.name} (Hidden:{" "}
                  {ability.is_hidden ? "Yes" : "No"})
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
          <div className="flex justify-between my-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handlePrev}
              disabled={pokemon.id <= 1}
            >
              Previous
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
