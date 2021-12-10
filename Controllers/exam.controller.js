/**
 * @swagger
 * /api/exam/class/{ClassID}:
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
 *      '200':
 *        description: "status: Access | data"
 *        schema:
 *          $ref: "#/definitions/Exams"
 *      '601':
 *        description: "status: Error Handle | message: Error Token"
 *      '401':
 *        description: "status: Unauthorized | message: Unauthorized"
 *      '403':
 *        description: "status: Forbidden | message: Forbidden/Access Denied"
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
 *    parameters:
 *    - in: "headers"
 *      name: "authorization"
 *      description: "Json Web Token"
 *      required: true
 *    security:
 *    - Bearer: []
 *    responses:
 *      '200':
 *        description: "status: Access | data"
 *        schema:
 *          $ref: "#/definitions/ExamsOfTeacher"
 *      '601':
 *        description: "status: Error Handle | message: Error Token"
 *      '401':
 *        description: "status: Unauthorized | message: Unauthorized"
 *      '403':
 *        description: "status: Forbidden | message: Forbidden/Access Denied"
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
 *    parameters:
 *    - in: "headers"
 *      name: "authorization"
 *      description: "Json Web Token"
 *      required: true
 *    security:
 *    - Bearer: []
 *    responses:
 *      '200':
 *        description: "status: Access | data"
 *        schema:
 *          $ref: "#/definitions/ExamsOfStudent"
 *      '601':
 *        description: "status: Error Handle | message: Error Token"
 *      '401':
 *        description: "status: Unauthorized | message: Unauthorized"
 *      '403':
 *        description: "status: Forbidden | message: Forbidden/Access Denied"
 */