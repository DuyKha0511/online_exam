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
 *          $ref: "#/definitions/LibrariesOfTeacher"
 *      '601':
 *        description: "status: Error Handle | message: Error Token"
 *      '401':
 *        description: "status: Unauthorized | message: Unauthorized"
 *      '403':
 *        description: "status: Forbidden | message: Forbidden/Access Denied"
 */

/**
 * @swagger
 * /api/libraries/:
 *  post:
 *    tags: 
 *    - "Question Server"
 *    summary: "Create new library by a teacher"
 *    description: Create new library by a teacher
 *    consumes:
 *    - "application/json"
 *    produces:
 *    - "application/json"
 *    parameters:
 *    - in: "body"
 *      name: "body"
 *      description: "New library information"
 *      required: true
 *      schema:
 *        properties:
 *          LibraryFolderName:
 *            type: string
 *            default: "New LibraryFolderName"
 *          Description:
 *            type: string
 *            default: "New Description"
 *          Avatar:
 *            type: string
 *            default: "New Avatar"
 *    security:
 *    - Bearer: []
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

/**
 * @swagger
 * /api/libraries/:LibraryID:
 *  put:
 *    tags: 
 *    - "Question Server"
 *    summary: "Update the library by a teacher"
 *    description: Update the library by a teacher
 *    consumes:
 *    - "application/json"
 *    produces:
 *    - "application/json"
 *    parameters:
 *    - in: "path"
 *      name: "LibraryID"
 *      description: "LibraryID of the library"
 *      required: true
 *      schema:
 *        properties:
 *          LibraryID:
 *            type: string
 *            default: "LibraryID"
 *    - in: "body"
 *      name: "body"
 *      description: "New library information"
 *      required: true
 *      schema:
 *        properties:
 *          LibraryFolderName:
 *            type: string
 *            default: "New LibraryFolderName"
 *          Description:
 *            type: string
 *            default: "New Description"
 *          Avatar:
 *            type: string
 *            default: "New Avatar"
 *    security:
 *    - Bearer: []
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

/**
 * @swagger
 * /api/libraries/:LibraryID:
 *  delete:
 *    tags: 
 *    - "Question Server"
 *    summary: "Delete the library by a teacher"
 *    description: Delete the library by a teacher
 *    consumes:
 *    - "application/json"
 *    produces:
 *    - "application/json"
 *    parameters:
 *    - in: "path"
 *      name: "LibraryID"
 *      description: "LibraryID of the library"
 *      required: true
 *      schema:
 *        properties:
 *          LibraryID:
 *            type: string
 *            default: "LibraryID"
 *    security:
 *    - Bearer: []
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