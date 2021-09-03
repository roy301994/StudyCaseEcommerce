var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()
var fs=require('fs')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bodyParser = require('body-parser')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler



app.use(function(error, req, res, next) {
  // set locals, only providing error in development
  var date=new Date()
  var yyyy=date.getFullYear()
  var month=date.getMonth()
  var dd=date.getDate()
  var errorStatus=error.status
  var errorStack=error.stack

  // fs.mkdir('log/errors',{recursive:true},async(err)=>{
      
  //   fd=fs.openSync(path.join(process.cwd(),'log_'+ day + '' + month + '' + year + ''),'a')
  //   fs.writeSync(fd,day + '' + month + '' + year + ''+ err.stack )
  //   fs.closeSync(fd)
  
  // })

  fs.mkdir(`logs/errors/`, { recursive: true }, async(err) => {
    fd = fs.openSync(path.join(process.cwd(), `logs/errors/${yyyy}-${month}-${dd}.txt`), 'a')
    fs.writeSync(fd, '\n'+date+' | method: '+req.method+' | uri: '+req.url+' | body: '+JSON.stringify(req.body)+' | query : '+JSON.stringify(req.query)+' | status: '+error.status+' | response: '+JSON.stringify(req._response)+' | env: '+process.env.ENV+' | stack: '+error.stack)
    fs.closeSync(fd)
  });





  
  res.locals.message = error.message;
  res.locals.error = req.app.get('env') === 'development' ? error : {};

  // console.log('ERROR', err)
  
  res.status(req._status);
  res.json({
    
    error:req._error,
    data:[],
    message:req._message,
    stack:error.stack


  })

  // render the error page
  
  // res.render('error');
});

module.exports = app;
