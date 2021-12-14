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
 *      '601 Error Header':
 *        description: "status: Error Handle | message: Error Header Authorization"
 *      '601 Error Token':
 *        description: "status: Error Handle | message: Error Token"
 *      '401 Unauthorized':
 *        description: "status: Unauthorized | message: Unauthorized"
 *      '200 Access':
 *        description: "status: Access | data"
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
 *      '601 Error Header':
 *        description: "status: Error Handle | message: Error Header Authorization"
 *      '601 Error Token':
 *        description: "status: Error Handle | message: Error Token"
 *      '401 Unauthorized':
 *        description: "status: Unauthorized | message: Unauthorized"
 *      '200 Access':
 *        description: "status: Access"
 *      '601 Email is taken':
 *        description: "status: Error Handle | message: Email is already taken by the other user!"
 */

/**
 * @swagger
 * /api/profile/password:
 *  post:
 *    tags: 
 *    - "Auth Server"
 *    summary: "Change password of my account"
 *    description: Change password of my account
 *    consumes:
 *    - "application/json"
 *    produces:
 *    - "application/json"
 *    security:
 *    - Bearer: []
 *    parameters:
 *    - in: "body"
 *      name: "body"
 *      description: "Old password and New password"
 *      required: true
 *      schema:
 *        properties:
 *          OldPassword:
 *            type: string
 *            default: "oldpassword"
 *          NewPassword:
 *            type: string
 *            default: "newpassword"
 *    responses:
 *      '601 Error Header':
 *        description: "status: Error Handle | message: Error Header Authorization"
 *      '601 Error Token':
 *        description: "status: Error Handle | message: Error Token"
 *      '401 Unauthorized':
 *        description: "status: Unauthorized | message: Unauthorized"
 *      '200 Access':
 *        description: "status: Access"
 *      '601 Password is incorrect':
 *        description: "status: Error Handle | message: Password is incorrect"
 */