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
    getLibrariesByUserID: function(UserID) {
        return ExcuteSQL(`
            SELECT Lib.*, Num.TotalQuestions FROM tb_LibraryFolder AS Lib
            JOIN 
            (SELECT LF.LibraryFolderID, COUNT(Q.LibraryFolderID) AS TotalQuestions FROM  tb_Question AS Q
            JOIN tb_LibraryFolder AS LF ON Q.LibraryFolderID = LF.LibraryFolderID
            WHERE Q.LibraryFolderID IN 
            (SELECT LibraryFolderID FROM tb_LibraryFolder WHERE UserID = ${UserID})
            GROUP BY LF.LibraryFolderID, Q.LibraryFolderID) AS Num
            ON Lib.LibraryFolderID = Num.LibraryFolderID 
        `);
    },
    getLibraryByID: function(LibraryFolderID) {
        return ExcuteSQL(`
            SELECT L.*, Num.TotalQuestions FROM tb_LibraryFolder AS L JOIN 
            (SELECT LibraryFolderID, COUNT(*) AS TotalQuestions FROM tb_Question WHERE LibraryFolderID = ${LibraryFolderID}
            GROUP BY LibraryFolderID) AS Num
            ON  Num.LibraryFolderID = L.LibraryFolderID
        `);
    }
    updateLibraryFolder: function(LibraryFolderID, newInfo) {
        return ExcuteSQL(`
            UPDATE tb_LibraryFolder SET 
            LibraryFolderName = N'${newInfo.LibraryFolderName}', 
            Description = N'${newInfo.Description}',
            UpdatedDate = DATEADD(hh, 1, GETDATE()),
            Avatar = '${newInfo.Avatar}'
            WHERE LibraryFolderID = ${LibraryFolderID}
        `);
    },
    insertLibraryFolder: function(UserID, newInfo) {
        return ExcuteSQL(`
            INSERT INTO tb_LibraryFolder VALUES
            (N'${newInfo.LibraryFolderName}', N'${newInfo.Description}', DATEADD(hh, 1, GETDATE()), 
            DATEADD(hh, 1, GETDATE()), ${UserID}, '${newInfo.Avatar}')
        `);
    },
    deleteLibraryFolder: function(LibraryFolderID) {
        return ExcuteSQL(`
            DELETE FROM tb_LibraryFolder WHERE LibraryFolderID = ${LibraryFolderID}
        `);
    }
}
