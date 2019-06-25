export const titleCase = str => {
  const stringArray = str.toLowerCase().split(' ');
  const titleCased = stringArray.map(
    s => s.charAt(0).toUpperCase() + s.slice(1)
  );
  return titleCased.join(' ');
};

export default { titleCase };
