const fs = require("fs");
const utils = require('./src/Utils');
const helper = new utils();

const multer = require('multer');
const storageConfig = helper.multerConfig();
const upload = multer({ storage: storageConfig });


const readXlsxFile = require('read-excel-file/node')

const schema = {
    'question': {
      prop: 'question',
      type: String,
      required: true
    },
    'answer': {
        prop: 'answer',
        type: String,
        required: true
    },
    'a': {
        prop: 'a',
        type: String
    },
    'b': {
        prop: 'b',
        type: String
    },
    'c': {
        prop: 'c',
        type: String
    },
    'd': {
        prop: 'd',
        type: String
    },
    'e': {
        prop: 'e',
        type: String
    },
}

readXlsxFile('./public/uploads/test.xlsx',{ schema }).then((rows) => {
    console.log(rows);
})

app.post('/api/question/addfromexcelfile', upload.single('questionsfile'), function (req, res, next) {
    helper.processExcelFile( __dirname + '/' + req.file.path, schema, req.body.coursecode, req.body.coursetitle, (error, result) => {
        if(error){
            res.send(error);
            console.error(error);
        }else{
            if(result.status){
                console.log(result.message);
                console.log(result.data);
                // result.data.forEach(question => {
                //     db.questions.save(question, function (err, docs) {
                //         if(err){
                //             res.send(err);
                //         }
                //     })
                // });
                res.json({status: true, message: 'successful'});
            }
        }
    })
})

//add question objectives
app.post('/api/question/addsingle', upload.single('questionsfile'), function (req, res, next) {
    helper.processTextFile( __dirname + '/' + req.file.path, req.body.coursecode, req.body.coursetitle, (error, result) => {
        if(error){
            res.send(error);
            console.error(error);
        }else{
            if(result.status){
                console.log(result.message);
                result.data.forEach(question => {
                    db.questions.save(question, function (err, docs) {
                        if(err){
                            res.send(err);
                        }
                    })
                });
                res.json({status: true, message: 'successful'});
            }
        }
    })
})

//add question subjectives
app.post('/api/question/subjective/add', upload.single('questionsfile'), function (req, res, next) {
    helper.processTextFileForSubjective( __dirname + '/' + req.file.path, req.body.coursecode, req.body.coursetitle, (error, result) => {
        if(error){
            res.send(error);
            console.error(error);
        }else{
            if(result.status){
                console.log(result.message);
                result.data.forEach(question => {
                    db.questions.save(question, function (err, docs) {
                        if(err){
                            res.send(err);
                        }
                    })
                });
                res.json({status: true, message: 'successful'});
            }
        }
    })
})