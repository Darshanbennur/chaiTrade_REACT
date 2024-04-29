const request = require("supertest");
const { app } = require("../index");
const EducationalResources = require("../models/EducationResources.js")

jest.mock("../models/EducationResources.js")

describe("Retrieval of all educational resources", function (done) {
    it('Test to check retrieval of all educational resources', function (done) {
        const mockResources = [
            {
                _id: "65d4ed3cf952485f4ebd81dd",
                title: 'Good EducationalResources',
                content: 'Great service!',
                link: "https://www.shareindia.com/knowledge-center/online-share-trading/trading-psychology"
            },
            {
                _id: "65d4ed3cf952485f4ebd81dd",
                title: 'Second EducationalResources',
                content: 'Another great resource!',
                link: "https://www.shareindia.com/knowledge-center/online-share-trading/trading-psychology"
            }];

        EducationalResources.find.mockResolvedValueOnce(mockResources);

        request(app)
            .get('/api/educationalRoutes/getAllEducationalResources')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body.data).toEqual(mockResources);
                done();
            });
    });
})
