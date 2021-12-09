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
        return ExcuteSQL(class_selectAll);
    },
    getClassByName: function(name) {
        return ExcuteSQL(`SELECT * FROM tb_Class where ClassName = '${name}'`);
    },
    getClassByTeacher: function(UserID) {
        return ExcuteSQL(`
            SELECT C.ClassID, C.ClassName, S.TotalStudents, A.TotalAssignments, C.UserID FROM 
            (SELECT ClassID, COUNT(*) AS TotalAssignments FROM tb_ExamOfClass WHERE ClassID IN
            (SELECT ClassID FROM tb_Class WHERE UserID = ${UserID})
            GROUP BY ClassID) AS A
            JOIN 
            (SELECT ClassID, COUNT(*) AS TotalStudents FROM tb_ClassMember WHERE ClassID IN
            (SELECT ClassID FROM tb_Class WHERE UserID = ${UserID})
            GROUP BY ClassID) AS S 
            ON A.ClassID = S.ClassID
            JOIN tb_Class AS C ON C.ClassID = S.ClassID
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
    addMember: function(classname, userID) {
        return ExcuteSQL(`
            insert into tb_ClassMember values(
            (select ClassID from tb_Class where ClassName = '${classname}'), ${userID})
        `);   
    },
    deleteMember: function(classname, userID) {
        return ExcuteSQL(`
            delete tb_ClassMember where
            ClassID = (select ClassID from tb_Class where ClassName = '${classname}')
            and UserID = ${userID}
        `);
    },
    changeName: function(classname, newName) {
        return ExcuteSQL(`
            update tb_Class set ClassName = N'${newName}' where ClassName = N'${classname}'
        `);
    }
}


