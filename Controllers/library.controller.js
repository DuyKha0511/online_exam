/**
 * @swagger
 * /api/libraries:
 *  get:
 *    tags: 
 *    - "Question Server"
 *    summary: "Library Folders of a Teacher"
 *    description: Get Library Folders of a Teacher by UserID
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
*           $ref: "#/definitions/LibrariesOfTeacher"
 *      '601':
 *        description: "status: Forbidden/Access Denied | message: Error Token"
 *      '602':
 *        description: "status: Unauthorized | message: Unauthorized"
 */