const users = [{email: "noam1234@gmail.com", password: "123456", name: "נעם", lastVisit: 1670886751000},
    {email: "yossi@gmail.com", password: "123abc", name: "יוסי", lastVisit: 1673438560000},
    {email: "ruhama@walla.com", password: "Ab123456", name: "רוחמה", lastVisit: 1673446258000}];

const nonAtomicObjects = [
    {ID: "SP-1", owner: "noam1234@gmail.com", lastUpdate: 1665399900000, name: "החדר של נעם", isPersonal: true},
    {ID: "2", owner: "noam1234@gmail.com", lastUpdate: 1665401400000, name: "השולחן של נעם", isPersonal: true},
    {ID: "SP-3", owner: "noam1234@gmail.com", lastUpdate: 1665403800000, name: "חדר לימודים", isPersonal: false},
    {ID: "4", owner: "noam1234@gmail.com", lastUpdate: 1665403500000, name: "מדפים גדולים", isPersonal: false},
    {ID: "SP-5", owner: "yossi@gmail.com", lastUpdate: 1668081795000, name: "החדר של יוסי", isPersonal: true},
    {ID: "SP-6", owner: "ruhama@walla.com", lastUpdate: 1668082215000, name: "החדר של רוחמה", isPersonal: true},
    {ID: "7", owner: "noam1234@gmail.com", lastUpdate: 1665403700000, name: "מדף עליון", isPersonal: false},
    {ID: "8", owner: "noam1234@gmail.com", lastUpdate: 1665403800000, name: "מדף אמצעי", isPersonal: false},
    {ID: "9", owner: "noam1234@gmail.com", lastUpdate: 1665403900000, name: "מדף תחתון", isPersonal: false},
    {ID: "14", owner: "noam1234@gmail.com", lastUpdate: 1665580625000, name: "קופסה ירוקה", isPersonal: false}];

const spaces = [{ID: "SP-1", owner: "noam1234@gmail.com", lastUpdate: 1665399900000, name: "החדר של נעם", isPersonal: true},
    {ID: "SP-3", owner: "noam1234@gmail.com", lastUpdate: 1665403800000, name: "חדר לימודים", isPersonal: false},
    {ID: "SP-5", owner: "yossi@gmail.com", lastUpdate: 1668081795000, name: "החדר של יוסי", isPersonal: true},
    {ID: "SP-6", owner: "ruhama@walla.com", lastUpdate: 1668082215000, name: "החדר של רוחמה", isPersonal: true}];

const sharedSpaces = [{space: "SP-1", sharedWith: "noam1234@gmail.com"},
    {space: "SP-3", sharedWith: "noam1234@gmail.com"},
    {space: "SP-3", sharedWith: "ruhama@walla.com"},
    {space: "SP-5", sharedWith: "yossi@gmail.com"},
    {space: "SP-6", sharedWith: "ruhama@walla.com"}];

const nonAtomicInNonAtomic = [{ID: "2", inside: "SP-3"},
    {ID: "4", inside: "SP-3"},
    {ID: "7", inside: "4"},
    {ID: "8", inside: "4"},
    {ID: "9", inside: "4"},
    {ID: "14", inside: "7"}];

const atomicObjects = [{ID: "10", owner: "noam1234@gmail.com", lastUpdate: 1665580215000, name: "מטרייה", isPersonal: false, inside: "7"},
    {ID: "11", owner: "noam1234@gmail.com", lastUpdate: 1665580325000, name: "דפדפת משבצות", isPersonal: false, inside: "7"},
    {ID: "12", owner: "noam1234@gmail.com", lastUpdate: 1665580425000, name: "דפדפת שורה", isPersonal: false, inside: "7"},
    {ID: "13", owner: "noam1234@gmail.com", lastUpdate: 1665580525000, name: "מחקים", isPersonal: false, inside: "7"}];

const stockObjects = [{ID: "11", owner: "noam1234@gmail.com", lastUpdate: 1665580325000, name: "דפדפת משבצות", isPersonal: false, inside: "7", stockStatus: "הולך להיגמר"},
    {ID: "12", owner: "noam1234@gmail.com", lastUpdate: 1665580425000, name: "דפדפת שורה", isPersonal: false, inside: "7", stockStatus: "אזל מהמלאי"},
    {ID: "13", owner: "noam1234@gmail.com", lastUpdate: 1665580525000, name: "מחקים", isPersonal: false, inside: "7", stockStatus: "הולך להיגמר"}];

const alerts = [{user: "noam1234@gmail.com", number: "1", time: 1668081895000, title: "בקשת הצטרפות חדשה", message: "בקשת הצטרפות חדשה", read: false, deleted: false},
    {user: "noam1234@gmail.com", number: "2", time: 1671923551000, title: "הרבה זמן לא ביקרת כאן!", message: "היי!\n" +
            "\n" +
            "נראה שהרבה זמן לא ביקרת כאן..\n" +
            "\n" +
            "כדי לשמור על סדר וארגון חשוב לעדכן במערכת את מיקום הפריטים באופן שוטף!\n", read: false, deleted: false},
    {user: "noam1234@gmail.com", number: "3", time: 1665580425000, title: "הודעה על עדכון סטטוס של פריט", message: "סטטוס של פריט עודכן", read: false, deleted: false}];

const sharingRequests = [{user: "noam1234@gmail.com", number: "1", from: "yossi@gmail.com", space: "SP-3", requestStatus: "ממתינה לאישור"}];

const objectStatusUpdates = [{user: "noam1234@gmail.com", number: "3", by: "noam1234@gmail.com", stockObject: "12"}];



function createNewUser(email, password, name){
    users.push({email: email, password: password, name: name, lastVisit: Date.now()});
    user = {email: email, password: password, name: name, lastVisit: Date.now()};
}



function createNewSpace(name, isPrivate){
    nonAtomicObjects.push({ID: "SP-" + addNum(), owner: user.email, lastUpdate: Date.now(), name: name, isPersonal: isPrivate});
    spaces.push(nonAtomicObjects.at(nonAtomicObjects.length-1));
    console.log(spaces);
}

