const getMenu = async () => {
  try {
    const response = await fetch("../db.json");

    const data = await response.json();

    return data.menu;
  } catch (error) {
    console.log(error);

    return [];
  }
};

export default getMenu;
