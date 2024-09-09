function getRand(): number {
  return Math.floor(Math.random() * (200 - 1) + 1);
}

const OP = ['+', '-'];

export function generateOperation() {
  const a = getRand();
  const b = getRand();
  const operator = OP[ Math.floor(Math.random() * 2) ];
  const result = operator === '+' ? a + b : a - b;
  return { a, b, operator, result};
};