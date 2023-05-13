const form = document.querySelector("form");
const result = document.querySelector(".result");

const answers = ["B", "A", "B", "B"];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let score = 0;

  answers.forEach((ans, i) => {
    if (e.target["q" + (i + 1)].value === ans) {
      score++;
    }
  });

  score = (score / answers.length) * 100;

  result.classList.remove("d-none");

  scrollTo(0, 0);

  let percents = document.querySelector("span");

  i = 0;
  const displayScore = setInterval(() => {
    if(i >= score){
        clearInterval(displayScore);
    }
    percents.textContent = `${i}%`;
    i++;
  }, 10);
});
