const subject =
    localStorage.getItem("selectedSubject");

const topic =
    localStorage.getItem("selectedTopic");


document.getElementById("lessonSubject")
    .textContent = subject || "Subject";


document.getElementById("lessonTitle")
    .textContent = topic || "Lesson";


const lessons = {

    "Mathematics": {

        "Quadratic Equations": {

            introduction:
                "A quadratic equation is an equation in which the highest power of the variable is 2.",

            objectives: [
                "Understand what a quadratic equation is.",
                "Identify the coefficients of a quadratic equation.",
                "Solve quadratic equations.",
                "Apply the quadratic formula."
            ],

            explanation: `
                <p>
                    A quadratic equation generally has the form:
                </p>

                <div class="example">
                    <strong>ax² + bx + c = 0</strong>
                </div>

                <p>
                    where <strong>a</strong>, <strong>b</strong> and
                    <strong>c</strong> are constants and
                    <strong>a ≠ 0</strong>.
                </p>

                <p>
                    For example:
                </p>

                <div class="example">
                    x² + 5x + 6 = 0
                </div>

                <p>
                    Here, a = 1, b = 5 and c = 6.
                </p>

                <p>
                    One method of solving a quadratic equation
                    is factorisation.
                </p>
            `,

            examples: `

                <div class="example">

                    <h3>Example 1</h3>

                    <p>
                        Solve:
                    </p>

                    <strong>
                        x² + 5x + 6 = 0
                    </strong>

                    <p>
                        We look for two numbers whose product is
                        6 and whose sum is 5.
                    </p>

                    <p>
                        The numbers are 2 and 3.
                    </p>

                    <strong>
                        (x + 2)(x + 3) = 0
                    </strong>

                    <p>
                        Therefore:
                    </p>

                    <strong>
                        x = -2 or x = -3
                    </strong>

                </div>

            `,

            classwork: `

                <div class="question">
                    <strong>1.</strong>
                    Solve x² + 7x + 12 = 0.
                </div>

                <div class="question">
                    <strong>2.</strong>
                    Solve x² + 8x + 15 = 0.
                </div>

                <div class="question">
                    <strong>3.</strong>
                    Identify a, b and c in:
                    2x² + 5x - 3 = 0.
                </div>

            `,

            exercises: `

                <div class="question">
                    <strong>1.</strong>
                    Solve x² + 9x + 20 = 0.
                </div>

                <div class="question">
                    <strong>2.</strong>
                    Solve x² - 5x + 6 = 0.
                </div>

                <div class="question">
                    <strong>3.</strong>
                    Solve x² + 3x - 10 = 0.
                </div>

            `,

            answers: `
                <p>1. x = -4 or x = -5</p>

                <p>2. x = 2 or x = 3</p>

                <p>3. x = 2 or x = -5</p>
            `
        }

    }

};


function loadLesson() {

    const lesson =
        lessons[subject]?.[topic];

    if (!lesson) {

        document.getElementById(
            "lessonIntroduction"
        ).innerHTML = `
            <p>
                This lesson is currently being prepared.
                More content will be added soon.
            </p>
        `;

        return;
    }


    document.getElementById(
        "lessonIntroduction"
    ).textContent =
        lesson.introduction;


    document.getElementById(
        "learningObjectives"
    ).innerHTML =
        lesson.objectives
            .map(item => `<li>${item}</li>`)
            .join("");


    document.getElementById(
        "lessonExplanation"
    ).innerHTML =
        lesson.explanation;


    document.getElementById(
        "workedExamples"
    ).innerHTML =
        lesson.examples;


    document.getElementById(
        "classworkQuestions"
    ).innerHTML =
        lesson.classwork;


    document.getElementById(
        "exerciseQuestions"
    ).innerHTML =
        lesson.exercises;


    document.getElementById(
        "answers"
    ).innerHTML =
        lesson.answers;
}


function showAnswers() {

    const answers =
        document.getElementById("answers");

    if (answers.style.display === "block") {

        answers.style.display = "none";

    } else {

        answers.style.display = "block";

    }
}


loadLesson();