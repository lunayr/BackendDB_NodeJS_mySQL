import mysql from "mysql2";

export const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
});

connection.connect(function (err) {
  if (err) throw err;

  connection.query(
    "DROP DATABASE IF EXISTS GritAcademy",
    function (err, result) {
      if (err) throw err;
      console.log("Database deleted");
    }
  );

  connection.query(
    "CREATE DATABASE IF NOT EXISTS GritAcademy",
    function (err, result) {
      if (err) throw err;
      console.log("Database created");
    }
  );

  connection.changeUser({ database: "GritAcademy" }, function (err) {
    if (err) throw err;
  });

  //var sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";

  const students =
    "CREATE TABLE IF NOT EXISTS students (id BIGINT AUTO_INCREMENT, fName TEXT NOT NULL, lName TEXT NOT NULL, town TEXT, PRIMARY KEY(id))";
  const courses =
    "CREATE TABLE IF NOT EXISTS courses (id BIGINT AUTO_INCREMENT, name TEXT NOT NULL, description TEXT, PRIMARY KEY(id))";
  const student_courses =
    "CREATE TABLE IF NOT EXISTS student_courses (id BIGINT AUTO_INCREMENT, students_id BIGINT, courses_id BIGINT, FOREIGN KEY (students_id) REFERENCES students(id),FOREIGN KEY (courses_id) REFERENCES courses(id), PRIMARY KEY(id))";

  const student_data = `INSERT INTO students(fName, lName, town) VALUES 
  ('John', 'Watson', 'London'),
  ('John', 'Wick', 'New York City'),
  ('John', 'McClane', 'Los Angeles'),
  ('John', 'Rambo', 'Hope, Washington'),
  ('John', 'Connor', 'Los Angeles'),
  ('Jon', 'Snow', 'Winterfell'),
  ('John', 'Marston', 'Blackwater'),
  ('Johnny', 'Bravo', 'Aron City'),
  ('John', 'Constantine', 'London'),
  ('Johnny', 'Cage', 'Earthrealm'),
  ('John', 'Smith', 'Los Angeles');`;

  const courses_data = `INSERT INTO courses(name, description) VALUES 
  ('Defense Against the Dark Arts', 'A class that teaches students how to defend themselves against dark creatures, the Dark Arts, and other dark charms.'),
  ('Potions', 'A class that teaches students the correct way to brew potions with various magical effects.'),
  ('Transfiguration', 'A class that teaches students how to change the form or appearance of an object.'),
  ('Herbology', 'A class that teaches students about magical and mundane plants and fungi, including how to care for, utilize, and combat them.'),
  ('Charms', 'A class that teaches students how to cast spells that add certain properties to an object or individual.'),
  ('Astronomy', 'A class that teaches students about stars, planets, and other celestial objects.'),
  ('History of Magic', 'A class that teaches students about magical history.'),
  ('Care of Magical Creatures', 'A class that teaches students about how to care for magical beasts.'),
  ('Divination', 'A class that teaches students how to foresee future events.'),
  ('Ancient Runes', 'A class that teaches students about runic scripts and how to interpret and use them.'),
  ('Arithmancy', 'A class that teaches students about the magical properties of numbers.'),
  ('Muggle Studies', 'A class that teaches students about the non-magical world and how Muggles (non-magical people) live without magic.');
  `;

  const student_course_association_data = `INSERT INTO student_courses(students_id, courses_id) VALUES 
  (1, 1),
  (1, 2),
  (2, 3),
  (2, 4),
  (3, 5),
  (3, 6),
  (4, 7),
  (4, 8),
  (5, 9),
  (5, 10),
  (6, 11),
  (6, 12),
  (7, 1),
  (7, 2),
  (8, 3),
  (8, 4),
  (9, 5),
  (9, 6),
  (10, 7),
  (10, 8),
  (11, 9),
  (11, 10),
  (1, 11),
  (2, 12),
  (3, 1),
  (4, 2),
  (5, 3),
  (6, 4),
  (7, 5),
  (8, 6),
  (9, 7),
  (10, 8),
  (11, 9),
  (1, 10),
  (2, 11),
  (3, 12),
  (4, 1),
  (5, 2),
  (6, 3),
  (7, 4),
  (8, 5),
  (9, 6),
  (10, 7),
  (11, 8);`;

  //CREATE TABLES
  connection.query(students, function (err, result) {
    if (err) throw err;
    console.log("Students table created");
  });

  connection.query(courses, function (err, result) {
    if (err) throw err;
    console.log("Courses table created");
  });

  connection.query(student_courses, function (err, result) {
    if (err) throw err;
    console.log("Student Courses table created");
  });

  //POPULATE TABLES
  connection.query(student_data, function (err, result) {
    if (err) throw err;
    console.log("Students table populated");
  });

  connection.query(courses_data, function (err, result) {
    if (err) throw err;
    console.log("Courses table populated");
  });

  connection.query(student_course_association_data, function (err, result) {
    if (err) throw err;
    console.log("Student Courses table populated");
  });
});
