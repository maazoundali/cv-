let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");

let questionCount = 0;
let scoreCount = 0;   
let count = 11;        
let countdown;         

// Tableau des questions
const quizArray = [
    {
        id: "0",
        question: "Quel élément HTML est utilisé pour créer un lien hypertexte ?",
        options: ["<a>", "<link>", "<href>", "<url>"],
        correct: "<a>",
    },
    {
        id: "1",
        question: "Quelle propriété CSS est utilisée pour changer la couleur de texte ?",
        options: ["font-color", "text-color", "color", "background-color"],
        correct: "color",
    },
    {
        id: "2",
        question: "Quel est le type de balise pour insérer un fichier JavaScript dans une page HTML ?",
        options: ["<script>", "<javascript>", "<js>", "<code>"],
        correct: "<script>",
    },
    {
        id: "3",
        question: "Quelle méthode JavaScript est utilisée pour sélectionner un élément par son id ?",
        options: ["getElementById()", "querySelector()", "getId()", "findElementById()"],
        correct: "getElementById()",
    },
    {
        id: "4",
        question: "Quel est l’attribut HTML utilisé pour ajouter une image à une page ?",
        options: ["src", "href", "alt", "path"],
        correct: "src",
    },
    {
        id: "5",
        question: "Quel sélecteur CSS est utilisé pour sélectionner tous les éléments d'un type spécifique ?",
        options: [".class", "#id", "*", "nom-de-balise"],
        correct: "nom-de-balise",
    },
    {
        id: "6",
        question: "Quelle propriété CSS permet de changer l'arrière-plan d'un élément ?",
        options: ["background-color", "color", "border-color", "font-style"],
        correct: "background-color",
    },
    {
        id: "7",
        question: "Quelle méthode JavaScript est utilisée pour afficher un message dans la console ?",
        options: ["console.print()", "console.log()", "print()", "alert()"],
        correct: "console.log()",
    },
    {
        id: "8",
        question: "Quel événement JavaScript est déclenché lorsqu'un utilisateur clique sur un élément ?",
        options: ["onmouseover", "onchange", "onclick", "onfocus"],
        correct: "onclick",
    },
    {
        id: "9",
        question: "Quel est l'objectif principal de l'attribut 'alt' dans une balise <img> ?",
        options: [
            "Changer la taille de l'image",
            "Décrire l'image si elle ne se charge pas",
            "Ajouter un lien à l'image",
            "Changer la couleur de l'image",
        ],
        correct: "Décrire l'image si elle ne se charge pas",
    },
];

// Démarrage du quiz
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial(); // Réinitialisation et démarrage
});

// Réinitialisation et redémarrage
restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});

// Gestion du bouton "Suivant"
nextBtn.addEventListener("click", () => {
    questionCount++;
    if (questionCount === quizArray.length) {
        // Fin du quiz
        displayContainer.classList.add("hide");
        scoreContainer.classList.remove("hide");
        userScore.innerHTML = `Votre score est ${scoreCount} sur ${quizArray.length}`;
    } else {
        // Question suivante
        countOfQuestion.innerHTML = `${questionCount + 1} / ${quizArray.length} Questions`;
        quizDisplay(questionCount);
        resetTimer();
    }
});

// Affichage du quiz
function quizDisplay(index) {
    const quizCards = document.querySelectorAll(".container-mid");
    quizCards.forEach((card) => card.classList.add("hide")); // Masquer toutes les cartes
    quizCards[index].classList.remove("hide"); // Afficher la carte actuelle
}

// Création des questions et options
function quizCreator() {
    quizArray.sort(() => Math.random() - 0.5); // Mélanger les questions
    quizArray.forEach((questionObj, i) => {
        questionObj.options.sort(() => Math.random() - 0.5); // Mélanger les options

        const div = document.createElement("div");
        div.classList.add("container-mid", "hide");

        const question = document.createElement("p");
        question.className = "question";
        question.innerText = questionObj.question;
        div.appendChild(question);

        questionObj.options.forEach((option) => {
            const button = document.createElement("button");
            button.className = "option-div";
            button.innerText = option;
            button.setAttribute("onclick", "checker(this)");
            div.appendChild(button);
        });

        quizContainer.appendChild(div);
    });
}

// Vérification des réponses
function checker(userOption) {
    const userAnswer = userOption.innerText;
    const currentQuestion = quizArray[questionCount];
    const options = document.querySelectorAll(".container-mid")[questionCount].querySelectorAll(".option-div");

    if (userAnswer === currentQuestion.correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
        options.forEach((option) => {
            if (option.innerText === currentQuestion.correct) {
                option.classList.add("correct");
            }
        });
    }

    options.forEach((option) => (option.disabled = true));
    clearInterval(countdown); // Arrêter le timer
}

// Réinitialisation
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

// Gestion du timer
function timerDisplay() {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerText = `${count}s`;
        if (count === 0) {
            clearInterval(countdown);
            nextBtn.click(); // Passer automatiquement à la question suivante
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(countdown);
    count = 11;
    timerDisplay();
}

// Affichage initial
window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};
