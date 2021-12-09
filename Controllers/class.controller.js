/**
 * @swagger
 * /api/classes/student:
 *  get:
 *    tags: 
 *    - "User Server"
 *    summary: "All classes of a student"
 *    description: Get classes by a student ID
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
 *        required: true
 *        schema:
 *          $ref: "#/definitions/ClassesOfStudent"
 *      '601':
 *        description: "status: Forbidden/Access Denied | message: Error Token"
 *      '602':
 *        description: "status: Unauthorized | message: Unauthorized"
 */

/**
 * @swagger
 * /api/classes/teacher:
 *  get:
 *    tags: 
 *    - "User Server"
 *    summary: "All classes of a teacher"
 *    description: Get classes by teacher ID
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
 *          $ref: "#/definitions/ClassesOfTeacher"
 *      '601':
 *        description: "status: Forbidden/Access Denied | message: Error Token"
 *      '602':
 *        description: "status: Unauthorized | message: Unauthorized"
 */

/**
 * @swagger
 * /api/classes/member/:ClassID:
 *  get:
 *    tags: 
 *    - "User Server"
 *    summary: "All Members of a class"
 *    description: Get all members in a class
 *    consumes:
 *    - "application/json"
 *    produces:
 *    - "application/json"
 *    parameters:
 *    - in: "path"
 *      name: "ClassID"
 *      description: "Type ClassID to get all members"
 *      required: true
 *    security:
 *    - Bearer: []
 *    responses:
 *      '200':
 *        description: "status: Access | data"
 *        schema:
 *          $ref: "#/definitions/ClassMembers"
 *      '601':
 *        description: "status: Forbidden/Access Denied | message: Error Token"
 *      '602':
 *        description: "status: Unauthorized | message: Unauthorized"
 */


/**
 * @swagger
 * /api/classes/member/:ClassID:
 *  put:
 *    tags: 
 *    - "User Server"
 *    summary: "Add member to a class"
 *    description: Add member to a class
 *    consumes:
 *    - "application/json"
 *    produces:
 *    - "application/json"
 *    parameters:
 *    - in: "path"
 *      name: "ClassID"
 *      description: "Type ClassID"
 *      required: true
 *      schema:
 *        properties:
 *          ClassID:
 *            type: string
 *            default: "ClassID"
 *    - in: "body"
 *      name: "body"
 *      description: "UserID of the new member"
 *      required: true
 *      schema:
 *        properties:
 *          UserID:
 *            type: string
 *            default: "UserID"
 *    security:
 *    - Bearer: []
 *    responses:
 *      '200':
 *        description: "status: Access"
 *      '601':
 *        description: "status: Forbidden/Access Denied | message: Error Token"
 *      '602':
 *        description: "status: Unauthorized | message: Unauthorized"
 */

/**
 * @swagger
 * /api/classes/member/:ClassID:
 *  delete:
 *    tags: 
 *    - "User Server"
 *    summary: "Remove member from a class"
 *    description: Remove member from a class
 *    consumes:
 *    - "application/json"
 *    produces:
 *    - "application/json"
 *    parameters:
 *    - in: "path"
 *      name: "ClassID"
 *      description: "Type ClassID"
 *      required: true
 *      schema:
 *        properties:
 *          ClassID:
 *            type: string
 *            default: "ClassID"
 *    - in: "body"
 *      name: "body"
 *      description: "UserID of the new member"
 *      required: true
 *      schema:
 *        properties:
 *          UserID:
 *            type: string
 *            default: "UserID"
 *    security:
 *    - Bearer: []
 *    responses:
 *      '200':
 *        description: "status: Access"
 *      '601':
 *        description: "status: Forbidden/Access Denied | message: Error Token"
 *      '602':
 *        description: "status: Unauthorized | message: Unauthorized"
 */