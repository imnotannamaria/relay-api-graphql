// Basicamente o controller / Buscar dados no banco, buscar por id. 

import { readDatabase } from "../../../utils"

export async function loadAll() {
  const posts = await readDatabase('posts');

  if(!posts) {
    return null;
  }

  //O último dado adicionado vem primeiro
  return posts.reverse();
}