var multer = require('multer');

module.exports = class Utils {
    constructor(){
    }

    processExcelFile(inputFile,schema, coursecode, coursetitle, cb) {
        readXlsxFile(fs.createReadStream(inputFile),schema).then((rows) => {
            var course = { 'code': coursecode, 'title': coursetitle};
            var questions = [];
            rows.forEach(question => {
                question.course = course
                questions.push(question)
            });
            cb(null, {status: true, message: "Excel file processing done!", data: questions})    
        })
    }

    processTextFile(inputFile, coursecode, coursetitle, cb) {
        var lineReader = require('readline').createInterface({input: require('fs').createReadStream(inputFile)});
        var course = { 'code': coursecode, 'title': coursetitle};
        var questions = [];
        var q = {};
        var options = [];
        var isQuestion = true;
        var isOption = false;
        var isAnswer = false;
    
        lineReader.on('line', function (line) {
            if(line != "" && isQuestion){
                q.question = line;
                isQuestion = false;
                isOption = true;
            }
            else if(line != "" && isOption){
                options.push(line);            
            }
            else if(line == "" && options.length > 0 && isOption){
                q.options = options;
                isAnswer = true;
                isOption = false;
            }
            else if(isAnswer){
                q.answer = line;
                isAnswer = false;
            }
            else if(line.toString().indexOf("*") === 0){
                q.course = course;
                questions.push(q);
                q = {};
                options = [];
                isQuestion = true;
                isOption = false;
                isAnswer = false;
            }
        })
        .on("close", () => {
            console.log("end of file.")
            cb(null, {status: true, message: "Text file processing done!", data: questions})
        })
    }
    processTextFileForSubjective(inputFile, coursecode, coursetitle, cb) {
        var lineReader = require('readline').createInterface({input: require('fs').createReadStream(inputFile)});
        var course = { 'code': coursecode, 'title': coursetitle};
        var questions = [];
        var q = {};
        var isQuestion = true;
        var isAnswer = false;
    
        lineReader.on('line', function (line) {
            if(line != "" && isQuestion){
                q.question = line;
                isQuestion = false;
                isAnswer = true;
            }
            else if(line != "" && isAnswer){
                q.answer = line;
                isAnswer = false;
            }
            else if(line.toString().indexOf("*") === 0){
                q.course = course;
                questions.push(q);
                q = {};
                isQuestion = true;
                isAnswer = false;
            }
        })
        .on("close", () => {
            console.log("end of file.")
            cb(null, {status: true, message: "Text file processing done!", data: questions})
        })
    }

    multerConfig (){
        return multer.diskStorage({
            destination: function(req, file, next){
                next(null, 'public/uploads/');
            }, 
            filename: (req, file, cb) => {
                cb(null, Date.now() + '.txt')
            }, 
            fileFilter: function(req, file, cb){
                if (!file.originalname.match(/\.(txt)$/)) {
                    return cb(new Error("Only text(.txt) file is allowed!"), false);
                }
                return cb(false, {status: true, message: "Uploaded file is valid!"});
            }    
        });    
    }
}