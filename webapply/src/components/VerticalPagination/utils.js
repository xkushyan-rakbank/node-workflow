export function getAverage(elements, number) {
  const lastElements = elements.slice(Math.max(elements.length - number, 1));
  const sum = lastElements.reduce((acc, item) => acc + item, 0);

  return Math.ceil(sum / number);
}

export const scrollToDOMNode = ref =>
  ref.current && ref.current.parentNode.scrollIntoView({ behavior: "smooth", block: "start" });
