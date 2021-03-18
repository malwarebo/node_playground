const fs = require("fs");
const colorData = require("./assets/colors.json");

colorData.colorList.forEach(c => {
    //create file if it doesn't exist
    fs.appendFile("./storage-files/colors.md", `${c.color} : ${c.hex} \n`, err => {
        if (err) throw err;
    });
});