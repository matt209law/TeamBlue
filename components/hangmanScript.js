//Tristan Goutain
const wordE1 = document.getElementById("word");
const wrongLettersE1 = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");
const categoryButton = document.getElementById("cats");

const figureParts = document.querySelectorAll(".figure-part");

const catStates = [
  "alabama",
  "alaska",
  "arizona",
  "arkansas",
  "california",
  "colorado",
  "connecticut",
  "delaware",
  "florida",
  "georgia",
  "hawaii",
  "idaho",
  "illinois",
  "indiana",
  "iowa",
  "kansas",
  "kentucky",
  "louisiana",
  "maine",
  "maryland",
  "massachusetts",
  "michigan",
  "minnesota",
  "mississippi",
  "missouri",
  "montana",
  "nebraska",
  "nevada",
  "new hampshire",
  "new jersey",
  "new mexico",
  "new york",
  "north carolina",
  "north dakota",
  "ohio",
  "oklahoma",
  "oregon",
  "pennsylvania",
  "rhode island",
  "south carolina",
  "south dakota",
  "tennessee",
  "texas",
  "utah",
  "vermont",
  "virginia",
  "washington",
  "west virginia",
  "wisconsin",
  "wyoming",
];

const catCountries = [
  "australia",
  "brazil",
  "canada",
  "denmark",
  "egypt",
  "france",
  "germany",
  "honduras",
  "india",
  "japan",
  "kenya",
  "luxembourg",
  "morocco",
  "netherlands",
  "oman",
  "pakistan",
  "qatar",
  "russia",
  "sweden",
  "thailand",
  "ukraine",
  "vietnam",
  "yemen",
  "zimbabwe"
];

const catFruits = [
  "apple",
  "banana",
  "cherry",
  "durian",
  "elderberry",
  "fig",
  "grapefruit",
  "honeydew",
  "jackfruit",
  "kiwi",
  "lemon",
  "mango",
  "nectarine",
  "orange",
  "pineapple",
  "quince",
  "raspberry",
  "strawberry",
  "tangerine",
  "tomato",
  "ugli fruit",
  "watermelon",
  "xigua",
  "yellow watermelon",
  "zucchini"
];

const catSports = [
  "basketball",
  "cricket",
  "diving",
  "equestrianism",
  "football",
  "golf",
  "hockey",
  "judo",
  "karate",
  "lacrosse",
  "martial arts",
  "netball",
  "orienteering",
  "polo",
  "quidditch",
  "rugby",
  "soccer",
  "tennis",
  "ultimate frisbee",
  "volleyball",
  "wrestling",
  "xare",
  "yoga",
  "zumba"
];

const categories = [catStates, catSports, catFruits, catCountries];

var selectedWord;

const correctLetters = [];
const wrongLetters = [];

function selectWord() {
  let random = false;
  var cat;
  for(i = 0; i < categoryButton.options.length; i++) {
    if(categoryButton.options[i].selected) {
      cat = categoryButton.options[i].value;
      break;
    }
  }
  var catList;
  switch(cat) {
    case "states":
      catList = catStates;
      break;
    case "countries":
      catList = catCountries;
      break;
    case "fruits":
      catList = catFruits;
      break;
    case "sports":
      catList = catFruits;
      break;
    default:
      random = true;
      break;
  }
  if(random) {
    catList = categories[Math.floor(Math.random() * categories.length)];
  }
  selectedWord = catList[Math.floor(Math.random() * catList.length)];
  console.log("Selected word is: " + selectedWord);
  displayWord()
}

//Show hidden word
function displayWord() {
  wordE1.innerHTML = `
    ${selectedWord
      .split("")
      .map(
        (letter) => `
        <span class="letter">
        ${correctLetters.includes(letter) ? letter : ""}
        </span>
        `
      )
      .join("")}
    `;

  const innerWord = wordE1.innerText.replace(/\n/g, "");

  if (innerWord === selectedWord) {
    finalMessage.innerText = "Congratulations! You won! ";
    popup.style.display = "flex";
  }
}

// Update the wrong letters
function updateWrongLetterE1() {
  //Display wrong letters
  wrongLettersE1.innerHTML = `
    ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
    ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
    `;

  //Display parts
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  //Check if lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = "Unfortunately you lost. ";
    popup.style.display = "flex";
  }
}

//Show notification
function showNotification() {
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

//Keydown letter press
window.addEventListener("keydown", (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);

        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);

        updateWrongLetterE1();
      } else {
        showNotification();
      }
    }
  }
});

//Restart game and play again
playAgainBtn.addEventListener("click", () => {
  //Empty arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectWord();

  updateWrongLetterE1();

  popup.style.display = "none";
});

selectWord();
