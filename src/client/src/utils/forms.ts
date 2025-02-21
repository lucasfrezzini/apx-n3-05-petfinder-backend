export function getFormData(form: HTMLFormElement) {
  // Crear un objeto FormData
  const formData = new FormData(form);

  // Convertir FormData a un objeto JavaScript
  const formValues: { [key: string]: string | boolean } = {};
  formData.forEach((value, key) => {
    // Verificar si el valor es un checkbox o radio
    const inputElement = form.elements.namedItem(key) as HTMLInputElement;
    if (
      inputElement &&
      (inputElement.type === "checkbox" || inputElement.type === "radio")
    ) {
      formValues[key] = inputElement.checked;
    } else {
      formValues[key] = value.toString();
    }
  });

  return formValues;
}
