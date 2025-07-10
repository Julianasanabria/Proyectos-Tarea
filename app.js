import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
/* import autentication from "./routes/autentication.js";
import categories from "./routes/categories.js";
import comments from "./routes/comments.js";
import inteligenciaArtificial from "./routes/inteligenciaArtificial.js";
import projects from "./routes/projects.js";
import roles from "./routes/roles.js";
import states from "./routes/states.js";
import tasks from "./routes/tasks.js";
import users from "./routes/users.js"; */

const app = express();

app.use(express.json())

/* app.use("/", autentication)
app.use("/", categories)
app.use("/", comments)
app.use("/", inteligenciaArtificial)
app.use("/", projects)
app.use("/", roles)
app.use("/", states)
app.use("/", tasks)
app.use("/", users) */

app.listen(process.env.PORT, () => {
    console.log(`Servidor escuchando en el Puerto: ${process.env.PORT}`);
    mongoose
    .connect(`${process.env.MONGODB_URI}`)
    .then(() => console.log(`BASE DE DATOS CONECTADA. 🎉🎉`))
})