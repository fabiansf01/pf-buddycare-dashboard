import axios from "axios";
import Swal from "sweetalert2";

export const actionTypes = {
  GET_POKEMONS: "GET_POKEMONS",
  SEARCH_POKEMON: "SEARCH_POKEMON",
  FILTER_POKEMONS_BY_TYPE: "FILTER_POKEMONS_BY_TYPE",
  FILTER_POKEMONS_CREATED: "FILTER_POKEMONS_CREATED",
  GET_POKEMON_BY_ID: "GET_POKEMON_BY_ID",
  GET_TYPES: "GET_TYPES",
  POST_POKEMON: "POST_POKEMON",
  SORT_POKEMONS_BY_STRENGTH: "SORT_POKEMONS_BY_STRENGTH",
  SORT_POKEMONS_ALPHABETICALLY: "SORT_POKEMONS_ALPHABETICALLY",
  SLICE_POKEMONS: "SLICE_POKEMONS",
  CLEAR_POKEMONS: "CLEAR_POKEMONS",
  LOADER_TRUE: "LOADER_TRUE",
  LOADER_FALSE: "LOADER_FALSE",
  DELETE_POKEMON: "DELETE_POKEMON",
  GET_POKEMON_MITIPO: "GET_POKEMON_MITIPO",
};

export function getTypes() {
  return function (dispatch) {
    return axios("/types")
      .then((resp) => {
        return dispatch({ type: actionTypes.GET_TYPES, payload: resp.data });
      })
      .catch((e) => {
        console.log(e);
        return Swal.fire({
          icon: "error",
          title: "ALGUNA MIERDA NO FUNCIONA",
          html: "LINEA 32 traerse todos los types DEL MODULO DE MIERDA ACTIONS/INDEX.JS",
        });
      });
  };
}

export function getPokemons() {
  return function (dispatch) {
    return axios("/pokemons")
      .then((response) => {
        return dispatch({
          type: actionTypes.GET_POKEMONS,
          payload: response.data,
        });
      })
      .catch((e) => {
        console.log(e);
        return Swal.fire({
          icon: "error",
          title: "ALGUNA MIERDA NO FUNCIONA",
          html: "LINEA 52 traerse todos los pokemons DEL MODULO DE MIERDA ACTIONS/INDEX.JS",
        });
      });
  };
}

export function getPokemonById(id) {
  return function (dispatch) {
    return axios(`/pokemon/${id}`)
      .then((resp) => {
        return dispatch({
          type: actionTypes.GET_POKEMON_BY_ID,
          payload: resp.data,
        });
      })
      .catch((e) => {
        console.log(e);
        return Swal.fire({
          icon: "error",
          title: "ALGUNA MIERDA NO FUNCIONA",
          html: "LINEA 72 pokemon por el puto ID DEL MODULO DE MIERDA ACTIONS/INDEX.JS",
        });
      });
  };
}




export function searchPokemon(name) {
  return function (dispatch) {
    return axios(`/pokemons?name=${name}`)
      .then((response) => {
        return dispatch({
          type: actionTypes.SEARCH_POKEMON,
          payload: response.data,
        });
      })
      .catch((e) => {
        console.log(e);
        return Swal.fire({
          
          imageUrl: 'http://www.fpsoft.com.ar/pi/images/pokezombie-removebg.png',
          imageWidth: 400,
           imageHeight: 290,
         
          
          //icon: "error",
          title: "Problema",
          html: "El POKEMON NO EXISTE <br> Seguramente nunca nació.... O ESTA MUERTO",
        });
      });
  };
}







export function filterPokemonByType(type) {
  return {
    type: actionTypes.FILTER_POKEMONS_BY_TYPE,
    payload: type,
  };
}




export function filterPokemonBymiType(type) {
  return {
    type: actionTypes.GET_POKEMON_MITIPO,
    payload: type,
  };
}


















export function filterPokemonCreated(created) {
  return {
    type: actionTypes.FILTER_POKEMONS_CREATED,
    payload: created,
  };
}

// Documentación para dispachar código asincrono https://redux.js.org/tutorials/fundamentals/part-6-async-logic
export function saveNewPokemon(pokemon) {
  return function (dispatch) {
    //Chequear de que forma llega pokemon. Como un objeto?
    return axios
      .post("/pokemons", pokemon)
      .then((resp) => {
        Swal.fire({
          

          imageUrl: 'http://www.fpsoft.com.ar/pi/images/pokemon_apareando-removebg.png',
          imageWidth: 400,
           imageHeight: 400,

          title: "Bién Hecho !!!!!",
         
          text: "El POKEMON fue creado correctamente ..",
        });
        return dispatch({ type: actionTypes.POST_POKEMON, payload: resp });
      })
      .catch((e) => {
        console.log(e);
        return Swal.fire({
          icon: "error",
          title: "ALGUNA MIERDA NO FUNCIONA",
          html: "LINEA 143 grbar pokemon DEL MODULO DE MIERDA ACTIONS/INDEX.JS",
        });
      });
  };
}

export function sortPokemonsByStrength(typeOfSort) {
  //typeOfSort= ascendente o descendente
  return {
    type: actionTypes.SORT_POKEMONS_BY_STRENGTH,
    payload: typeOfSort,
  };
}

export function sortPokemonsAlphabetically(typeOfSort) {
  //typeOfSort= ascendente o descendente
  return {
    type: actionTypes.SORT_POKEMONS_ALPHABETICALLY,
    payload: typeOfSort,
  };
}

export function clearPokemons() {
  return {
    type: actionTypes.CLEAR_POKEMONS,
  };
}

export function setLoaderTrue() {
  return {
    type: actionTypes.LOADER_TRUE,
  };
}

export function setLoaderFalse() {
  return {
    type: actionTypes.LOADER_FALSE,
  };
}

export function deletePokemon(id) {
  return function (dispatch) {
    return axios
      .delete(`/delete/${id}`)
      .then((response) => {
        Swal.fire({
          imageUrl: 'http://www.fpsoft.com.ar/pi/images/sadpok.jpeg',
          imageWidth: 400,
           imageHeight: 400,

          title: "Bye !!!!!",
         
          text: "El POKEMON fue sacrificado ..",
        });
        return dispatch({ type: actionTypes.DELETE_POKEMON });
      })
      .catch((e) => {
        return Swal.fire({
          icon: "error",
          title: "ALGUNA MIERDA NO FUNCIONA",
          html: "LINEA 203 delete DEL MODULO DE MIERDA ACTIONS/INDEX.JS",
        });
      });
  };
}
