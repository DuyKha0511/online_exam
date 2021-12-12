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
 *        description: "status: Error Handle | message: Error Token"
 *      '401':
 *        description: "status: Unauthorized | message: Unauthorized"
 *      '403':
 *        description: "status: Forbidden | message: Forbidden/Access Denied"
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
 *        description: "status: Error Handle | message: Error Token"
 *      '401':
 *        description: "status: Unauthorized | message: Unauthorized"
 *      '403':
 *        description: "status: Forbidden | message: Forbidden/Access Denied"
 */

/**
 * @swagger
 * /api/classes/teacher/:ClassID:
 *  get:
 *    tags: 
 *    - "User Server"
 *    summary: "The class of a teacher has this ClassID"
 *    description: Get class of teacher by ClassID
 *    consumes:
 *    - "application/json"
 *    produces:
 *    - "application/json"
 *    parameters:
 *    - in: "headers"
 *      name: "authorization"
 *      description: "Json Web Token"
 *      required: true
 *    - in: "path"
 *      name: "ClassID"
 *      description: "ClassID of the class"
 *      required: true
 *      schema:
 *        properties:
 *          ClassID:
 *            type: integer
 *            default: 204
 *    security:
 *    - Bearer: []
 *    responses:
 *      '200':
 *        description: "status: Access | data"
 *        schema:
 *          $ref: "#/definitions/ClassOfTeacher"
 *      '601':
 *        description: "status: Error Handle | message: Error Token"
 *      '401':
 *        description: "status: Unauthorized | message: Unauthorized"
 *      '403':
 *        description: "status: Forbidden | message: Forbidden/Access Denied"
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
 *        description: "status: Error Handle | message: Error Token"
 *      '401':
 *        description: "status: Unauthorized | message: Unauthorized"
 *      '403':
 *        description: "status: Forbidden | message: Forbidden/Access Denied"
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
 *        description: "status: Error Handle | message: Error Token"
 *      '401':
 *        description: "status: Unauthorized | message: Unauthorized"
 *      '403':
 *        description: "status: Forbidden | message: Forbidden/Access Denied"
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
 *        description: "status: Error Handle | message: Error Token"
 *      '401':
 *        description: "status: Unauthorized | message: Unauthorized"
 *      '403':
 *        description: "status: Forbidden | message: Forbidden/Access Denied"
 */

/**
 * @swagger
 * /api/classes/:
 *  put:
 *    tags: 
 *    - "User Server"
 *    summary: "Create new class by a teacher"
 *    description: Create new class by a teacher
 *    consumes:
 *    - "application/json"
 *    produces:
 *    - "application/json"
 *    parameters:
 *    - in: "body"
 *      name: "body"
 *      description: "Class name of the new class"
 *      required: true
 *      schema:
 *        properties:
 *          ClassName:
 *            type: string
 *            default: "New Class Name"
 *    security:
 *    - Bearer: []
 *    responses:
 *      '200':
 *        description: "status: Access"
 *      '601':
 *        description: "status: Error Handle | message: Error Token"
 *      '401':
 *        description: "status: Unauthorized | message: Unauthorized"
 *      '403':
 *        description: "status: Forbidden | message: Forbidden/Access Denied"
 */

/**
 * @swagger
 * /api/classes/:ClassID:
 *  put:
 *    tags: 
 *    - "User Server"
 *    summary: "Update class name"
 *    description: Update class name by teacher
 *    consumes:
 *    - "application/json"
 *    produces:
 *    - "application/json"
 *    parameters:
 *    - in: "path"
 *      name: "ClassID"
 *      description: "ClassID of this class"
 *      required: true
 *      schema:
 *        properties:
 *          ClassID:
 *            type: string
 *            default: "ClassID"
 *    - in: "body"
 *      name: "body"
 *      description: "New class name of this class"
 *      required: true
 *      schema:
 *        properties:
 *          ClassName:
 *            type: string
 *            default: "New Class Name"
 *    security:
 *    - Bearer: []
 *    responses:
 *      '200':
 *        description: "status: Access"
 *      '601':
 *        description: "status: Error Handle | message: Error Token"
 *      '401':
 *        description: "status: Unauthorized | message: Unauthorized"
 *      '403':
 *        description: "status: Forbidden | message: Forbidden/Access Denied"
 */

/**
 * @swagger
 * /api/classes/:ClassID:
 *  delete:
 *    tags: 
 *    - "User Server"
 *    summary: "Delete class by ClassID"
 *    description: Delete class by ClassID
 *    consumes:
 *    - "application/json"
 *    produces:
 *    - "application/json"
 *    parameters:
 *    - in: "path"
 *      name: "ClassID"
 *      description: "ClassID of this class"
 *      required: true
 *      schema:
 *        properties:
 *          ClassID:
 *            type: string
 *            default: "ClassID"
 *    security:
 *    - Bearer: []
 *    responses:
 *      '200':
 *        description: "status: Access"
 *      '601':
 *        description: "status: Error Handle | message: Error Token"
 *      '401':
 *        description: "status: Unauthorized | message: Unauthorized"
 *      '403':
 *        description: "status: Forbidden | message: Forbidden/Access Denied"
 */
