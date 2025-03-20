
export class User {
    username; //string
    email;  //string
    password;  //string password
    firstName;
    lastName;
    birthday; //date

    constructor(username,email,password,firstName,lastName,birthday){
        this.username=username;
        this.email=email;
        this.password=password;
        this.firstName=firstName;
        this.lastName=lastName;
        this.birthday=birthday;
    }

}