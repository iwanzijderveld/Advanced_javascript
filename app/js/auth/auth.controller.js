module.exports = function ($location, AuthenticationService) {
    // Read the params
    var username = $location.search().username;
    var token = $location.search().token;
    
    // Parse it into our application
    AuthenticationService.setCredentials(username, token);
};