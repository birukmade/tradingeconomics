const fetchData = async (url) => {
  const responce = await fetch(url);
  if (!responce.ok) {
    throw new Error(`HTTP Error. Status ${responce.status}`);
  }
  const data = await responce.json();
  return data;
};

export default fetchData;
