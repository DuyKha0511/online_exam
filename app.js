const express = require('express'),
  app = express(),
  bodyParser = require("body-parser"),
  port = process.env.PORT || 7777;
const path = require('path');
const http = require('http').createServer(app);
const { createProxyMiddleware } = require('http-proxy-middleware');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");



app.use(bodyParser.json());

//enable cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  next();
});


app.use('/api/auth', createProxyMiddleware({ target: 'https://onlxam-a.herokuapp.com', changeOrigin: true }));
app.use('/api/profile', createProxyMiddleware({ target: 'https://onlxam-a.herokuapp.com', changeOrigin: true }));
app.use('/api/classes', createProxyMiddleware({ target: 'https://onlxam-u.herokuapp.com', changeOrigin: true }));
app.use('/api/questions', createProxyMiddleware({ target: 'https://onlxam-q.herokuapp.com', changeOrigin: true }));
app.use('/api/libraries', createProxyMiddleware({ target: 'https://onlxam-q.herokuapp.com', changeOrigin: true }));

// app.use('/api/auth', createProxyMiddleware({target: 'http://localhost:8889', changeOrigin: true}));

const swaggerOptions = {
  definition: {
    swagger: "2.0",
    info: {
      version: "1.0.0",
      title: "Online Exam API",
      description: "Online Exam API Information, https://onlxam.herokuapp.com",
      contact: {
        url: "https://www.facebook.com/pdk.11.05/"
      },
      servers: [
        {
          url: "http://localhost:7777"
        }
      ]
    },
    host: "https://onlxam.herokuapp.com",
    tags: [
      {
        "name": "Auth Server",
        "description": "Login & Authorization onlxam-a"
      },
      {
        "name": "User Server",
        "description": "Class & User onlxam-u"
      },
      {
        "name": "Exam Server",
        "description": "Exam & Take Exam onlxam-e"
      },
      {
        "name": "Question Server",
        "description": "Question & Library onlxam-q"
      }
    ],
    schemes: [
      "https", "http"
    ],
    securityDefinitions: {
      Bearer: {
        type: "apiKey",
        name: "Authorization",
        in: "header"
      }
    },
    security: {
      Bearer: []
    },
    definitions: {
      Solution: {
        type: "object",
        properties: {
          SolutionID: {
            type: "integer",
            default: 16
          },
          Solution: {
            type: "string",
            default: "contact"
          },
          Correct: {
            type: "boolean",
            default: true
          }, 
          QuestionID: {
            type: "integer",
            default: 5
          }
        }
      },
      SolutionsOfQuestion: {
        type: "array",
        items: {
          "$ref": "#/definitions/Solution"
        },
        example: [
          {
            SolutionID: 16,
            Solution: "contact",
            Correct: true,
            QuestionID: 1
          },
          {
            SolutionID: 17,
            Solution: "contacts",
            Correct: true,
            QuestionID: 1
          }
        ]
      },
      Question: {
        type: "object",
        properties: {
          QuestionID: {
            type: "integer",
            default: 317
          },
          Question: {
            type: "string",
            default: "At the same time, the company also won a two-million-dollar ___ for maintenance of the trains for the next seven years."
          },
          Type: {
            type: "string",
            default: "Multiple Choices"
          },
          Level: {
            type: "string",
            default: "Medium"
          }, 
          LibraryFolderID: {
            type: "integer",
            default: 5
          },
          Solution: {
            type: "array",
            items: {
              "$ref": "#/definitions/Solution"
            }
          }
        },
        example: {
          QuestionID: 317,
          Question: "At the same time, the company also won a two-million-dollar ___ for maintenance of the trains for the next seven years.",
          Type: "Multiple Choices",
          Level: "Medium",
          LibraryFolderID: 5,
          Solution: [
            {
              SolutionID: 17,
              Solution: "contacts",
              Correct: true,
              QuestionID: 1
            },
            {
              SolutionID: 18,
              Solution: "contacts",
              Correct: true,
              QuestionID: 1
            }
          ]
        }
      },
      QuestionsOfLibrary: {
        type: "array",
        items: {
          "$ref": "#/definitions/Question"
        },
        example: [
          {
            QuestionID: 16,
            Question: "At the same time, the company also won a two-million-dollar ___ for maintenance of the trains for the next seven years.",
            Type: "Multiple Choices",
            Level: "Medium",
            LibraryFolderID: 1,
            Solution: [
              {
                SolutionID: 17,
                Solution: "contacts",
                Correct: true,
                QuestionID: 1
              },
              {
                SolutionID: 18,
                Solution: "contacts",
                Correct: true,
                QuestionID: 1
              }
            ]
          },
          {
            QuestionID: 17,
            Question: "At the same time, the company also won a two-million-dollar ___ for maintenance of the trains for the next seven years.",
            Type: "Single Choice",
            Level: "Hard",
            LibraryFolderID: 1,
            Solution: [
              {
                SolutionID: 17,
                Solution: "contacts",
                Correct: true,
                QuestionID: 1
              },
              {
                SolutionID: 18,
                Solution: "contacts",
                Correct: true,
                QuestionID: 1
              }
            ]
          },
        ]
      },
      LibraryOfTeacher: {
        type: "object",
        properties: {
          LibraryFolderID: {
            type: "integer",
            default: 317
          },
          LibraryFolderName: {
            type: "string",
            default: "Viva"
          },
          Description: {
            type: "string",
            default: "Cannabis dependence with other cannabis-induced disorder"
          },
          CreatedDate: {
            type: "string",
            default: "2016-09-27T00:00:00.000Z"
          },   
          UpdatedDate: {
            type: "string",
            default: "2010-12-25T00:00:00.000Z"
          },        
          UserID: {
            type: "integer",
            default: 501
          },
          Avatar: {
            type: "string",
            default: "https://source.unsplash.com/random/400x400"
          },
          TotalQuestions: {
            type: "integer",
            default: 5
          }
        }
      },
      LibrariesOfTeacher: {
        type: "array",
        items: {
          "$ref": "#/definitions/LibraryOfTeacher"
        },
        example: [
          {
            LibraryFolderID: 1,
            LibraryFolderName: "Viva",
            Description: "Cannabis dependence with other cannabis-induced disorder",
            CreatedDate: "2016-09-27T00:00:00.000Z",   
            UpdatedDate: "2010-12-25T00:00:00.000Z",        
            UserID: 501,
            Avatar: "https://source.unsplash.com/random/400x400",
            TotalQuestions: 5
          },
          {
            LibraryFolderID: 2,
            LibraryFolderName: "AI",
            Description: "Cannabis dependence",
            CreatedDate: "2016-09-27T00:00:00.000Z",   
            UpdatedDate: "2010-12-25T00:00:00.000Z",        
            UserID: 501,
            Avatar: "https://source.unsplash.com/random/400x400",
            TotalQuestions: 5
          },
        ]
      },
      ClassMember: {
        type: "object",
        properties: {
          UserID: {
            type: "integer",
            default: 1
          },
          Username: {
            type: "string",
            default: "102180124"
          },
          Fullname: {
            type: "string",
            default: "Anselm"
          },    
          Lastname: {
            type: "string",
            default: "Espinosa"
          },
          Email: {
            type: "string",
            default: "anselm@gmail.com"
          },
          Gender: {
            type: "boolean",
            default: true
          },
          DateOfBirth: {
            type: "string",
            default: "2007-08-17T00:00:00.000Z"
          },
          Address: {
            type: "string",
            default: "46 Hermina Alley"
          },
          Phone: {
            type: "string",
            default: "289 734 0471"
          },
          Avatar: {
            type: "string",
            default: "https://robohash.org/dolorummodinecessitatibus.png?size=400x400&set=set1"
          },
          Authentication: {
            type: "boolean",
            default: true
          }
        }
      },
      ClassMembers: {
        type: "array",
        items: {
          "$ref": "#/definitions/ClassMember"
        },
        example: [
          {
            UserID: 1,
            Username: "102180125",
            Fullname: "Anselm",
            Lastname: "Espinosa",
            Email: "anselm@gmail.com",
            Gender: true,
            DateOfBirth: "2007-08-17T00:00:00.000Z",
            Address: "46 Hermina Alley",
            Phone: "289 734 0471",
            Avatar: "https://robohash.org/dolorummodinecessitatibus.png?size=400x400&set=set1",
            Authentication: true
          },
          {
            UserID: 2,
            Username: "102180151",
            Fullname: "Anselm",
            Lastname: "Espinosa",
            Email: "anselm@gmail.com",
            Gender: true,
            DateOfBirth: "2007-08-17T00:00:00.000Z",
            Address: "46 Hermina Alley",
            Phone: "289 734 0471",
            Avatar: "https://robohash.org/dolorummodinecessitatibus.png?size=400x400&set=set1",
            Authentication: true
          }
        ]
      },
      ClassOfTeacher: {
        type: "object",
        properties: {
          ClassID: {
            type: "integer",
            default: 31
          },
          ClassName: {
            type: "string",
            default: "Class Training"
          },
          TotalStudents: {
            type: "integer",
            default: 20
          },          
          TotalAssignments: {
            type: "integer",
            default: 3
          },
          UserID: {
            type: "integer",
            default: "506"
          },
        }
      },
      ClassesOfTeacher: {
        type: "array",
        items: {
          "$ref": "#/definitions/ClassOfTeacher"
        },
        example: [
          {
            ClassID: 31,
            ClassName: "Class Training",
            TotalStudents: 20,
            TotalAssignments: 3,
            UserID: "506"
          },
          {
            ClassID: 32,
            ClassName: "Class Camping",
            TotalStudents: 25,
            TotalAssignments: 1,
            UserID: "506"
          },
        ]
      },
      ClassOfStudent: {
        type: "object",
        properties: {
          ClassID: {
            type: "integer",
            default: 13
          },
          ClassName: {
            type: "string",
            default: "Class Training"
          },
          TotalStudents: {
            type: "integer",
            default: 20
          },          
          TeacherID: {
            type: "integer",
            default: 501
          },
          TeacherFullname: {
            type: "string",
            default: "Onida McIan"
          },
        }
      },
      ClassesOfStudent: {
        type: "array",
        items: {
          "$ref": "#/definitions/ClassOfStudent"
        },
        example: [
          {
            ClassID: 13,
            ClassName: "Class Training",
            TotalStudents: 20,
            TeacherID: 501,
            TeacherFullname: "Onida McIan"
          },
          {
            ClassID: 14,
            ClassName: "Class Camping",
            TotalStudents: 25,
            TeacherID: 501,
            TeacherFullname: "Onida McIan"
          }
        ]
      },
      UserLogin: {
        type: "object",
        properties: {
          UserID: {
            type: "integer",
            default: 1
          },
          Username: {
            type: "string",
            default: "102180124"
          },
          Fullname: {
            type: "string",
            default: "Anselm"
          },    
          Lastname: {
            type: "string",
            default: "Espinosa"
          },
          Email: {
            type: "string",
            default: "anselm@gmail.com"
          },
          Gender: {
            type: "boolean",
            default: true
          },
          DateOfBirth: {
            type: "string",
            default: "2007-08-17T00:00:00.000Z"
          },
          Address: {
            type: "string",
            default: "46 Hermina Alley"
          },
          Phone: {
            type: "string",
            default: "289 734 0471"
          },
          Avatar: {
            type: "string",
            default: "https://robohash.org/dolorummodinecessitatibus.png?size=400x400&set=set1"
          },
          Authentication: {
            type: "boolean",
            default: true
          },
          RoleID: {
            type: "integer",
            default: 3
          },
          RoleName: {
            type: "string",
            default: "Student"
          }
        }
      },      
      Exam: {
        type: "object",
        properties: {
          ExamID: {
            type: "integer",
            default: 13
          },
          ExamName: {
            type: "string",
            default: "Open-architected solution-oriented contingency"
          },
          TimeBegin: {
            type: "string",
            default: "2021-05-14T22:09:56.000Z"
          },          
          TimeEnd: {
            type: "string",
            default: "2021-12-01T13:28:52.000Z"
          },
          Duration: {
            type: "integer",
            default: 20
          },
          TotalQuestions: {
            type: "integer",
            default: 10
          }
        }
      },
      Exams: {
        type: "array",
        items: {
          "$ref": "#/definitions/Exam"
        },
        example: [
          {
            ExamID: 13,
            ExamName: "Open-architected solution-oriented contingency",
            TimeBegin: "2021-05-14T22:09:56.000Z",
            TimeEnd: "2021-12-01T13:28:52.000Z",
            Duration: 20,
            TotalQuestions: 10
          },
          {
            ExamID: 14,
            ExamName: "Open-architected solution-oriented contingency 22",
            TimeBegin: "2021-05-14T22:09:56.000Z",
            TimeEnd: "2021-12-01T13:28:52.000Z",
            Duration: 50,
            TotalQuestions: 30
          }
        ]
      },
      ExamOfTeacher: {
        type: "object",
        properties: {
          ClassID: {
            type: "integer",
            default: 13
          },
          ClassName: {
            type: "string",
            default: "Class Research and Development"
          },
          ExamID: {
            type: "integer",
            default: 13
          },
          ExamName: {
            type: "string",
            default: "Open-architected solution-oriented contingency"
          },
          TimeBegin: {
            type: "string",
            default: "2021-05-14T22:09:56.000Z"
          },          
          TimeEnd: {
            type: "string",
            default: "2021-12-01T13:28:52.000Z"
          },
          Duration: {
            type: "integer",
            default: 20
          },
          TotalQuestions: {
            type: "integer",
            default: 10
          }
        }
      },
      ExamsOfTeacher: {
        type: "array",
        items: {
          "$ref": "#/definitions/ExamOfTeacher"
        },
        example: [
          {
            ClassID: 31,
            ClassName: "Class Research and Development",
            ExamID: 13,
            ExamName: "Open-architected solution-oriented contingency",
            TimeBegin: "2021-05-14T22:09:56.000Z",
            TimeEnd: "2021-12-01T13:28:52.000Z",
            Duration: 20,
            TotalQuestions: 10
          },
          {
            ClassID: 31,
            ClassName: "Class Research and Development",
            ExamID: 14,
            ExamName: "Open-architected solution-oriented contingency 22",
            TimeBegin: "2021-05-14T22:09:56.000Z",
            TimeEnd: "2021-12-01T13:28:52.000Z",
            Duration: 50,
            TotalQuestions: 30
          }
        ]
      },
      ExamOfStudent: {
        type: "object",
        properties: {
          ClassID: {
            type: "integer",
            default: 13
          },
          ClassName: {
            type: "string",
            default: "Class Research and Development"
          },
          TeacherID: {
            type: "integer",
            default: 422
          },
          TeacherFullname: {
            type: "string",
            default: "Onida McIan"
          },
          ExamID: {
            type: "integer",
            default: 13
          },
          ExamName: {
            type: "string",
            default: "Open-architected solution-oriented contingency"
          },
          TimeBegin: {
            type: "string",
            default: "2021-05-14T22:09:56.000Z"
          },          
          TimeEnd: {
            type: "string",
            default: "2021-12-01T13:28:52.000Z"
          },
          Duration: {
            type: "integer",
            default: 20
          },
          TotalQuestions: {
            type: "integer",
            default: 10
          }
        }
      },
      ExamsOfStudent: {
        type: "array",
        items: {
          "$ref": "#/definitions/ExamOfStudent"
        },
        example: [
          {
            ClassID: 31,
            ClassName: "Class Research and Development",
            TeacherID: 422,
            TeacherFullname: "Onida McIan",
            ExamID: 13,
            ExamName: "Open-architected solution-oriented contingency",
            TimeBegin: "2021-05-14T22:09:56.000Z",
            TimeEnd: "2021-12-01T13:28:52.000Z",
            Duration: 20,
            TotalQuestions: 10
          },
          {
            ClassID: 31,
            ClassName: "Class Research and Development",
            TeacherID: 422,
            TeacherFullname: "Onida McIan",
            ExamID: 14,
            ExamName: "Open-architected solution-oriented contingency 22",
            TimeBegin: "2021-05-14T22:09:56.000Z",
            TimeEnd: "2021-12-01T13:28:52.000Z",
            Duration: 50,
            TotalQuestions: 30
          }
        ]
      }
    }
  },
  apis: [
    "./Controllers/auth.controller.js", 
    "./Controllers/profile.controller.js", 
    "./Controllers/class.controller.js", 
    "./Controllers/library.controller.js", 
    "./Controllers/question.controller.js", 
    "./Controllers/exam.controller.js"
  ]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

http.listen(port,  () => { 
  console.log('Api Gatewaty, listening on port: ' + port);
});
