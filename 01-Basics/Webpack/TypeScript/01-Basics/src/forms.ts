export const formData = (
  form: HTMLFormElement
): {
  [prop: string]: string;
} => {
  const inputs = form.querySelectorAll("input");
  let values: { [prop: string]: string } = {};

  inputs.forEach((input) => {
    values[input.id] = input.value;
  });
  return values;
};
