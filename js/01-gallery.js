import { galleryItems } from "./gallery-items.js";
// Change code below this line

const gallery = document.querySelector(".gallery");

const markup = galleryItems
  .map(
    (item) => `<li class="gallery__item">
        <a class="gallery__link" href="${item.original}">
            <img class="gallery__image"
                src="${item.preview}"
                data-source="${item.original}"
                alt="${item.description}"
            />
        </a>
    </li>`
  )
  .join("");

gallery.insertAdjacentHTML("beforeend", markup);

gallery.addEventListener("click", handlerClick);

function handlerClick(event) {
  event.preventDefault();
  if (!event.target.classList.contains("gallery__image")) {
    return;
  }

  const selectedImage = event.target.dataset.source;
  const instance = basicLightbox.create(`
    <div class="modal">
        <img src="${selectedImage}" width="800" height="600">
    </div>
    `);

  instance.show(() => document.addEventListener("keydown", handlerEscape));

  function handlerEscape(event) {
    if (event.code === "Escape") {
      instance.close();
      document.removeEventListener("keydown", handlerEscape);
    }
  }
}
