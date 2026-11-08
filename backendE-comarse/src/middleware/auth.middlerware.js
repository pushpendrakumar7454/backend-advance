import { verifyAccessToken } from "../utils/auth.utils.js";

export const authenticate = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;

        if (!authorization) {
            return res.status(401).json({
                message: "Authorization header not found",
            });
        }

        const accessToken = authorization.split(" ")[1];

        if (!accessToken) {
            return res.status(401).json({
                message: "Access token not found",
            });
        }

        const decoded = verifyAccessToken(accessToken);
       

        if (!decoded) {
            return res.status(401).json({
                message: "Invalid access token",
            });
        }

        req.user = decoded;

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired access token",
        });
    }
};


export const selllerAuthencticate=async(req,res,next)=>{
    if(req.user.role!=="seller"){
        return res.status(403).json({
            messages:"user is not unauthorized to do this action"
        })
    }
    next()
}

export const parseProductData = (req, res, next) => {
    try {

        if (req.body.prices) {
            req.body.prices = JSON.parse(req.body.prices)
        }

        if (req.body.sizes) {
            req.body.sizes = JSON.parse(req.body.sizes)
        }

        next()

    } catch (error) {
        return res.status(400).json({
            message: "Invalid JSON format"
        })
    }
}