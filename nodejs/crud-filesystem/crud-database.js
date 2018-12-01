const fs = require('fs');
const path = require('path');
const { promisify } = require("util");
const readFile = promisify(fs.readFile);

//The base directory
let baseDir =  path.join(__dirname,'./database');
console.log(`crud database: ${baseDir}`);

//The CRUD object
module.exports = {
    create: (file,data) => {
        fs.open(`${baseDir}/${file}.json`,'wx',(err,identifier)=>{
            if(!err && identifier){
                let jsonArray = [];

                jsonArray.push(data);

                let stringData = JSON.stringify(jsonArray,null,3);
                
                fs.writeFile(identifier,stringData,(err)=>{
                    if(!err){
                        fs.close(identifier,(err) =>{
                            if(!err) console.log('no errors');
                            else console.log(err);
                        })
                    } else console.log(err);
                })
            }
            else console.log(err);
            });
    },
    read: (file) =>{
        fs.readFile(`${baseDir}/${file}.json`,'utf8',(err,data)=>{
            if(err) return err;

            console.log(data);
            return data;
        });
    },

    update: (file,data) => {
        //readFile returns promises
        readFile(`${baseDir}/${file}.json`,'utf8')
            .then(newStream =>{
                //Change the string to a JS object
                let newData = JSON.parse(newStream);
                // Push our update to the array
                newData.push(data);
                // return our data as a string 
                return JSON.stringify(newData,null,3);
            })
            .then(finalData =>{
                //replace the content in the file, with the updated data.
                fs.truncate(`${baseDir}/${file}.json`,(err)=>{
                    if(!err) {
                        fs.writeFile(`${baseDir}/${file}.json`,finalData,(err)=>{
                            if(err) return err;
                        })
                    } else return err;
                })
            })
            .catch(err => console.log(err))
    },

    delete: (file) => {
        fs.unlink(`${baseDir}/${file}.json`,err=>{
            if(!err) console.log('deleted');
            else return err;
        })
    }
};