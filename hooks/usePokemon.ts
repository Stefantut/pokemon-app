import { useQuery } from 'react-query';

const fetchPokemon = async (id: string) => {
    console.log('id',id)
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (!response.ok) {
    throw new Error('Pokemon not found');
  }
  return response.json();
};

export const usePokemon = (id: string) => {
  return useQuery(['pokemon', id], () => fetchPokemon(id), {
    enabled: !!id, // lazy loading
  });
};