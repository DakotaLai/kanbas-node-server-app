import Database from "../Database/index.js"; 
export default function CourseRoutes(app) { 
    // get all courses.
    app.get("/api/courses", (req, res) => { 
        const courses = Database.courses; 
        res.send(courses); 
    });

    //Creating new courses
    app.post("/api/courses", (req, res) => {
        const course = { ...req.body,
        _id: new Date().getTime().toString() };
        Database.courses.push(course);
        res.send(course);
    });

    //Delete a course
    app.delete("/api/courses/:id", (req, res) => {
        const {id} = req.params;
        Database.courses = Database.courses.filter((c) => c._id !== id);
        res.sendStatus(204);
    });

    //Update a Course
    app.put("/api/courses/:id", (req, res) => {
        const {id} = req.params;
        const course = req.body;
        Database.courses = Database.courses.map((c) => c._id === id ? {
            ...c, ...course
        } : c);
        res.sendStatus(204);
    });

    // Retrieve a course.
    app.get("/api/courses/:id", (req, res) => {
        const { id } = req.params;
        const course = Database.courses.find((c) => c._id === id);
        if (!course) {
            res.status(404).send("Course not found");
        } 
        res.send(course);
    });
}