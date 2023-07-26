import User from "../model/user-model.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const signupUser = async (request, response) => {
    try {
        const user = request.body;

        const existUser = await User.findOne({email: user.email});
        
        if(existUser) {
            return response.status(400).json({ message: 'user already exist!' });
        }
        user.password = bcrypt.hashSync(user.password, 10);

        const newUser = await new User(user);
        await newUser.save();
        return response.status(200).json(newUser);
    } catch (error) {
        return response.status(400).json({ message: error.message });
    }
}

export const loginUser = async (request, response) => {
    try {
        const { email, password } = request.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            return response.status(401).json({ message: 'invalid credentials' });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return response.status(401).json({ message: 'invalid credentials' });
        }

        const accessToken = jwt.sign({ name: user.name, id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });

        return response.status(200).json({ user: user, accessToken: accessToken });
    } catch (error) {
        return response.status(400).json({ message: 'invalid credentials' });
    }
}