import * as db from "../db.js";

export const createNewCourse = async (req, res) => {
  const { name, description } = req.body;
  await db.query(
    `INSERT INTO courses (name,description) VALUES ('${name}','${description}')`
  );
  res.redirect("/courses");
};

export const updateCourseById = async (req, res) => {
  const course_id = req.params.course;
  const { name, description } = req.body;
  await db.query(
    `
        UPDATE courses
        SET
        name = '${name}',
        description = '${description}'
        WHERE id = ${course_id}
        `
  );
  res.redirect("/courses");
};

export const deleteCourseById = async (req, res) => {
  const course_id = req.params.course;
  await db.query(`DELETE FROM courses WHERE id = ${course_id}`);
  await db.query(`DELETE FROM student_courses WHERE courses_id = ${course_id}`);
  res.redirect("/courses");
};
