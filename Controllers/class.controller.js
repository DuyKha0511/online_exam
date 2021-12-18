/**
 * @swagger
 * /api/classes/:
 *  get:
 *    tags: 
 *    - "User Server"
 *    summary: "All classes by admin (ADMIN)"
 *    description: Get all classes by admin
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
 *        required: true
 *        schema:
 *          $ref: "#/definitions/ClassesViewAdmin"
 */

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
 *        required: true
 *        schema:
 *          $ref: "#/definitions/ClassesOfStudent"
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
 *          $ref: "#/definitions/ClassesOfTeacher"
 */

/**
 * @swagger
 * /api/classes/teacher/:ClassID:
 *  get:
 *    tags: 
 *    - "User Server"
 *    summary: "Get a class of a teacher by ID"
 *    description: Get a class of a teacher by ID
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
 *          $ref: "#/definitions/ClassOfTeacher"
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
 *          $ref: "#/definitions/ClassMembers"
 */

/**
 * @swagger
 * /api/classes/member/:ClassID/check:
 *  post:
 *    tags: 
 *    - "User Server"
 *    summary: "Check if a member can be added to the class"
 *    description: Check if a member can be added to the class 
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
 *      description: "Email of the member"
 *      required: true
 *      schema:
 *        properties:
 *          Email:
 *            type: string
 *            default: "kha1@gmail.com"
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
 *        description: "status: Access | message: This student can be added to the class!"
 *      '601 Not student':
 *        description: "status: Error Handle | message: This email is not owned by a student!"
 *      '601 Already In':
 *        description: "status: Unauthorized | message: This student is already in this class!"
 *      '601 Invalid Email':
 *        description: "status: Unauthorized | message: Invalid Email of Student!"
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
 *      description: "Array of email of the new member"
 *      required: true
 *      schema:
 *        properties:
 *          Email:
 *            type: array
 *            default: [kha1@gmail.com, kha2@gmail.com]
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
 *        description: "status: Access | data (info of new members)"
 *        schema:
 *          $ref: "#/definitions/ClassMembers"
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
 *            type: array
 *            default: [501, 502]
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
 *        description: "status: Access"
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
 *      '601 Error Header':
 *        description: "status: Error Handle | message: Error Header Authorization"
 *      '601 Error Token':
 *        description: "status: Error Handle | message: Error Token"
 *      '401 Unauthorized':
 *        description: "status: Unauthorized | message: Unauthorized"
 *      '403':
 *        description: "status: Forbidden | message: Forbidden/Access Denied"
 *      '200':
 *        description: "status: Access"
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
 *      '601 Error Header':
 *        description: "status: Error Handle | message: Error Header Authorization"
 *      '601 Error Token':
 *        description: "status: Error Handle | message: Error Token"
 *      '401 Unauthorized':
 *        description: "status: Unauthorized | message: Unauthorized"
 *      '403':
 *        description: "status: Forbidden | message: Forbidden/Access Denied"
 *      '200':
 *        description: "status: Access"
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
 *      '601 Error Header':
 *        description: "status: Error Handle | message: Error Header Authorization"
 *      '601 Error Token':
 *        description: "status: Error Handle | message: Error Token"
 *      '401 Unauthorized':
 *        description: "status: Unauthorized | message: Unauthorized"
 *      '403':
 *        description: "status: Forbidden | message: Forbidden/Access Denied"
 *      '200':
 *        description: "status: Access"
 */