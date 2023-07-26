import Post from "../model/post-model.js"

export const createPost = async (request, response) => {
    const post = request.body;
    const userId = request.userId;
    try {
        if (!userId) return response.status(400).json({ message: 'unauthorized user' });

        const newPost = await new Post({ ...post, creator: userId });
        await newPost.save();

        return response.status(200).json(newPost);
    } catch (error) {
        return response.status(500).json({ message: error.message });
    }
}

export const getAllPosts = async (request, response) => {
    const { page } = request.query;

    try {
        const LIMIT = 6;
        const startIndex = (Number(page) - 1) * LIMIT; // Get the starting index of every page
        const total = await Post.countDocuments({});

        const posts = await Post.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex); // _id: -1 to get the latest post first

        if (!posts) {
            return response.status(404).json({ message: 'post not found!' })
        }

        return response.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
    } catch (error) {
        return response.status(404).json({ message: 'post not found!' })
    }
}

export const getPostById = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findById(id);

        return res.status(200).json(post);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

export const updatePost = async (request, response) => {
    const { id } = request.params;
    const { title, message, selectedFile, tags } = request.body;
    const userId = request.userId;
    try {
        if (!userId) return response.status(400).json({ message: 'Unauthorized' });

        const updatedPost = { creator: userId, title, message, tags, selectedFile, _id: id };

        await Post.findByIdAndUpdate(id, updatedPost, { new: true });

        return response.status(200).json(updatedPost);
    } catch (error) {
        return response.status(404).send(`No post with id: ${id}`);
    }
}


export const deletePost = async (req, res) => {
    const { id } = req.params;
    const userId = req.userId;

    try {
        if (!userId) return response.status(400).json({ message: 'Unauthorized' });

        await Post.findByIdAndRemove(id);

        res.status(200).json({ message: "Post deleted successfully." });
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}


export const likePost = async (req, res) => {
    const { id } = req.params;
    const userId = req.userId;

    try {
        if (!userId) {
            return res.status(400).json({ message: "Unauthorized" });
        }

        const post = await Post.findById(id);

        const index = post.likes.findIndex((id) => id === String(userId));

        if (index === -1) {
            post.likes.push(userId);
        } else {
            post.likes = post.likes.filter((id) => id !== String(userId));
        }

        const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });

        return res.status(200).json(updatedPost);
    } catch (error) {
        return res.status(404).send(`No post with id: ${id}`);
    }
}

export const getPostsBySearch = async (req, res) => {
    const { title, tags } = req.query;

    try {
        const modifiedTitle = new RegExp(title, "i");

        const posts = await Post.find({ $or: [{ title: modifiedTitle }, { tags: { $in: tags.split(',') } }] });

        return res.status(200).json(posts);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

export const commentPost = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;
    const userId = req.userId;

    try {
        if (!userId) {
            return res.status(400).json({ message: "Unauthorized" });
        }
        const post = await Post.findById(id);

        post.comments.push(value);

        const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });

        return res.status(200).json(updatedPost);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
