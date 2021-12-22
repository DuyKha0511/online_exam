const path = require('path');
const gateway = require('express-gateway');
const express = require('express'),
  app = express(),
  bodyParser = require("body-parser"),
  port = process.env.PORT || 7777;
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { createProxyMiddleware } = require('http-proxy-middleware');
const morgan = require("morgan");

// gateway()
//   .load(path.join(__dirname, 'config'))
//   .run();


app.use(morgan('combined'));
app.use('/api/auth', createProxyMiddleware({ target: 'https://onlxam-a.herokuapp.com', changeOrigin: true }));
app.use('/api/profile', createProxyMiddleware({ target: 'https://onlxam-a.herokuapp.com', changeOrigin: true }));
app.use('/api/role', createProxyMiddleware({ target: 'https://onlxam-a.herokuapp.com', changeOrigin: true }));
app.use('/api/classes', createProxyMiddleware({ target: 'https://onlxam-u.herokuapp.com', changeOrigin: true }));
app.use('/api/users', createProxyMiddleware({ target: 'https://onlxam-u.herokuapp.com', changeOrigin: true }));
app.use('/api/questions', createProxyMiddleware({ target: 'https://onlxam-q.herokuapp.com', changeOrigin: true }));
app.use('/api/libraries', createProxyMiddleware({ target: 'https://onlxam-q.herokuapp.com', changeOrigin: true }));
app.use('/api/exams', createProxyMiddleware({ target: 'https://onlxam-e.herokuapp.com', changeOrigin: true }));
app.use('/api/results', createProxyMiddleware({ target: 'https://onlxam-e.herokuapp.com', changeOrigin: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



//enable cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  next();
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

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
          url: "https://onlxam.herokuapp.com"
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
      Function: {
        type: "object",
        properties: {
          FunctionID: {
            type: "integer",
            default: 1
          },
          ActionName: {
            type: "string",
            default: "View info of a student"
          },
          Type: {
            type: "integer",
            default: 1
          },
          Code: {
            type: "string",
            default: "VIEW"
          },
          GroupFunctionID: {
            type: "integer",
            default: 1
          }
        }
      },
      FunctionsOfAGroup: {
        type: "array",
        items: {
          "$ref": "#/definitions/Function"
        },
        example: [
          {
            FunctionID: 1,
            ActionName: "View info of a student",
            Type: 1,
            Code: "VIEW",
            GroupFunctionID: 1
          },
          {
            FunctionID: 2,
            ActionName: "Create a new student infomation",
            Type: 2,
            Code: "CREATE",
            GroupFunctionID: 1
          },
          {
            FunctionID: 3,
            ActionName: "Edit info of a student",
            Type: 3,
            Code: "EDIT",
            GroupFunctionID: 1
          }
        ]
      },
      GroupFunction: {
        type: "object",
        properties: {
          GroupFunctionID: {
            type: "integer",
            default: 1
          },
          GroupFunctionName: {
            type: "string",
            default: "Student Management"
          }
        }
      },
      GroupFunctions: {
        type: "array",
        items: {
          "$ref": "#/definitions/GroupFunction"
        },
        example: [
          {
            GroupFunctionID: 1,
            GroupFunctionName: "Student Management"
          },
          {
            GroupFunctionID: 2,
            GroupFunctionName: "Teacher Management"
          },
          {
            GroupFunctionID: 3,
            GroupFunctionName: "Account Management"
          }
        ]
      },
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
      NewQuestion: {
        type: "object",
        properties: {
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
          Solution: {
            type: "array",
            items: {
              Solution: {
                type: "string",
                default: "contact"
              },
              Correct: {
                type: "boolean",
                default: true
              }, 
            }
          }
        },
        example: {
          Question: "At the same time, the company also won a two-million-dollar ___ for maintenance of the trains for the next seven years.",
          Type: "Multiple Choices",
          Level: "Medium",
          Solution: [
            {
              Solution: "contacts",
              Correct: true,
            },
            {
              Solution: "contacts",
              Correct: true,
            }
          ]
        }
      },
      QuestionViewAdmin: {
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
          }
        }
      },
      QuestionsViewAdmin: {
        type: "object",
        items: {
          "$ref": "#/definitions/QuestionViewAdmin"
        }
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
      LibraryViewAdmin: {
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
          TeacherFullname: {
            type: "string",
            default: "Klaus Aymeric"
          }
        }
      },
      LibrariesViewAdmin: {
        type: "array",
        items: {
          "$ref": "#/definitions/LibraryViewAdmin"
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
            TeacherFullname: "Klaus Aymeric"
          },
          {
            LibraryFolderID: 2,
            LibraryFolderName: "AI",
            Description: "Cannabis dependence",
            CreatedDate: "2016-09-27T00:00:00.000Z",   
            UpdatedDate: "2010-12-25T00:00:00.000Z",        
            UserID: 501,
            Avatar: "https://source.unsplash.com/random/400x400",
            TeacherFullname: "Klaus Aymeric"
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
      ClassViewAdmin: {
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
          TeacherID: {
            type: "integer",
            default: 408
          },
          TeacherFullname: {
            type: "string",
            default: "Reggy Flaonier"
          },
          TotalStudents: {
            type: "integer",
            default: 20
          }
        }
      },
      ClassesViewAdmin: {
        type: "array",
        items: {
          "$ref": "#/definitions/ClassViewAdmin"
        },
        example: [
          {
            ClassID: 31,
            ClassName: "Class Training",
            TeacherID: 406,
            TeacherFullname: "Reggy Flaonier",
            TotalStudents: 6
          },
          {
            ClassID: 32,
            ClassName: "Class Training 2",
            TeacherID: 406,
            TeacherFullname: "Reggy Flaonier",
            TotalStudents: 10
          },
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
      },
      ReviewExam: {
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
          Questions: {
            type: "array",
            items: {
              "$ref": "#/definitions/QuestionsOfLibrary"
            }
          }
        }
      },
    }
  },
  apis: [
    "./Controllers/auth.controller.js", 
    "./Controllers/profile.controller.js", 
    "./Controllers/role.controller.js",
    "./Controllers/class.controller.js", 
    "./Controllers/library.controller.js", 
    "./Controllers/question.controller.js", 
    "./Controllers/exam.controller.js",
    "./Controllers/results.controller.js"
  ]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get("/response-data-do-exam", (req, res) => {
  res.json(require('./public/do-exam.api.json'));
})

app.get("/body-submitted-exam", (req, res) => {
  res.json(require('./public/submit-exam.api.json'));
})

app.get("/results-view-student", (req, res) => {
  res.json(require('./public/results-student.api.json'));
})

app.get("/mark-view-student", (req, res) => {
  res.json(require('./public/mark-student.api.json'));
})

app.get("/results-teacher-exam-class", (req, res) => {
  res.json(require('./public/results-teacher.api.json'));
})

app.listen(port,  () => { 
  console.log('Api Gatewaty, listening on port: ' + port);
});