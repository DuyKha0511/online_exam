/**
 * @swagger
 * /api/auth/login:
 *  post:
 *    tags: 
 *    - "Auth Server"
 *    summary: "Login to the system"
 *    description: Login to the system by username & password
 *    consumes:
 *    - "application/json"
 *    produces:
 *    - "application/json"
 *    parameters:
 *    - in: "body"
 *      name: "body"
 *      description: "Username & Password of the User account"
 *      required: true
 *      schema:
 *        properties:
 *          username:
 *            type: string
 *            default: "username"
 *          password:
 *            type: string
 *            default: "password"
 *    responses:
 *      '200':
 *        description: "status: Access | accessToken | refreshToken | data"
 *        schema:
 *          $ref: "#/definitions/UserLogin"
 *      '601':
 *        description: "status: Error Handle | message: Incorrect Username or Password!"
 */


/**
 * @swagger
 * /api/auth/signup:
 *  post:
 *    tags: 
 *    - "Auth Server"
 *    summary: "Sign up to the system"
 *    description: Sign up to the system by username & password & email
 *    consumes:
 *    - "application/json"
 *    produces:
 *    - "application/json"
 *    security:
 *    - Bearer: []
 *    parameters:
 *    - in : "header"
 *    - in: "body"
 *      name: "body"
 *      description: "Username & Password & Email of the account"
 *      required: true
 *      schema:
 *        properties:
 *          username:
 *            type: string
 *          password:
 *            type: string
 *          email:
 *            type: string
 *    responses:
 *      '200':
 *        description: "status: Access"
 *      '601':
 *        description: "status: Error Handle | message: Username Existed!"
 */