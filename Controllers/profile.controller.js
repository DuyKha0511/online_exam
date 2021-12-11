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

/**
 * @swagger
 * /api/profile/update:
 *  post:
 *    tags: 
 *    - "Auth Server"
 *    summary: "Update self profile of a user"
 *    description: Update self profile of a user
 *    consumes:
 *    - "application/json"
 *    produces:
 *    - "application/json"
 *    security:
 *    - Bearer: []
 *    parameters:
 *    - in: "body"
 *      name: "body"
 *      description: "New information about the user"
 *      required: true
 *      schema:
 *        properties:
 *          Firstname:
 *            type: string
 *            default: "Duy"
 *          Lastname:
 *            type: string
 *            default: "Kha"
 *          Email:
 *            type: string
 *            default: "kha@gmail.com"
 *          Gender:
 *            type: boolean
 *            default: true
 *          DateOfBirth:
 *            type: string
 *            default: "2000-07-07"
 *          Address:
 *            type: string
 *            default: "6 Sunfield Court"
 *          Phone:
 *            type: string
 *            default: "508 259 6283"
 *          Avatar:
 *            type: string
 *            default: "https://robohash.org/reprehenderitetdolorum.png?size=400x400&set=set1"
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