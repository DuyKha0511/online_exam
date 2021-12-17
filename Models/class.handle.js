const sql = require('./_database.connect').sql;
const db_config = require('./_database.connect').mssql_config;

function ExcuteSQL(query) {
    return sql.connect(db_config)
        .then(function() {
            return new sql.Request()
                .query(query)
                .catch(function(err) {
                    console.log("Error!!!", err);
                });
        })
        .catch(function(err) {
            console.log("Error!!!", err);
        });
}

module.exports = {
    getAllClasses: function() {
        return ExcuteSQL(`
            SELECT C.ClassID, C.ClassName, C.UserID AS 'TeacherID', CONCAT(U.Firstname, ' ', U.Lastname) AS TeacherFullname,
            [dbo].CheckIfClassHasMember(C.ClassID) AS TotalStudents
            FROM tb_Class AS C
            JOIN tb_User AS U ON C.UserID = U.UserID
        `);
    },
    createClass: function(TeacherID, ClassName) {
        return ExcuteSQL(`
            INSERT INTO tb_Class VALUES (N'${ClassName}', ${TeacherID}, NULL)
        `);
    },
    getClassByID: function(ClassID) {
        return ExcuteSQL(`SELECT * FROM tb_Class where ClassID = ${ClassID}`);
    },
    getClassesByTeacher: function(UserID) {
        return ExcuteSQL(`
            SELECT ClassID, ClassName, [dbo].CheckIfClassHasMember(ClassID) AS TotalStudents, 
            [dbo].CheckIfClassHasExam(ClassID) AS TotalAssignments, UserID
            FROM tb_Class WHERE UserID = ${UserID}
        `);
    },
    getClassByTeacher: function(UserID, ClassID) {
        return ExcuteSQL(`
            SELECT ClassID, ClassName, [dbo].CheckIfClassHasMember(ClassID) AS TotalStudents, 
            [dbo].CheckIfClassHasExam(ClassID) AS TotalAssignments, UserID
            FROM tb_Class WHERE ClassID = ${ClassID} AND UserID = ${UserID}
        `);
    },
    getClassByStudent: function(UserID) {
        return ExcuteSQL(`
            SELECT C.ClassID, C.ClassName, Num.TotalStudents, U.UserID AS TeacherID, CONCAT(U.Firstname, ' ', U.Lastname) AS TeacherFullname
            FROM
            (SELECT ClassID, COUNT(*) AS TotalStudents FROM tb_ClassMember
            WHERE ClassID IN (SELECT ClassID FROM tb_ClassMember WHERE UserID = ${UserID})
            GROUP BY ClassID) AS Num
            JOIN tb_Class AS C ON C.ClassID = Num.ClassID
            JOIN tb_User AS U ON U.UserID = C.UserID
        `);
    },
    getMember: function(ClassID) {
        return ExcuteSQL(`
            select * from tb_User where UserID in
            (select UserID from tb_ClassMember where ClassID = ${ClassID})
        `);
    },
    addMember: function(ClassID, Email) {
        var query = `insert into tb_ClassMember values \n`;
        var listEmail = `(`;
        Email.map((value, index) => {
            if (index < Email.length - 1) {
                query += `(${ClassID}, (select UserID from tb_User where Email = '${value}')), \n`;
                listEmail += `'${value}', `
            }
            else {
                query += `(${ClassID}, (select UserID from tb_User where Email = '${value}')) \n`;
                listEmail += `'${value}')`;
            }
        });
        query += `select * from tb_User where Email in ${listEmail}`;
        return ExcuteSQL(query);   
    },
    deleteMember: function(ClassID, userID) {
        var query = ``;
        userID.map((value) => {
            query += `delete from tb_ClassMember where ClassID = ${ClassID} and UserID = '${value}'\n`;
        });
        return ExcuteSQL(query);
    },
    changeName: function(ClassID, newName) {
        return ExcuteSQL(`
            update tb_Class set ClassName = N'${newName}' where ClassID = ${ClassID}
        `);
    },
    deleteClass: function(ClassID) {
        return ExcuteSQL(`
            delete from tb_Class where ClassID = ${ClassID}
        `);
    },
    checkUserInClass: function(Email, ClassID) {
        return ExcuteSQL(`
            SELECT *, [dbo].CheckIfUserIsInClass(${ClassID}, Email) AS Flag FROM tb_User WHERE Email = '${Email}' 
        `);
    }
}
