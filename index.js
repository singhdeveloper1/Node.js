var fs = require("fs")

function hello(){
    console.log("Inside Function")
}

console.log("Simple log")

fs.readFile("file.txt","Utf8", (err,res)=>{
    if(err){
        console.log("cannot get the file")
    }
    console.log(res)
})

hello()
