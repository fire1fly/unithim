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

  let formRoot = document.querySelector(".sfb") as HTMLDivElement;
  let formContainer = document.querySelector(".sfb-inner") as HTMLDivElement;
  let form = document.querySelector(".sfb-form") as HTMLFormElement;
  let formResponse = document.querySelector(".sfb-form-response") as HTMLDivElement;
  let formFeedback = document.querySelector(".sfb-form-feedback") as HTMLDivElement;
  let name = document.querySelector(".sfb-form input[name='name']") as HTMLInputElement;
  let email = document.querySelector(".sfb-form input[name='email']") as HTMLInputElement;
  let phone = document.querySelector(".sfb-form input[name='phone']") as HTMLInputElement;
  let message = document.querySelector(".sfb-form textarea[name='message']") as HTMLInputElement;
  let quantity = document.querySelector(".sfb-form input[name='quantity']") as HTMLInputElement;
  let policy = document.querySelector(".sfb-form input[name='policy']") as HTMLInputElement;

  let catalogContainer = document.querySelector(".sct-page") as HTMLDivElement;
  let categoryList = document.querySelector(".sct-list") as HTMLDivElement;
  let formCategory = document.querySelector(".sfb-cat") as HTMLDivElement;
  let categoryValue = '';

  categoryList && categoryList.addEventListener("click", (e) => {
    const category = (e.target as HTMLDivElement).closest('.ccl');

    if (category) {
      categoryValue = (category as HTMLDivElement).dataset.category || '';
      formCategory.textContent = categoryValue;
      formCategory.classList.remove("hidden");
      catalogContainer.classList.add("_hidden");
    }
  });

  form && form.addEventListener("submit", e => {
    e.preventDefault();
    let validatedFields = {name, phone, email, quantity};

    let response;
    const request = new XMLHttpRequest();
    const url = window.location.origin + '/mail.php';
    const params = `name=${name.value.trim()}&phone=${phone.value.trim()}&email=${email.value.trim()}&category=${categoryValue || 'Не выбрана'}&message=${message.value.trim()}&quantity=${quantity.value.trim()}&policy=${policy.checked}`;
    request.responseType =	"text";
    request.open("POST", url, true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.addEventListener("readystatechange", () => {
      if (request.readyState === 4 && request.status === 200) {
        console.log('response: ', request.response);
        response = JSON.parse(request.response);
        for (let elem in validatedFields) {
          let field = validatedFields[elem as keyof typeof validatedFields]
          field.parentElement?.classList.remove("error");
          (field.nextElementSibling as HTMLDivElement).textContent = '';
        }
        formResponse.textContent = '';
        if (!(response.fields == '')) {
          //@ts-ignore
          response.fields.forEach((input: string) => {
            let field = validatedFields[input as keyof typeof validatedFields];
            field.parentElement?.classList.add("error");
            (field.nextElementSibling as HTMLDivElement).textContent = 'Поле обязательно';
          });
        }
        if(response.status == false) {
          formResponse.textContent = 'Проверьте заполненность полей.';
        } else {
          formFeedback.classList.add("_active");
          formContainer.classList.add("_hidden");
        }
      }
    });
    request.send(params);
  });
}