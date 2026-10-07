const topics = {

    English: [
        "Parts of Speech",
        "Nouns",
        "Pronouns",
        "Verbs",
        "Adjectives",
        "Adverbs",
        "Tenses",
        "Sentence Structure",
        "Punctuation",
        "Comprehension",
        "Vocabulary Development",
        "Essay Writing",
        "Letter Writing",
        "Summary Writing",
        "Literature"
    ],

    Mathematics: [
        "Number Systems",
        "Fractions",
        "Indices",
        "Logarithms",
        "Algebra",
        "Quadratic Equations",
        "Simultaneous Equations",
        "Functions",
        "Geometry",
        "Trigonometry",
        "Mensuration",
        "Statistics",
        "Probability",
        "Vectors",
        "Calculus"
    ],

    Chemistry: [
        "Matter",
        "Atomic Structure",
        "Periodic Table",
        "Chemical Bonding",
        "Mole Concept",
        "Chemical Equations",
        "Stoichiometry",
        "Acids, Bases and Salts",
        "Redox Reactions",
        "Organic Chemistry",
        "Hydrocarbons",
        "Electrochemistry",
        "Thermochemistry",
        "Chemical Equilibrium"
    ],

    Physics: [
        "Measurement",
        "Scalars and Vectors",
        "Motion",
        "Forces",
        "Work, Energy and Power",
        "Momentum",
        "Simple Machines",
        "Heat",
        "Waves",
        "Sound",
        "Light",
        "Electricity",
        "Magnetism",
        "Electromagnetic Waves",
        "Modern Physics"
    ],

    Biology: [
        "Characteristics of Living Things",
        "Cell Structure",
        "Cell Division",
        "Nutrition",
        "Photosynthesis",
        "Respiration",
        "Transport System",
        "Excretion",
        "Reproduction",
        "Genetics",
        "Evolution",
        "Ecology",
        "Human Biology",
        "Microorganisms",
        "Plant Biology"
    ]
};


/* SHOW SUBJECT TOPICS */

function showTopics(subject) {

    const topicTitle = document.getElementById("topicTitle");
    const topicContainer = document.getElementById("topicContainer");

    topicTitle.textContent = subject + " Topics";

    topicContainer.innerHTML = "";

    topics[subject].forEach(function(topic) {

        const card = document.createElement("div");

        card.className = "topic-card";

        card.innerHTML = `
            <h3>${topic}</h3>
            <p>
                Learn ${topic} with explanations,
                examples and practice questions.
            </p>
        `;

        card.onclick = function() {
            openTopic(subject, topic);
        };

        topicContainer.appendChild(card);
    });

    document.getElementById("topicSection")
        .scrollIntoView({ behavior: "smooth" });
}


/* OPEN TOPIC */

function openTopic(subject, topic) {
    localStorage.setItem("selectedSubject", subject);
    localStorage.setItem("selectedTopic", topic);

    window.location.href = "lesson.html";
}



/* SEARCH */

function searchTopics() {

    const search =
        document.getElementById("searchInput")
        .value
        .toLowerCase()
        .trim();

    const results =
        document.getElementById("searchResults");

    results.innerHTML = "";

    if (search === "") {
        return;
    }

    let found = [];

    for (const subject in topics) {

        topics[subject].forEach(function(topic) {

            if (
                topic.toLowerCase().includes(search) ||
                subject.toLowerCase().includes(search)
            ) {

                found.push({
                    subject: subject,
                    topic: topic
                });

            }

        });

    }

    if (found.length === 0) {

        results.innerHTML =
            "<p>No topic found. Try another search.</p>";

        return;
    }

    found.forEach(function(item) {

        const result = document.createElement("div");

        result.className = "topic-card";

        result.innerHTML = `
            <h3>${item.topic}</h3>
            <p>${item.subject}</p>
        `;

        result.onclick = function() {
            openTopic(item.subject, item.topic);
        };

        results.appendChild(result);
    });
}


/* MOBILE MENU */

function toggleMenu() {

    const links = document.querySelector(".nav-links");

    if (links.style.display === "flex") {
        links.style.display = "none";
    } else {
        links.style.display = "flex";
        links.style.flexDirection = "column";
        links.style.position = "absolute";
        links.style.top = "70px";
        links.style.right = "20px";
        links.style.background = "white";
        links.style.padding = "20px";
        links.style.borderRadius = "10px";
        links.style.boxShadow =
            "0 10px 30px rgba(0,0,0,0.1)";
    }
}