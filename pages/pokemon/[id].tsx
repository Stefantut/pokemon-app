import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
// import { useRouter } from "next/router";

interface Item {
  id: number;
  title: string;
  description: string;
}

interface PokemonDetailsProps {
  item: Item;
}

const PokemonDetails: NextPage<PokemonDetailsProps> = ({ item }) => {
  return (
    <div>
      <h1>{item.title}</h1>
      <p>{item.description}</p>
      <Link href={`/`}>
        <span>return home</span>
      </Link>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };
  // Fetch item data based on ID
  // Example: const item = await fetchItemData(id);
  const item: Item = {
    id: parseInt(id),
    title: "Pokemon 1 title",
    description: "Pokemon 1 Description",
  }; // Replace with actual data fetch

  return {
    props: {
      item,
    },
  };
};

export default PokemonDetails;
