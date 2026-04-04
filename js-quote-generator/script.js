const quoteGenerator = document.querySelector(".generateBtn");

const quotes = [
  ["The only way to do great work is to love what you do.", "Steve Jobs"],
  ["In the middle of every difficulty lies opportunity.", "Albert Einstein"],
  [
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "Winston Churchill",
  ],
  ["Do what you can, with what you have, where you are.", "Theodore Roosevelt"],
  ["Believe you can and you're halfway there.", "Theodore Roosevelt"],
  ["It always seems impossible until it's done.", "Nelson Mandela"],
  ["Act as if what you do makes a difference. It does.", "William James"],
  ["Happiness depends upon ourselves.", "Aristotle"],
  ["Turn your wounds into wisdom.", "Oprah Winfrey"],
  ["Dream big and dare to fail.", "Norman Vaughan"],
  ["What we think, we become.", "Buddha"],
  ["Stay hungry, stay foolish.", "Steve Jobs"],
  ["You miss 100% of the shots you don’t take.", "Wayne Gretzky"],
  ["The best way to predict the future is to create it.", "Peter Drucker"],
  ["Don’t count the days, make the days count.", "Muhammad Ali"],
  [
    "Everything you’ve ever wanted is on the other side of fear.",
    "George Addair",
  ],
  [
    "Hardships often prepare ordinary people for an extraordinary destiny.",
    "C.S. Lewis",
  ],
  ["Quality is not an act, it is a habit.", "Aristotle"],
  ["If you’re going through hell, keep going.", "Winston Churchill"],
  [
    "Success usually comes to those who are too busy to be looking for it.",
    "Henry David Thoreau",
  ],
];

quoteGenerator.addEventListener("click", function () {
  const randNum = Math.floor(Math.random() * quotes.length);

  document.querySelector(".quote").textContent = `"${quotes[randNum][0]}"`;
  document.querySelector(".from").textContent = quotes[randNum][1];
});
