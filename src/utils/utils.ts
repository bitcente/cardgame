export function makeId(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

export function findParentOfMeshByName(mesh: any, parentName: string, includes?: boolean): any {
  let par = mesh;
  if (par) {
    while (par.parent) {
      if (par) par = par.parent

      if ((includes && par.name.includes(parentName)) || par.name === parentName) {
        return par
      } 
    }

    return null
  }
}

export function removeFromArrayById(array: any[], id: string) {
  if (!array.length) return false

  const itemToDelete = array.find(item => item.id === id)
  const index = array.indexOf(itemToDelete);
  if (index !== -1) {
    array.splice(index, 1);
    return true
  }

  return false
}