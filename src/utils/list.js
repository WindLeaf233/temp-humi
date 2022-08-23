function deleteEmpty(oldList) {
  let newList = []
  for (let item of oldList) {
    if (item !== null && item !== undefined) {
      newList.push(item)
    }
  }
  return newList
}

export {
  deleteEmpty
}