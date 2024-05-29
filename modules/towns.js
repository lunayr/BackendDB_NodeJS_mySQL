import * as db from "../db.js";

export const displayCoursesForSpecificTown = async (req, res) => {
  const pageTitle = req.params.town;
  const dbData = await db.query(
    `
    SELECT CONCAT(students.fname, ' ', students.lname) AS full_name,
    courses.name AS course_name
    FROM student_courses
    INNER JOIN courses on courses.id = student_courses.courses_id
    INNER JOIN students on students.id = student_courses.students_id
    WHERE town = '${req.params.town}'
    `
  );

  res.render("index", { pageTitle, dbData });
};
