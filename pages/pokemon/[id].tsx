import { GetStaticPaths, GetStaticProps, NextPage } from "next";

interface PokemonDetails {
  name: string;
}

interface DetailsPageProps {
  pokemon: PokemonDetails;
}

const DetailsPage: NextPage<DetailsPageProps> = ({ pokemon }) => {
  console.log("pokemon data: ", pokemon);
  return (
    <div>
      <h1>{pokemon.name}</h1>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Array.from({ length: 151 }, (_, index) => ({
    params: { id: (index + 1).toString() },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params!;
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const pokemon: PokemonDetails = await res.json();

  return {
    props: {
      pokemon,
    },
  };
};

export default DetailsPage;
