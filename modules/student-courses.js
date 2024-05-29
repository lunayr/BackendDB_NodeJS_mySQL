import * as db from "../db.js";

export const displayAllStudentCourseConnections = async (req, res) => {
  const pageTitle = "Relation between courses and students";
  let dbData = await db.query(
    `
        SELECT
        student_courses.id,
        CONCAT(students.fname, ' ', students.lname) AS student_name,
        students_id,
        courses_id,
        courses.name AS course_name
        FROM student_courses
        INNER JOIN students on students.id = student_courses.students_id
        INNER JOIN courses on courses.id = student_courses.courses_id
    `
  );

  dbData = dbData.map(
    ({ id, student_name, course_name, students_id, courses_id }) => ({
      "Course Name": {
        text: course_name + " [" + courses_id + "]",
        link: "/courses/" + courses_id + "/students",
      },
      "Student Name": {
        text: student_name + " [" + students_id + "]",
        link: "/students/" + students_id + "/courses",
      },
      Actions: {
        actions: [
          { text: "Edit", link: "/associations/" + id + "/edit" },
          { text: "Delete", link: "/associations/" + id + "/delete" },
        ],
      },
    })
  );

  const newData = {
    action: "/associations",
    title: "Add new association",
    inputs: [
      { name: "courses_id", label: "Course ID", value: "" },
      { name: "students_id", label: "Student ID", value: "" },
    ],
    button: "Add association",
  };

  res.render("index", { pageTitle, dbData, newData });
};

export const displayAssociationEditForm = async (req, res) => {
  const id = req.params.association;
  const associationData = await db.query(
    `
        SELECT 
        courses_id,
        students_id
        FROM student_courses WHERE id = ${id}
        `
  );

  const newData = {
    action: "/association/" + id + "/edit",
    inputs: [
      {
        name: "courses_id",
        label: "Course ID",
        value: associationData[0].courses_id,
      },
      {
        name: "students_id",
        label: "Student ID",
        value: associationData[0].students_id,
      },
    ],
    button: "Edit Association",
  };
  res.render("index", {
    pageTitle: "Edit association",
    newData,
  });
};
