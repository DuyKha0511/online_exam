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
 *      '601':
 *        description: "status: Forbidden/Access Denied | message: Error Token"
 *      '602':
 *        description: "status: Unauthorized | message: Unauthorized"
 */