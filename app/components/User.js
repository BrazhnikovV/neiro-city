
class User {
    constructor( user ) {
        this.firstname = user.firstname;
        this.secondname = user.secondname;
    }

    getUserInfo() {
        return "User firstname: " + this.firstname + ", secondname: " + this.secondname;
    }
}

module.exports = function( user ) {

    if ( user !== null ) {
        return new User( user );
    }
    else {
        throw new Error( 'Must set user parameters.' );
    }
}