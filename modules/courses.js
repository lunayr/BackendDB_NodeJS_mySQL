import * as db from "../db.js";

export const displayAllCourses = async (req, res) => {
  const pageTitle = "All Courses";
  let dbData = await db.query("SELECT id,name,description FROM courses");

  dbData = dbData.map(({ id, name, description }) => ({
    "Course Name": { text: name, link: "/courses/" + id + "/students" },
    Description: description,
    Actions: {
      actions: [
        { text: "Edit", link: "/courses/" + id + "/edit" },
        { text: "Delete", link: "/courses/" + id + "/delete" },
      ],
    },
  }));

  const newData = {
    action: "/courses",
    title: "Add new course",
    inputs: [
      { name: "name", label: "Course Name", value: "" },
      { name: "description", label: "Description", value: "" },
    ],
    button: "Add course",
  };

  res.render("index", { pageTitle, dbData, newData });
};

export const displaySearchCourses = async (req, res) => {
  const dbData = await db.query(
    `
        SELECT * FROM courses
        WHERE name LIKE '%${req.params.course}%' OR description LIKE '%${req.params.course}%'
    `
  );
  const pageTitle = "Search courses: " + req.params.course;
  res.render("index", { pageTitle, dbData });
};

export const displayAllStudentsForSpecificCourse = async (req, res) => {
  let course_id = req.params.course;
  const courseName = await db.query(
    `
        SELECT name
        FROM courses
        WHERE id = ${course_id}
    `
  );
  const pageTitle = courseName[0].name;
  const dbData = await db.query(
    `
        SELECT CONCAT(students.fname, ' ', students.lname) AS student_name
        FROM student_courses
        INNER JOIN students on students.id = student_courses.students_id
        WHERE courses_id = ${course_id}
    `
  );

  res.render("index", { pageTitle, dbData });
};

export const displayAllStudentsByCourseString = async (req, res) => {
  let course_string = req.params.course;
  const pageTitle = "All students in courses that contain: " + course_string;
  const dbData = await db.query(
    `
        SELECT CONCAT(students.fname, ' ', students.lname) AS full_name
        FROM student_courses
        INNER JOIN students on students.id = student_courses.students_id
        INNER JOIN courses on courses.id = student_courses.courses_id
        WHERE courses.name = '${course_string}'`
  );

  res.render("index", { pageTitle, dbData });
};

export const displayCourseEditForm = async (req, res) => {
  const course_id = req.params.course;
  const courseData = await db.query(
    `
      SELECT 
      name,
      description
      FROM courses WHERE id = ${course_id}
      `
  );

  const newData = {
    action: "/courses/" + course_id + "/edit",
    inputs: [
      { name: "name", label: "Course name", value: courseData[0].name },
      {
        name: "description",
        label: "Description",
        value: courseData[0].description,
      },
    ],
    button: "Edit course",
  };
  res.render("index", {
    pageTitle: "Edit " + courseData[0].name,
    newData,
  });
};
