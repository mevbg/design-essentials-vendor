export const upperSnakeToLowerKebab = (str) => {
  const parts = str.toLowerCase().split('_');
  const result = [];

  for (let i = 0; i < parts.length; i++) {
    const current = parts[i];
    const next = parts[i + 1];

    if (next && /^\d+$/.test(next)) {
      // Combine current + next if next is a number
      result.push(current + next);
      i++; // Skip next
    } else {
      result.push(current);
    }
  }

  return result.join('-');
};
