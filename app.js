import express from "express";

// import bodyParser from "body-parser";

import path from "path";
import { fileURLToPath } from "url";
import {
  displayAllStudents,
  displayCoursesByStudentString,
  displayCoursesForSpecificStudent,
  displayStudentEditForm,
  displayStudentsByStudentString,
} from "./modules/students.js";
import { displayCoursesForSpecificTown } from "./modules/towns.js";
import {
  displayAllCourses,
  displayAllStudentsByCourseString,
  displayAllStudentsForSpecificCourse,
  displayCourseEditForm,
  displaySearchCourses,
} from "./modules/courses.js";
import {
  displayAllStudentCourseConnections,
  displayAssociationEditForm,
} from "./modules/student-courses.js";
import { isNumeric } from "./lib/util.js";
import bodyParser from "body-parser";
import {
  createNewStudent,
  deleteStudentById,
  updateStudentById,
} from "./api/students.js";
import {
  createNewCourse,
  deleteCourseById,
  updateCourseById,
} from "./api/courses.js";
import {
  createNewAssociation,
  deleteAssociationById,
  updateAssociationById,
} from "./api/student-courses.js";

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const app = express();
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", async (req, res) => {
  const pageTitle = "Welcome to Gritacademy database!";
  res.render("index", { pageTitle, homepage: "home" });
});

// STUDENT CRUD
app.get("/students", displayAllStudents);
app.post("/students", createNewStudent);
app.get("/students/:student", displayStudentsByStudentString);

app.get("/students/:student/edit", displayStudentEditForm);
app.post("/students/:student/edit", updateStudentById);

app.get("/students/:student/delete", deleteStudentById);

// COURSES CRUD
app.get("/courses", displayAllCourses);
app.post("/courses", createNewCourse);
// app.post("/courses/:course/students", createNewCourse);

app.get("/courses/:course/edit", displayCourseEditForm);
app.post("/courses/:course/edit", updateCourseById);

app.get("/courses/:course/delete", deleteCourseById);

// STUDENTCOURSES CRUD
app.get("/associations", displayAllStudentCourseConnections);
app.post("/associations", createNewAssociation);

app.get("/associations/:association/edit", displayAssociationEditForm);
app.post("/associations/:association/edit", updateAssociationById);

app.get("/associations/:association/delete", deleteAssociationById);

//other
app.get("/students/:student/courses", async (req, res) =>
  isNumeric(req.params.student)
    ? displayCoursesForSpecificStudent(req, res)
    : displayCoursesByStudentString(req, res)
);

app.get("/towns/:town/courses", displayCoursesForSpecificTown);

app.get("/courses/:course", displaySearchCourses);

app.get("/courses/:course/students", async (req, res) =>
  isNumeric(req.params.course)
    ? displayAllStudentsForSpecificCourse(req, res)
    : displayAllStudentsByCourseString(req, res)
);

const port = 3000;
app.listen(port, () => {
  console.log(`server is running on  http://localhost:${port}/`);
});
