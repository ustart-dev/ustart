/**
 * Busca, carga y fusiona los mocking rápidos de las entidades y plugins.
 * La entidad principal a la que pertenece el
 * mock debe ser definida como una función que retorna un objeto literal.
 * Por ejemplo:

  User: () => ({
    id: ....
  })

 * Sin embargo esto NO es así con "Query" y "Mutation", ya que estas deben
 * ser definidas como objetos, los cuales serán fusionados entre sí con el resto
 * de los mocks definidos en las demás entidades.

 Query: {
    allUsers: ....
 }

 * Para ejecutar correctamente las Query y Mutation definidas como objetos
 * estás son convertidas manualmente a funciones que retornan objetos literales.
 * Docs: https://github.com/apollographql/graphql-tools/blob/master/docs/source/mocking.md
*/
import path from "path";
import {
  fileLoader
} from "merge-graphql-schemas";
import appRoot from "app-root-path";
import {
  merge as _merge,
  cloneDeep as _cloneDeep
} from "lodash";
import {
  ENTITIES_DIR,
  PLUGINS_DIR,
  FASTMOCKS_GLOB
} from "../constants";

function loadFastMocking() {
  const fastMocks = {};

  fileLoader(
    path.join(appRoot.toString(), `{/${ENTITIES_DIR}/${FASTMOCKS_GLOB},/${PLUGINS_DIR}/${FASTMOCKS_GLOB}}`),
    { all: true, extensions: ['.js'] }
  ).forEach(
    e => _merge(fastMocks, e)
  );
  // Conversión manual a función que retorna objeto literal
  if (fastMocks.Query) {
    const q = _cloneDeep(fastMocks.Query);
    fastMocks.Query = function Query() { return q };
  }
  // Conversión manual a función que retorna objeto literal
  if (fastMocks.Mutation) {
    const m = _cloneDeep(fastMocks.Mutation);
    fastMocks.Mutation = function Mutation() { return m };
  }

  return fastMocks;
};

export { loadFastMocking };
