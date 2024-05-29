import * as db from "../db.js";

export const createNewStudent = async (req, res) => {
  const { fname, lname, town } = req.body;
  await db.query(
    `INSERT INTO students (fname,lname,town) VALUES ('${fname}','${lname}','${town}')`
  );
  res.redirect("/students");
};

export const updateStudentById = async (req, res) => {
  const id = req.params.student;
  const { fname, lname, town } = req.body;
  await db.query(
    `
        UPDATE students
        SET
        fname = '${fname}',
        lname = '${lname}',
        town = '${town}'
        WHERE id = ${id}
        `
  );
  res.redirect("/students");
};

export const deleteStudentById = async (req, res) => {
  const student_id = req.params.student;
  await db.query(`DELETE FROM students WHERE id = ${student_id}`);
  await db.query(
    `DELETE FROM student_courses WHERE students_id = ${student_id}`
  );
  res.redirect("/students");
};
