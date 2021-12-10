/**
 * @swagger
 * /api/profile:
 *  get:
 *    tags: 
 *    - "Auth Server"
 *    summary: "Self Profile"
 *    description: Self Profile of an account
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
 *          $ref: "#/definitions/UserLogin"
 *      '601':
 *        description: "status: Error Handle | message: Error Token"
 *      '401':
 *        description: "status: Unauthorized | message: Unauthorized"
 *      '403':
 *        description: "status: Forbidden | message: Forbidden/Access Denied"
 */