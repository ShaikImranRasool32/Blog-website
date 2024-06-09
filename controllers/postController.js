const Post = require('../models/Post');

const homeStartingContent = `Welcome to our Blog!

Here, you'll find a collection of insightful articles, stories, and musings written by our team and contributors. Whether you're looking for tips, inspiration, or just a good read, you're in the right place.

Feel free to explore our latest posts below and join the conversation by sharing your thoughts in the comments section. Happy reading!`;

const aboutContent = `About Us

We are a passionate group of writers, thinkers, and storytellers dedicated to sharing knowledge, sparking creativity, and fostering meaningful discussions through our blog.

Our mission is to inspire, educate, and entertain our readers by delivering high-quality content on a wide range of topics. From technology to travel, from science to self-improvement, we strive to cover it all.

Join us on this journey as we explore the world through words and delve into the depths of human experience one post at a time.`;

const contactContent = `Contact Us

Have a question, suggestion, or just want to say hello? We'd love to hear from you!

Feel free to reach out to us via email, phone, or social media. Our team is always here to assist you and we value your feedback.

Don't hesitate to get in touch – we're looking forward to connecting with you!`;


exports.getHome = async (req, res) => {
    try {
        const posts = await Post.find({});
        res.render('home', {
            startingContent: homeStartingContent,
            posts: posts
        });
    } catch (err) {
        console.log(err);
    }
};

exports.getAbout = (req, res) => {
    res.render('about', { aboutContent: aboutContent });
};

exports.getContact = (req, res) => {
    res.render('contact', { contactContent: contactContent });
};

exports.getCompose = (req, res) => {
    res.render('compose');
};

exports.postCompose = (req, res) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save()
        .then(() => res.redirect('/'))
        .catch(err => {
            console.log(err);
            res.redirect('/');
        });
};

exports.getPostById = async (req, res) => {
    const requestedPostId = req.params.postId;

    try {
        const post = await Post.findOne({ _id: requestedPostId }).exec();
        if (post) {
            res.render('post', {
                post: post
            });
        } else {
            res.send('Post not found');
        }
    } catch (err) {
        console.log(err);
    }
};
