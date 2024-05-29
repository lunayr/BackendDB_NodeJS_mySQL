import * as db from "../db.js";

export const createNewAssociation = async (req, res) => {
  const { courses_id, students_id } = req.body;
  await db.query(
    `INSERT INTO student_courses (courses_id,students_id) VALUES ('${courses_id}','${students_id}')`
  );
  res.redirect("/associations");
};

export const updateAssociationById = async (req, res) => {
  const id = req.params.association;
  const { courses_id, students_id } = req.body;
  await db.query(
    `
        UPDATE student_courses
        SET
        courses_id = '${courses_id}',
        students_id = '${students_id}'
        WHERE id = ${id}
    `
  );
  res.redirect("/associations");
};

export const deleteAssociationById = async (req, res) => {
  const id = req.params.association;
  await db.query(`DELETE FROM student_courses WHERE id = ${id}`);
  res.redirect("/associations");
};
