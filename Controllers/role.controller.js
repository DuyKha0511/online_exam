/**
 * @swagger
 * /api/role/group-function:
 *  get:
 *    tags: 
 *    - "Auth Server"
 *    summary: "All Group Functions (ADMIN)"
 *    description: Get all Group Functions (ADMIN)
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
 *          $ref: "#/definitions/GroupFunctions"
 */

/**
 * @swagger
 * /api/role/group-function/:GroupFunctionID:
 *  get:
 *    tags: 
 *    - "Auth Server"
 *    summary: "Get all Functions in a group function (ADMIN)"
 *    description: Get all Functions in a group function (ADMIN)
 *    consumes:
 *    - "application/json"
 *    produces:
 *    - "application/json"
 *    parameters:
 *    - in: "path"
 *      name: "GroupFunctionID"
 *      description: "GroupFunctionID"
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
 *          $ref: "#/definitions/FunctionsOfAGroup"
 */

/**
 * @swagger
 * /api/role/:
 *  post:
 *    tags: 
 *    - "Auth Server"
 *    summary: "Create a new role (ADMIN)"
 *    description: Create a new role (ADMIN)
 *    consumes:
 *    - "application/json"
 *    produces:
 *    - "application/json"
 *    parameters:
 *    - in: "body"
 *      name: "New role infomation"
 *      description: "New role infomation"
 *      required: true
 *      schema: 
 *        properties:
 *          RoleName:
 *            type: string
 *            default: "Teacher Only Create"
 *          Permissions:
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                GroupFunctionID: 
 *                  type: integer
 *                  default: 1
 *                FunctionCode:
 *                  type: integer
 *                  default: 3
 *            example:
 *              - GroupFunctionID: 1
 *                FunctionCode: 3
 *              - GroupFunctionID: 2
 *                FunctionCode: 2
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
 *          $ref: "#/definitions/FunctionsOfAGroup"
 */