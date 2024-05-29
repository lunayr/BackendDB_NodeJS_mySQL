import * as db from "../db.js";

export const displayAllStudents = async (req, res) => {
  const pageTitle = "All Students";
  let dbData = await db.query(
    `SELECT
    id,
    CONCAT(students.fname, ' ', students.lname) AS full_name,
    town
    FROM students`
  );
  dbData = dbData.map(({ full_name, id, town }) => ({
    "Full Name": { text: full_name, link: "/students/" + id + "/courses" },
    Town: { text: town, link: "/towns/" + town + "/courses" },
    Actions: {
      actions: [
        { text: "Edit", link: "/students/" + id + "/edit" },
        { text: "Delete", link: "/students/" + id + "/delete" },
      ],
    },
  }));

  const newData = {
    action: "/students",
    title: "Add new student",
    inputs: [
      { name: "fname", label: "First name", value: "" },
      { name: "lname", label: "Last name", value: "" },
      { name: "town", label: "Town", value: "" },
    ],
    button: "Add student",
  };

  res.render("index", { pageTitle, dbData, newData });
};

export const displayStudentEditForm = async (req, res) => {
  const student_id = req.params.student;
  const studentData = await db.query(
    `
    SELECT 
    CONCAT(fname, ' ', lname) AS full_name,
    fname,
    lname,
    town
    FROM students WHERE id = ${student_id}
    `
  );

  const newData = {
    action: "/students/" + student_id + "/edit",
    inputs: [
      { name: "fname", label: "First name", value: studentData[0].fname },
      { name: "lname", label: "Last name", value: studentData[0].lname },
      { name: "town", label: "Town", value: studentData[0].town },
    ],
    button: "Edit student",
  };
  res.render("index", {
    pageTitle: "Edit " + studentData[0].full_name,
    newData,
  });
};

export const displayCoursesForSpecificStudent = async (req, res) => {
  let studentid = req.params.student;
  const studentName = await db.query(
    `
    SELECT CONCAT(fname, ' ', lname) AS name
    FROM students WHERE id = ${studentid}
    `
  );
  const pageTitle = studentName[0].name;
  const dbData = await db.query(
    `
    SELECT courses.name AS course_name
    FROM student_courses
    INNER JOIN courses on courses.id = student_courses.courses_id
    WHERE students_id = ${studentid}
    `
  );

  res.render("index", { pageTitle, dbData });
};

export const displayCoursesByStudentString = async (req, res) => {
  let search_string = req.params.student;
  const pageTitle = "Courses for students with: " + search_string;
  let dbData = await db.query(
    `
        SELECT
        CONCAT(students.fname, ' ', students.lname) AS full_name,  
        courses.name AS course_name
        FROM student_courses
        INNER JOIN courses on courses.id = student_courses.courses_id
        INNER JOIN students on students.id = student_courses.students_id
        WHERE students.fname = '${search_string}' OR students.lname = '${search_string}'
    `
  );

  res.render("index", { pageTitle, dbData });
};

export const displayStudentsByStudentString = async (req, res) => {
  let search_string = req.params.student;
  const pageTitle = "Students with: " + search_string;
  let dbData = await db.query(
    `
        SELECT
        CONCAT(students.fname, ' ', students.lname) AS full_name,
        town AS Town
        FROM students
        WHERE students.fname = '${search_string}' OR students.lname = '${search_string}'
    `
  );

  res.render("index", { pageTitle, dbData });
};
