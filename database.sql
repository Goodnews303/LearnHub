CREATE DATABASE IF NOT EXISTS learnhub CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE learnhub;

CREATE TABLE subjects (
 id INT AUTO_INCREMENT PRIMARY KEY,
 name VARCHAR(100) NOT NULL UNIQUE,
 icon VARCHAR(20) NOT NULL,
 description TEXT NOT NULL
);

CREATE TABLE topics (
 id INT AUTO_INCREMENT PRIMARY KEY,
 subject_id INT NOT NULL,
 title VARCHAR(150) NOT NULL,
 short_description TEXT NOT NULL,
 introduction_html MEDIUMTEXT NOT NULL,
 objectives_html MEDIUMTEXT NOT NULL,
 lesson_html MEDIUMTEXT NOT NULL,
 examples_html MEDIUMTEXT NOT NULL,
 sort_order INT DEFAULT 0,
 FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE
);

CREATE TABLE exercises (
 id INT AUTO_INCREMENT PRIMARY KEY,
 topic_id INT NOT NULL,
 question TEXT NOT NULL,
 options JSON NOT NULL,
 answer VARCHAR(10) NOT NULL,
 sort_order INT DEFAULT 0,
 FOREIGN KEY (topic_id) REFERENCES topics(id) ON DELETE CASCADE
);

INSERT INTO subjects (name, icon, description) VALUES
('English','📘','Grammar, vocabulary, comprehension, writing and literature.'),
('Mathematics','📐','Algebra, geometry, trigonometry, statistics, calculus and more.'),
('Chemistry','⚗️','Atoms, bonding, reactions, calculations and organic chemistry.'),
('Physics','⚡','Mechanics, electricity, waves, heat, light and modern physics.'),
('Biology','🧬','Cells, genetics, ecology, human biology and living organisms.');

INSERT INTO topics
(subject_id,title,short_description,introduction_html,objectives_html,lesson_html,examples_html,sort_order)
VALUES
(
 (SELECT id FROM subjects WHERE name='Mathematics'),
 'Quadratic Equations',
 'Learn the meaning, structure and methods used to solve quadratic equations.',
 '<p>A quadratic equation is an equation in which the highest power of the variable is 2.</p>',
 '<ul><li>Define a quadratic equation.</li><li>Identify a, b and c.</li><li>Solve simple quadratic equations by factorisation.</li></ul>',
 '<p>A quadratic equation has the general form <strong>ax² + bx + c = 0</strong>, where <strong>a ≠ 0</strong>.</p><p>For example, <strong>x² + 5x + 6 = 0</strong>. This can be factorised as <strong>(x + 2)(x + 3) = 0</strong>.</p><p>Therefore, the solutions are <strong>x = -2</strong> and <strong>x = -3</strong>.</p>',
 '<div class="example"><h3>Example</h3><p>Solve x² + 7x + 12 = 0.</p><p>We need two numbers whose product is 12 and whose sum is 7: 3 and 4.</p><p><strong>(x + 3)(x + 4) = 0</strong></p><p>So <strong>x = -3</strong> or <strong>x = -4</strong>.</p></div>',
 1
);

INSERT INTO exercises (topic_id,question,options,answer,sort_order)
VALUES
((SELECT id FROM topics WHERE title='Quadratic Equations'),'What is the highest power of x in a quadratic equation?','{"A":"1","B":"2","C":"3","D":"4"}','B',1),
((SELECT id FROM topics WHERE title='Quadratic Equations'),'Which is a quadratic equation?','{"A":"2x + 3 = 0","B":"x² + 4x + 3 = 0","C":"x³ + 1 = 0","D":"5x - 2 = 0"}','B',2),
((SELECT id FROM topics WHERE title='Quadratic Equations'),'Solve x² + 5x + 6 = 0.','{"A":"2, 3","B":"-2, -3","C":"-1, -6","D":"1, 6"}','B',3);
