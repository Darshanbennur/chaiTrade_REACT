const request = require("supertest");
const { app } = require("../index");
const Blog = require("../models/Blog.js")

jest.mock("../models/Blog.js")

describe('Blog Posting', function() {
    afterEach(function() {
        jest.clearAllMocks();
    });

    it('should post a blog successfully', function(done) {
        Blog.prototype.save.mockResolvedValueOnce({});
        request(app)
            .post('/api/blog/postBlog')
            .send({ authorName: 'John Doe', title: 'My First Blog', content: 'Great service!', authorAvatar: "https://bootdey.com/img/Content/avatar/avatar1.png" })
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);

                expect(Blog.prototype.save).toHaveBeenCalled();

                done();
            });
    });

});

