/**
 * @swagger
 * /api/exams/class/:ClassID:
 *  get:
 *    tags: 
 *    - "Exam Server"
 *    summary: "All exams in a class"
 *    description: Get all exams in a class by ClassID
 *    consumes:
 *    - "application/json"
 *    produces:
 *    - "application/json"
 *    parameters:
 *    - in: "path"
 *      name: "ClassID"
 *      description: "Type ClassID to get the exams in the class having this ClassID"
 *      required: true
 *    security:
 *    - Bearer: []
 *    responses:
 *      '601 Error Header':
 *        description: "status: Error Handle | message: Error Header Authorization"
 *      '601 Error Token':
 *        description: "status: Error Handle | message: Error Token"
 *      '401 Unauthorized':
 *        description: "status: Unauthorized | message: Unauthorized"
 *      '403':
 *        description: "status: Forbidden | message: Forbidden/Access Denied"
 *      '200':
 *        description: "status: Access | data"
 *        schema:
 *          $ref: "#/definitions/Exams"
 */

/**
 * @swagger
 * /api/exams/teacher:
 *  get:
 *    tags: 
 *    - "Exam Server"
 *    summary: "All exams were created by a teacher (in all classes)"
 *    description: All exams were created by a teacher (in all classes)
 *    consumes:
 *    - "application/json"
 *    produces:
 *    - "application/json"
 *    security:
 *    - Bearer: []
 *    responses:
 *      '601 Error Header':
 *        description: "status: Error Handle | message: Error Header Authorization"
 *      '601 Error Token':
 *        description: "status: Error Handle | message: Error Token"
 *      '401 Unauthorized':
 *        description: "status: Unauthorized | message: Unauthorized"
 *      '403':
 *        description: "status: Forbidden | message: Forbidden/Access Denied"
 *      '200':
 *        description: "status: Access | data"
 *        schema:
 *          $ref: "#/definitions/ExamsOfTeacher"
 */

/**
 * @swagger
 * /api/exams/student:
 *  get:
 *    tags: 
 *    - "Exam Server"
 *    summary: "All exams in all classes that this student take part in"
 *    description: All exams in all classes that this student take part in
 *    consumes:
 *    - "application/json"
 *    produces:
 *    - "application/json"
 *    security:
 *    - Bearer: []
 *    responses:
 *      '601 Error Header':
 *        description: "status: Error Handle | message: Error Header Authorization"
 *      '601 Error Token':
 *        description: "status: Error Handle | message: Error Token"
 *      '401 Unauthorized':
 *        description: "status: Unauthorized | message: Unauthorized"
 *      '403':
 *        description: "status: Forbidden | message: Forbidden/Access Denied"
 *      '200':
 *        description: "status: Access | data"
 *        schema:
 *          $ref: "#/definitions/ExamsOfStudent"
 */

/**
 * @swagger
 * /api/exams/:ExamID:
 *  get:
 *    tags: 
 *    - "Exam Server"
 *    summary: "View a review of the exam by ExamID (teacher)"
 *    description: View a review of the exam by ExamID
 *    consumes:
 *    - "application/json"
 *    produces:
 *    - "application/json"
 *    parameters:
 *    - in: "path"
 *      name: "ExamID"
 *      description: "Type ExamID to get the review"
 *      required: true
 *    security:
 *    - Bearer: []
 *    responses:
 *      '601 Error Header':
 *        description: "status: Error Handle | message: Error Header Authorization"
 *      '601 Error Token':
 *        description: "status: Error Handle | message: Error Token"
 *      '401 Unauthorized':
 *        description: "status: Unauthorized | message: Unauthorized"
 *      '403':
 *        description: "status: Forbidden | message: Forbidden/Access Denied"
 *      '200':
 *        description: "status: Access | data"
 *        schema:
 *          $ref: "#/definitions/ReviewExam"
 */

/**
 * @swagger
 * /api/exams/:
 *  put:
 *    tags: 
 *    - "Exam Server"
 *    summary: "Create new exams and add it into these class"
 *    description: Create new exams and add it into these class
 *    consumes:
 *    - "application/json"
 *    produces:
 *    - "application/json"
 *    parameters:
 *    - in: "body"
 *      name: "body"
 *      description: "New question information"
 *      required: true
 *      schema:
 *        properties:
 *          ClassID:
 *            type: array
 *            default: [201, 202, 203]     
 *          ExamName:
 *            type: string
 *            default: "Exam AI"
 *          TimeBegin:
 *            type: string
 *            default: "2021-12-16"
 *          TimeEnd:
 *            type: string
 *            default: "2021-12-17"  
 *          Duration:
 *            type: integer
 *            default: 50
 *          QuestionID:
 *            type: array
 *            default: [1, 22, 23]
 *          MaxEssay:
 *            type: integer
 *            default: 2
 *    security:
 *    - Bearer: []
 *    responses:
 *      '601 Error Header':
 *        description: "status: Error Handle | message: Error Header Authorization"
 *      '601 Error Token':
 *        description: "status: Error Handle | message: Error Token"
 *      '403':
 *        description: "status: Forbidden | message: Forbidden/Access Denied"
 *      '401 Unauthorized':
 *        description: "status: Unauthorized | message: Unauthorized"
 *      '200':
 *        description: "status: Access | data"
 *        schema:
 *          properties:
 *            Exam:
 *              type: string
 *              default: 501
 */