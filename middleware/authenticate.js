import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

dotenv.config();

const authenticate = async (request, response, next) => {
    try {
        const token = request.headers.authorization.split(" ")[1];

        if (token) {
            const decodedData = jwt.verify(token, process.env.SECRET_KEY);
    
            request.userId = decodedData?.id;
        }
        next();
    } catch (error) {
        return response.status(400).json({ message: error.message });
    }
} 

export default authenticate;