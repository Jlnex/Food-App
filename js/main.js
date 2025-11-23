import getMenu from "./api.js";
import {
  renderDatailPage,
  renderNotFound,
  uiElements,
  renderLoader,
  renderMenuCard,
} from "./ui.js";

document.addEventListener("DOMContentLoaded", async () => {
  const menuData = await getMenu();
  console.log("menuData: ", menuData);

  if (window.location.pathname.includes("/index.html")) {
    renderLoader();

    renderMenuCard(menuData);

    uiElements.categoryButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const selectedCategory = button.id;

        const filteredMenu = menuData.filter(
          (item) => item.category == selectedCategory
        );

        if (selectedCategory == "all") {
          renderMenuCard(menuData);
        } else {
          renderMenuCard(filteredMenu);
        }
      });
    });
  } else {
    const params = new URLSearchParams(window.location.search);

    const itemId = +params.get("id");

    console.log("itemId: ", itemId);

    const product = menuData.find((item) => item.id == itemId);

    if (!product) {
      renderNotFound();
    } else {
      renderDatailPage(product);
    }
  }
});
