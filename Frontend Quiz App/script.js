const choicesElement = document.querySelector(".choices");
const topicButtonsElement = choicesElement.getElementsByTagName("button");
const questionElement = document.getElementsByTagName("article").item(0);
const headerElement = document.getElementsByTagName("header").item(0);

let topicNumSelected;
let questionNumber = 0;
let score = 0;
let isAnswered = false;
let buttonsElement = [];

let submitButtonEl;
//   ADD EVENT LISTENER TO TOPIC SELECTION
for (let i = 0; i < topicButtonsElement.length; i++) {
  topicButtonsElement.item(i).addEventListener("click", (clickedElement) => {
    topicNumSelected = i;
    updateHeader();
    newQuestion();
  });
}

function updateHeader() {
  // UPDATE HEADER TO DISPLAY TOPIC
  const arrTopic = ["html", "css", "js", "acc"];
  const topicEl = document.createElement("h2");
  topicEl.classList.add("topic-bar");
  const iconEl = document.createElement("i");
  iconEl.classList.add("icon", `i-${arrTopic[topicNumSelected]}`);
  topicEl.innerText = quizzes[topicNumSelected].title;
  topicEl.insertAdjacentElement("afterbegin", iconEl);
  headerElement.insertAdjacentElement("afterbegin", topicEl);
}

function toggleSelected(arrEl, elToToggle) {
  // loop through choices and remove any selected class
  for (let i = 0; i < arrEl.length; i++) {
    arrEl[i].classList.remove("selected");
  }
  // add 'selected' class to selected choice
  elToToggle.classList.add("selected");
  //
}

function newQuestion() {
  const questionObj = quizzes[topicNumSelected].questions[questionNumber];
  const { title, options, question } = questionObj;

  // UPDATE ARTICLE ELEMENT TO DISPlAY QUESTION AND PROGRESS BAR
  questionElement.classList.add("question");
  const questionNumEl = document.createElement("h2");
  questionNumEl.innerText = `Question ${questionNumber + 1} of 10`;
  const questionTextEl = document.createElement("p");
  questionTextEl.innerText = question;
  questionElement.replaceChildren(questionNumEl);
  questionElement.append(questionTextEl);
  const progressBarEl = document.createElement("div");
  progressBarEl.classList.add("progress-bar");
  progressBarEl.style.cssText = `--progress: ${questionNumber + 1}0%`;
  questionElement.append(progressBarEl);

  // CREATE CHOICES BUTTONS
  choicesElement.replaceChildren();
  options.forEach((option, index) => {
    const newButtonEl = createNewButtonEl(option, index);
    // CREATE AND APPEND SUBMIT BUTTON
    buttonsElement.push(newButtonEl);
    choicesElement.appendChild(newButtonEl);
  });

  //   APPEND TO PARENT ELEMENT
  submitButtonEl = document.createElement("button");
  submitButtonEl.innerText = "Submit Answer";
  submitButtonEl.classList.add("primary");
  submitButtonEl.addEventListener("click", checkAnswer);
  choicesElement.append(submitButtonEl);

  //   ADD EVENT LISTENER TO CHOICES
  buttonsElement.forEach((button) => {
    button.addEventListener("click", (x) => {
      toggleSelected(buttonsElement, button);
    });
  });

  //   INCREMENT QUESTION NUMBER
  questionNumber++;
  isAnswered = false;
}

function createNewButtonEl(data, num) {
  const choicesLetter = "ABCD";
  const buttonEl = document.createElement("button");
  const iconEl = document.createElement("i");
  iconEl.classList.add("icon", "i-letter");
  iconEl.innerText = choicesLetter[num];

  const iconResult = document.createElement("i");
  iconResult.classList.add("icon", "i-result");

  buttonEl.appendChild(iconEl);
  buttonEl.appendChild(document.createTextNode(data));
  buttonEl.setAttribute("data-value", data);
  buttonEl.appendChild(iconResult);

  return buttonEl;
}

