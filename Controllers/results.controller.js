/**
 * @swagger
 * /api/results/student/:
 *  get:
 *    tags: 
 *    - "Exam Server"
 *    summary: "Get all marks of all exams by a student (STUDENT)"
 *    description: Get all marks of all exams by a student (STUDENT)
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
 *      '403':
 *        description: "status: Forbidden | message: Forbidden/Access Denied"
 *      '401 Unauthorized':
 *        description: "status: Unauthorized | message: Unauthorized"
 *      '200':
 *        description: "status: Access | data"
 *        schema:
 *          properties:
 *            Response:
 *              type:
 *              default: https://onlxam.herokuapp.com/mark-view-student
 */

/**
 * @swagger
 * /api/results/student/:ExamID:
 *  get:
 *    tags: 
 *    - "Exam Server"
 *    summary: "View exam & results that had been done by a student (STUDENT)"
 *    description: View exam & results that had been done by a student (STUDENT)
 *    consumes:
 *    - "application/json"
 *    produces:
 *    - "application/json"
 *    parameters:
 *    - in: "path"
 *      name: "ExamID"
 *      description: "ExamID"
 *      required: true
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
 *            Response:
 *              type:
 *              default: https://onlxam.herokuapp.com/results-view-student
 */

/**
 * @swagger
 * /api/results/teacher/:
 *  post:
 *    tags: 
 *    - "Exam Server"
 *    summary: "View all results of an exam in the class by teacher (TEACHER)"
 *    description: View all results of an exam in the class by teacher (TEACHER)
 *    consumes:
 *    - "application/json"
 *    produces:
 *    - "application/json"
 *    parameters:
 *    - in: "body"
 *      name: "body"
 *      description: "ExamID & ClassID"
 *      required: true
 *      schema:
 *        properties:
 *          ClassID:
 *            type: integer
 *            default: 31
 *          ExamID:
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
 *            Response:
 *              type:
 *              default: https://onlxam.herokuapp.com/results-teacher-exam-class
 */

/**
 * @swagger
 * /api/results/teacher/confirm:
 *  post:
 *    tags: 
 *    - "Exam Server"
 *    summary: "Confirm mark of a student in the class by teacher (TEACHER)"
 *    description: Confirm mark of a student in the class by teacher (TEACHER)
 *    consumes:
 *    - "application/json"
 *    produces:
 *    - "application/json"
 *    parameters:
 *    - in: "body"
 *      name: "body"
 *      description: "ExamID & UserID ..."
 *      required: true
 *      schema:
 *        properties:
 *          UserID:
 *            type: integer
 *            default: 404
 *          ExamID:
 *            type: integer
 *            default: 2
 *          Feedback:
 *            type: string
 *            default: "Good job"
 *          Mark:
 *            type: integer
 *            default: 10
 *          Accept:
 *            type: boolean
 *            default: true
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
 *        description: "status: Access"
 */