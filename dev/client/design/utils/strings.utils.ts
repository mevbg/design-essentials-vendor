export const upperSnakeToLowerKebab = (str) => {
  const parts = str.toLowerCase().split('_');
  const result: string[] = [];

  for (let i = 0; i < parts.length; i++) {
    const current: string = parts[i];
    const next: string = parts[i + 1];

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
