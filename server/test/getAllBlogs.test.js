const request = require("supertest");
const { app } = require("../index");
const Blog = require("../models/Blog.js")

jest.mock("../models/Blog.js")

describe("Retrieval of all Blogs", function (done) {
    afterEach(function () {
        jest.clearAllMocks();
    });

    it('Test to check retrieval of all Blogs', function (done) {
        const mockBlogs = [
            {
                _id: "65d4ed3cf952485f4ebd81dd",
                authorName: 'John Doe',
                title: 'My First Blog',
                content: 'Great service!',
                authorAvatar: "https://bootdey.com/img/Content/avatar/avatar1.png",
                __v: 0
            },
            {
                _id: "65d4ed3cf952485f4ebd81dd",
                authorName: 'Jane Smith',
                title: 'Second Blog',
                content: 'Another great post!',
                authorAvatar: "https://bootdey.com/img/Content/avatar/avatar2.png",
                __v: 0
            }];

        Blog.find.mockResolvedValueOnce(mockBlogs);

        request(app)
            .get('/api/blog/allBlogs')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body.data).toEqual(mockBlogs);
                done();
            });
    });

})


