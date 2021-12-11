/**
 * @swagger
 * /api/questions/lib/:LibraryID:
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
 *      description: "Json Web Token"
 *      required: true
 *    security:
 *    - Bearer: []
 *    responses:
 *      '200':
 *        description: "status: Access | data"
 *        schema:
 *          $ref: "#/definitions/QuestionsOfLibrary"
 *      '601':
 *        description: "status: Error Handle | message: Error Token"
 *      '401':
 *        description: "status: Unauthorized | message: Unauthorized"
 *      '403':
 *        description: "status: Forbidden | message: Forbidden/Access Denied"
 */

/**
 * @swagger
 * /api/questions/:questionID:
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
 *      description: "Json Web Token"
 *      required: true
 *    security:
 *    - Bearer: []
 *    responses:
 *      '200':
 *        description: "status: Access | data"
 *        schema:
 *          $ref: "#/definitions/Question"
 *      '601':
 *        description: "status: Error Handle | message: Error Token"
 *      '401':
 *        description: "status: Unauthorized | message: Unauthorized"
 *      '403':
 *        description: "status: Forbidden | message: Forbidden/Access Denied"
 */

/**
 * @swagger
 * /api/questions/:questionID/solution:
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
 *      name: "questionID"
 *      description: "Json Web Token"
 *      required: true
 *    security:
 *    - Bearer: []
 *    responses:
 *      '200':
 *        description: "status: Access | data"
 *        schema:
 *          $ref: "#/definitions/SolutionsOfQuestion"
 *      '601':
 *        description: "status: Error Handle | message: Error Token"
 *      '401':
 *        description: "status: Unauthorized | message: Unauthorized"
 *      '403':
 *        description: "status: Forbidden | message: Forbidden/Access Denied"
 */