function checkAnswer() {
  const question = quizzes[topicNumSelected].questions[questionNumber - 1];
  const { answer } = question;

  if (isAnswered === false) {
    buttonsElement.forEach((buttonEl) => {
      if (buttonEl.classList.contains("selected")) {
        if (buttonEl.getAttribute("data-value") == answer) {
          buttonEl.classList.add("correct");
          score++;
        } else {
          buttonEl.classList.add("incorrect");
          buttonsElement
            .find((button) => button.getAttribute("data-value") == answer)
            .classList.add("correct");
        }
      }
    });
    isAnswered = true;
  }

  if (questionNumber <= 9) {
    submitButtonEl.innerHTML = "Next Question";
    submitButtonEl.addEventListener("click", newQuestion);
  } else {
    submitButtonEl.innerHTML = "See Result";
    submitButtonEl.addEventListener("click", showScore);
  }
}

function showScore() {
  //   alert(score);
  questionElement.classList.remove("question");
  questionElement.innerHTML = `<h1>Quiz completed <span>You scored...</span></h1>`;

  choicesElement.classList.remove("choices");
  choicesElement.classList.add("result");
  choicesElement.innerHTML = `
     <div class="result-card">
        <h2 class="topic-bar">
            <i class="icon i-html"></i>
            ${quizzes[topicNumSelected].title}
        </h2>
        <div class="score">${score}</div>
        out of 10
    </div>
  `;
  const playAgainEl = document.createElement("button");
  playAgainEl.classList.add("primary");
  playAgainEl.innerText = "Play Again";
  playAgainEl.addEventListener("click", () => {
    window.location.reload();
  });
  choicesElement.append(playAgainEl);
}

