// DESCRIPTION:
// A system is receiving each hour a batch with logon information.
// Can you write a method that can update accounts with the latest logon data?

// Task
// Finish this function:

// The updates must follow this pattern:

// Accounts are matched with the logon information by the "Id" fields.
// If an account matches a logon, The "LogonCount" is incremented with 1.
// If "Id" is not found, a new account will be added with all available information where "LogonCount" is set to 1.
// If "LastLogon" is older than the logon "Date" it will be set to the logon "Date".
// If "LastLogon" is older than the logon "Date" the "Name" will be set to the logon "Name" when not empty.
// Accounts are returned ordered by "Id" ascending, but they are not necessarily ordered when they are passed as a parameter.

function updateAccounts(accounts, logons) {}


function updateAccounts(accounts, logons) {
    let usersAccounts = accounts['Accounts'];
    logons["Logons"].sort((user1, user2) => {
        return user2['Name'].length - user1['Name'].length;
    });
    logons["Logons"].forEach(userLogon => {
        let user = usersAccounts.find(item => item['Id'] === userLogon['Id']);
        if (user) {
            ++user['LogonCount'];
            if (userLogon['Date'] > user['LastLogon']) {
                user['LastLogon'] = userLogon['Date'];
                user['Name'] = userLogon['Name'] || user['Name'];
            }
        }
        else {
            usersAccounts.push({
                'Id': userLogon['Id'],
                'Name': userLogon['Name'],
                'LogonCount': 1,
                'LastLogon': userLogon['Date'],
            })
        }
    })
    usersAccounts.sort((user1, user2) => user1['Id'] - user2['Id']);
    return accounts;
}