const mongoose = require("mongoose")
const dotenv = require("dotenv");
const express = require("express")
const cors = require("cors")
const path = require('path')
const connection = mongoose.connection


dotenv.config();

mongoose.connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})

const app = express();
app.use(cors())

app.use(express.json())
app.use(require("./routes/students"))
app.use(require("./routes/faculty"))
app.use(require("./routes/enrollments"))
app.use(require("./routes/results"))
app.use(require("./routes/courses"))
app.use(require("./routes/users"))
app.use(require("./routes/degrees"))
app.use(require("./routes/roles"))
app.use(require("./routes/loginDetails"))
app.use(require("./routes/notifications"))
app.use(require("./routes/assignedCourses"))
app.use(require("./routes/attendance"))

app.use("/file", require("./routes/images"))

const port = process.env.PORT || 5000

connection.once("open", () => {
    console.log("DB Connection Successfull");
})

const server = require("http").createServer(app);

server.listen(port, () => console.log(`Server now running on port ${port}!`));