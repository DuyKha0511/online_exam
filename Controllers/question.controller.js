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
 *      description: "Json Web Token"
 *      required: true
 *    security:
 *    - Bearer: []
 *    responses:
 *      '200':
 *        description: "status: Access | data"
 *      '601':
 *        description: "status: Forbidden/Access Denied | message: Error Token"
 *      '602':
 *        description: "status: Unauthorized | message: Unauthorized"
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
 *      description: "Json Web Token"
 *      required: true
 *    security:
 *    - Bearer: []
 *    responses:
 *      '200':
 *        description: "status: Access | data"
 *      '601':
 *        description: "status: Forbidden/Access Denied | message: Error Token"
 *      '602':
 *        description: "status: Unauthorized | message: Unauthorized"
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
 *      name: "questionID"
 *      description: "Json Web Token"
 *      required: true
 *    security:
 *    - Bearer: []
 *    responses:
 *      '200':
 *        description: "status: Access | data"
 *      '601':
 *        description: "status: Forbidden/Access Denied | message: Error Token"
 *      '602':
 *        description: "status: Unauthorized | message: Unauthorized"
 */