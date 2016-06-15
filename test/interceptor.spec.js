describe("Test Interceptor", function () {
    var Interceptor;
    var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImF3LnZhbnppamRlcnZlbGRAc3R1ZGVudC5hdmFucy5ubCI.txmm99ugNNJkM_3fFRjeZid9cxrDUAWQKfVjgK24hPs';
    var username = 'aw.vanzijderveld@student.avans.nl'

    beforeEach(module('webs6'));

    beforeEach(module(function ($provide) {
        $provide.value('localStorage', {
            token: token,
            username: username
        });
    }));

    beforeEach(inject(function (HttpRequestInterceptor) {
        Interceptor = HttpRequestInterceptor;

    }));

    it('should return config with token and username', function (done) {
        config = {};
        config = Interceptor.request(config);
        expect(config.headers['x-username']).to.equals(username);
        expect(config.headers['x-token']).to.equals(token);
        done();
    });

});