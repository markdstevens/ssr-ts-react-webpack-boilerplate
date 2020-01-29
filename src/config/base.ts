export const config = {
  port: 3000,
  stores: {
    pokemon: {
      url: 'https://pokeapi.co/api/v2/pokemon/:name'
    },
    joke: {
      url: 'http://localhost:8080/'
    },
  }
};