const data = {
  quizzes: [
    {
      title: "HTML",
      icon: "./assets/images/icon-html.svg",
      questions: [
        {
          question: "What does HTML stand for?",
          options: [
            "Hyper Trainer Marking Language",
            "Hyper Text Marketing Language",
            "Hyper Text Markup Language",
            "Hyper Text Markup Leveler",
          ],
          answer: "Hyper Text Markup Language",
        },
        {
          question:
            "Which of the following is the correct structure for an HTML document?",
          options: [
            "<html><head></head><body></body></html>",
            "<head><html></html><body></body></head>",
            "<body><head></head><html></html></body>",
            "<html><body></body><head></head></html>",
          ],
          answer: "<html><head></head><body></body></html>",
        },
        {
          question:
            "Which HTML element is used to define the title of a document?",
          options: ["<head>", "<title>", "<header>", "<top>"],
          answer: "<title>",
        },
        {
          question: "What is the purpose of the <body> tag in HTML?",
          options: [
            "It defines the document's head section.",
            "It contains all the content such as text, images, and links.",
            "It is used to define the main content of an HTML document.",
            "It specifies the body of the email content in HTML.",
          ],
          answer:
            "It contains all the content such as text, images, and links.",
        },
        {
          question: "Which HTML tag is used to create a hyperlink?",
          options: ["<hyperlink>", "<link>", "<a>", "<href>"],
          answer: "<a>",
        },
        {
          question: "Which tag is used to display images in HTML?",
          options: ["<img>", "<image>", "<src>", "<pic>"],
          answer: "<img>",
        },
        {
          question:
            "What attribute is used to provide the path of an image in the <img> tag?",
          options: ["link", "src", "href", "url"],
          answer: "src",
        },
        {
          question: "Which HTML tag is used to create an unordered list?",
          options: ["<ul>", "<ol>", "<list>", "<li>"],
          answer: "<ul>",
        },
        {
          question: "What does the <br> tag do?",
          options: [
            "It breaks the text into two sections.",
            "It creates a bold text.",
            "It inserts a line break.",
            "It adds a new row in a table.",
          ],
          answer: "It inserts a line break.",
        },
        {
          question: "In HTML, what does the `fieldset` tag do?",
          options: [
            "It is used to group related data in a form.",
            "It sets the field to a fixed size.",
            "It automatically validates the fields within a form.",
            "It hides the fields in a form.",
          ],
          answer: "It is used to group related data in a form.",
        },
      ],
    },
    {
      title: "CSS",
      icon: "./assets/images/icon-css.svg",
      questions: [
        {
          question: "What does CSS stand for?",
          options: [
            "Colorful Style Sheets",
            "Computer Style Sheets",
            "Cascading Style Sheets",
            "Creative Style Sheets",
          ],
          answer: "Cascading Style Sheets",
        },
        {
          question: "Which HTML attribute is used to define inline styles?",
          options: ["styles", "style", "class", "font-style"],
          answer: "style",
        },
        {
          question: "How do you insert a comment in a CSS file?",
          options: [
            "// this is a comment //",
            "/* this is a comment */",
            "-- this is a comment --",
            "<!-- this is a comment -->",
          ],
          answer: "/* this is a comment */",
        },
        {
          question:
            "Which property is used to change the background color of an element?",
          options: ["color", "bgcolor", "background-color", "background"],
          answer: "background-color",
        },
        {
          question: "How do you apply a style to all <p> elements?",
          options: ["p { }", ".p { }", "#p { }", "all.p { }"],
          answer: "p { }",
        },
        {
          question: "Which property is used to change the font of an element?",
          options: ["font-style", "text-style", "font-family", "typeface"],
          answer: "font-family",
        },
        {
          question:
            "How do you make each word in a text start with a capital letter?",
          options: [
            "text-transform: capitalize",
            "text-transform: uppercase",
            "text-style: capital",
            "font-transform: capitalize",
          ],
          answer: "text-transform: capitalize",
        },
        {
          question:
            "How do you select an element with the class name 'header'?",
          options: [".header", "#header", "header", "*header"],
          answer: ".header",
        },
        {
          question: "What is the default value of the 'position' property?",
          options: ["relative", "fixed", "absolute", "static"],
          answer: "static",
        },
        {
          question: "What is the purpose of the z-index property in CSS?",
          options: [
            "To count the number of elements",
            "To set the magnification level of an element",
            "To specify the stack order of an element",
            "To create a zoom effect",
          ],
          answer: "To specify the stack order of an element",
        },
      ],
    },
    {
      title: "JavaScript",
      icon: "./assets/images/icon-js.svg",
      questions: [
        {
          question:
            "Which syntax is correct to output 'Hello World' in an alert box?",
          options: [
            "alertBox('Hello World');",
            "msg('Hello World');",
            "alert('Hello World');",
            "msgBox('Hello World');",
          ],
          answer: "alert('Hello World');",
        },
        {
          question: "How do you call a function named 'myFunction'?",
          options: [
            "call function myFunction()",
            "call myFunction()",
            "myFunction()",
            "execute myFunction()",
          ],
          answer: "myFunction()",
        },
        {
          question: "How to write an IF statement in JavaScript?",
          options: ["if i = 5 then", "if (i == 5)", "if i == 5", "if i = 5"],
          answer: "if (i == 5)",
        },
        {
          question:
            "How to write an IF statement for executing some code if 'i' is NOT equal to 5?",
          options: [
            "if (i <> 5)",
            "if i =! 5 then",
            "if (i != 5)",
            "if i not = 5",
          ],
          answer: "if (i != 5)",
        },
        {
          question: "How does a FOR loop start?",
          options: [
            "for (i = 0; i <= 5)",
            "for i = 1 to 5",
            "for (i <= 5; i++)",
            "for (i = 0; i <= 5; i++)",
          ],
          answer: "for (i = 0; i <= 5; i++)",
        },
        {
          question: "How can you add a single-line comment in JavaScript?",
          options: [
            "'This is a single-line comment",
            "//This is a single-line comment",
            "<!--This is a single-line comment-->",
            "/* This is a single-line comment */",
          ],
          answer: "//This is a single-line comment",
        },
        {
          question: "What is the correct way to write a JavaScript array?",
          options: [
            "var colors = (1:'red', 2:'green', 3:'blue')",
            "var colors = ['red', 'green', 'blue']",
            "var colors = 'red', 'green', 'blue'",
            "var colors = 1 = ('red'), 2 = ('green'), 3 = ('blue')",
          ],
          answer: "var colors = ['red', 'green', 'blue']",
        },
        {
          question:
            "How do you find the number with the highest value of x and y?",
          options: [
            "Math.ceil(x, y)",
            "top(x, y)",
            "Math.max(x, y)",
            "Math.highest(x, y)",
          ],
          answer: "Math.max(x, y)",
        },
        {
          question: "Which operator is used to assign a value to a variable?",
          options: ["-", "*", "=", "x"],
          answer: "=",
        },
        {
          question: "What is the correct way to write a JavaScript object?",
          options: [
            "var person = {firstName: 'John', lastName: 'Doe'};",
            "var person = {firstName = 'John', lastName = 'Doe'};",
            "var person = (firstName: 'John', lastName: 'Doe');",
            "var person = (firstName = 'John', lastName = 'Doe');",
          ],
          answer: "var person = {firstName: 'John', lastName: 'Doe'};",
        },
      ],
    },
    {
      title: "Accessibility",
      icon: "./assets/images/icon-accessibility.svg",
      questions: [
        {
          question: "What does 'WCAG' stand for?",
          options: [
            "Web Content Accessibility Guidelines",
            "Web Compliance Accessibility Guide",
            "Web Content Accessibility Goals",
            "Website Compliance and Accessibility Guidelines",
          ],
          answer: "Web Content Accessibility Guidelines",
        },
        {
          question:
            "Which element is used to provide alternative text for images for screen reader users?",
          options: [
            "<alt>",
            "<figcaption>",
            "<description>",
            "<img alt='description'>",
          ],
          answer: "<img alt='description'>",
        },
        {
          question: "What does ARIA stand for in web development?",
          options: [
            "Accessible Rich Internet Applications",
            "Advanced Responsive Internet Assistance",
            "Accessible Responsive Internet Applications",
            "Automated Responsive Internet Actions",
          ],
          answer: "Accessible Rich Internet Applications",
        },
        {
          question: "Which of the following is not a principle of the WCAG?",
          options: ["Perceivable", "Dependable", "Operable", "Understandable"],
          answer: "Dependable",
        },
        {
          question:
            "Which of these color contrast ratios defines the minimum WCAG 2.1 Level AA requirement for normal text?",
          options: ["3:1", "4.5:1", "7:1", "2:1"],
          answer: "4.5:1",
        },
        {
          question:
            "Which of the following elements is inherently focusable, meaning it can receive focus without a 'tabindex' attribute?",
          options: ["<div>", "<span>", "<a href='...'>", "<p>"],
          answer: "<a href='...'>",
        },
        {
          question:
            "What is the purpose of the 'lang' attribute in an HTML page?",
          options: [
            "To specify the scripting language",
            "To define the character set",
            "To indicate the language of the page content",
            "To declare a language pack",
          ],
          answer: "To indicate the language of the page content",
        },
        {
          question:
            "Which guideline ensures that content is accessible by keyboard as well as by mouse?",
          options: [
            "Keyboard Accessible",
            "Mouse Independence",
            "Device Independence",
            "Operable Controls",
          ],
          answer: "Keyboard Accessible",
        },
        {
          question:
            "What is the role of 'skip navigation' links in web accessibility?",
          options: [
            "To skip over primary navigation to the main content",
            "To provide shortcuts to different sections of the website",
            "To help users skip unwanted sections like advertisements",
            "To bypass broken links in the navigation",
          ],
          answer: "To skip over primary navigation to the main content",
        },
        {
          question:
            "Which of these tools can help in checking the accessibility of a website?",
          options: [
            "W3C Validator",
            "Google Lighthouse",
            "CSS Validator",
            "JavaScript Console",
          ],
          answer: "Google Lighthouse",
        },
      ],
    },
  ],
};

const { quizzes } = data;
