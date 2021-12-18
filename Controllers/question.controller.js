/**
 * @swagger
 * /api/question/lib/:LibraryID:
 *  get:
 *    tags: 
 *    - "Question Server"
 *    summary: "All questions of a Library"
 *    description: All questions of a Library
 *    consumes:
 *    - "application/json"
 *    produces:
 *    - "application/json"
 *    parameters:
 *    - in: "path"
 *      name: "LibraryID"
 *      description: "LibraryID of a library"
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
 *          $ref: "#/definitions/QuestionsOfLibrary"
 */

/**
 * @swagger
 * /api/question/lib/:LibraryID:
 *  put:
 *    tags: 
 *    - "Question Server"
 *    summary: "Create new question and insert it into this library"
 *    description: Create new question and insert it into this library
 *    consumes:
 *    - "application/json"
 *    produces:
 *    - "application/json"
 *    parameters:
 *    - in: "path"
 *      name: "LibraryID"
 *      description: "LibraryID of a library"
 *      required: true
 *    - in: "body"
 *      name: "body"
 *      description: "New question information"
 *      required: true
 *      schema:
 *        $ref: "#/definitions/NewQuestion"          
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
 *            QuestionID:
 *              type: string
 *              default: 2702
 *      '601 Same Question':
 *        description: "status: Error Handle | message: This question data is existed in this library! These properties are all the same as the existed one!"
 *      '601 Error Solution':
 *        description: "status: Error Handle | message: The question must be contained at least 1 solution!"
 */

/**
 * @swagger
 * /api/question/:
 *  get:
 *    tags: 
 *    - "Question Server"
 *    summary: "All questions in the system (ADMIN)"
 *    description: All questions in the system (ADMIN)
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
 *          $ref: "#/definitions/QuestionsViewAdmin"
 */

/**
 * @swagger
 * /api/question/:questionID:
 *  get:
 *    tags: 
 *    - "Question Server"
 *    summary: "Get question by ID"
 *    description: Get question by ID
 *    consumes:
 *    - "application/json"
 *    produces:
 *    - "application/json"
 *    parameters:
 *    - in: "path"
 *      name: "questionID"
 *      description: "Question ID of a question"
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
 *          $ref: "#/definitions/Question"
 */

/**
 * @swagger
 * /api/question/:QuestionID:
 *  post:
 *    tags: 
 *    - "Question Server"
 *    summary: "Update data of a question"
 *    description: Update data of a question
 *    consumes:
 *    - "application/json"
 *    produces:
 *    - "application/json"
 *    parameters:
 *    - in: "path"
 *      name: "QuestionID"
 *      description: "QuestionID of this question"
 *      required: true
 *    - in: "body"
 *      name: "body"
 *      description: "New data question"
 *      required: true
 *      schema:
 *        $ref: "#/definitions/NewQuestion"          
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
 *      '601 Error Solution':
 *        description: "status: Error Handle | message: The question must be contained at least 1 solution!"
 */

/**
 * @swagger
 * /api/question/:questionID/solution:
 *  get:
 *    tags: 
 *    - "Question Server"
 *    summary: "Get solutions of a question by ID"
 *    description: Get solutions of a question by ID
 *    consumes:
 *    - "application/json"
 *    produces:
 *    - "application/json"
 *    parameters:
 *    - in: "path"
 *      name: "QuestionID"
 *      description: "QuestionID of a question"
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
 *          $ref: "#/definitions/SolutionsOfQuestion"
 */

/**
 * @swagger
 * /api/question/:
 *  delete:
 *    tags: 
 *    - "Question Server"
 *    summary: "Delete a number of questions by ID"
 *    description: Delete a number of questions by ID
 *    consumes:
 *    - "application/json"
 *    produces:
 *    - "application/json"
 *    parameters:
 *    - in: "body"
 *      name: "QuestionID"
 *      description: "List of question IDs to be deleted"
 *      required: true
 *      schema:
 *        properties:
 *          QuestionID:
 *            type: array
 *            default: [2000, 2001]
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