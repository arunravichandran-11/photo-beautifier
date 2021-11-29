const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(cors());
// app.use(express.bodyParser({ limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded());

app.post("/print-information", (req, res) => {
  const fileName = `${req.body.id}`;
  const path = `./print/${fileName}.json`;
  const data = JSON.stringify(req.body);
  // write JSON string to a file
  fs.writeFile(path, data, (err) => {
    if (err) {
      throw err;
    }
    res.status(200).send({
      fileName: fileName,
      state: "SAVED",
      message: "Print Instruction Saved",
    });
  });
});

app.get("/printInstruction", (req, res) => {
  const fileData = fs.readFileSync(
    path.resolve(__dirname, "print/bot.jpg-latest.json")
  );
  const printInstruction = JSON.parse(fileData);
  res.send(printInstruction);
});

app.get("/imported-prints", (req, res) => {
  const filesInDir = fs
    .readdirSync(path.resolve(__dirname, "print"))
    .filter((file) => path.extname(file) === ".json");

  const allFiles = [];

  if (filesInDir.length > 0) {
    filesInDir.forEach((file) => {
      const fileData = fs.readFileSync(path.join("./print", file));
      const json = JSON.parse(fileData.toString());
      allFiles.push(json);
    });
  }

  res.send({
    data: allFiles,
  });
});

app.listen(5000, () => {
  console.log("server started");
});
