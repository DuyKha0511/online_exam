/**
 * @swagger
 * /api/libraries/all:
 *  get:
 *    tags: 
 *    - "Question Server"
 *    summary: "All library folders got by ADMIN"
 *    description: Get All library folders got by ADMIN
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
 *          $ref: "#/definitions/LibrariesViewAdmin"
 */

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
 *          $ref: "#/definitions/LibrariesOfTeacher"
 */

/**
 * @swagger
 * /api/libraries/:LibraryID:
 *  get:
 *    tags: 
 *    - "Question Server"
 *    summary: "Library Folder of a Teacher have this ID"
 *    description: Get Library Folder of a Teacher by LibraryID
 *    consumes:
 *    - "application/json"
 *    produces:
 *    - "application/json"
 *    parameters:
 *    - in: "path"
 *      name: "LibraryID"
 *      description: "LibraryID to get info"
 *      required: true
 *      schema:
 *        properties:
 *          LibraryID:
 *            type: int
 *            default: 204
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
 *          $ref: "#/definitions/LibraryOfTeacher"
 */

/**
 * @swagger
 * /api/libraries:
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
 *      '601 Error Header':
 *        description: "status: Error Handle | message: Error Header Authorization"
 *      '601 Error Token':
 *        description: "status: Error Handle | message: Error Token"
 *      '401 Unauthorized':
 *        description: "status: Unauthorized | message: Unauthorized"
 *      '403':
 *        description: "status: Forbidden | message: Forbidden/Access Denied"
 *      '200':
 *        description: "status: Access"
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
 *      '601 Error Header':
 *        description: "status: Error Handle | message: Error Header Authorization"
 *      '601 Error Token':
 *        description: "status: Error Handle | message: Error Token"
 *      '401 Unauthorized':
 *        description: "status: Unauthorized | message: Unauthorized"
 *      '403':
 *        description: "status: Forbidden | message: Forbidden/Access Denied"
 *      '200':
 *        description: "status: Access"
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
 *      '601 Error Header':
 *        description: "status: Error Handle | message: Error Header Authorization"
 *      '601 Error Token':
 *        description: "status: Error Handle | message: Error Token"
 *      '401 Unauthorized':
 *        description: "status: Unauthorized | message: Unauthorized"
 *      '403':
 *        description: "status: Forbidden | message: Forbidden/Access Denied"
 *      '200':
 *        description: "status: Access"
 */