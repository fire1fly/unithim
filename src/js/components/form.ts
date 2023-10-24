export function form() {
  const fields = document.querySelectorAll(".input-field, .input2-field");

  fields.forEach(field => {
    const input = field.querySelector(".input, .input2") as HTMLInputElement;

    input.addEventListener("focus", () => field.classList.add("focus"));
    input.addEventListener("blur", e => {
      if ((e.target as HTMLInputElement).value === '') {
        field.classList.remove("focus")
      }
    });
  });
}