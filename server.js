const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

//function imports
const extractAtt = require('./selectAtt');

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false }));

const sourceDir = './Files'

let selectedFile;
let result = []
let attDefId;
// Define a route to render the EJS template
app.get('/', (req, res) => {
    const folderPath = path.join(__dirname, 'Files');   
    // Read the files in the folder
    fs.readdir(folderPath, (err, files) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
      }
      // Render the EJS template with the files as data
        res.render('index',
        {
            files,
            selectedFile,
            result,
            attDefId
        });
    });
});

// Define a route to handle the form submission
app.post('/submit', (req, res) => {
  selectedFile = req.body.selectedFile;
  // Process the selected file as needed
    console.log(selectedFile)

  // Send the selected file to another variable or perform any other actions
  // ...

  res.redirect('/')
});


//----------------------------------------------------------


//for created Att array
app.post('/att', (req, res) => {
    const fileSelected = req.body.selectedFile;
    const inputData = fs.readFileSync(`${sourceDir}/${selectedFile}`)
    const parseData = JSON.parse(inputData)
    extractAtt(parseData, result)
    res.redirect('/')
})


//Selecting att 
app.post('/attDefId', (req, res) => {
    attDefId = req.body.attDefId;
    res.redirect('/')
})




// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
