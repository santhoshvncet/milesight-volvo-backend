import jwt from 'jsonwebtoken';



export const protect = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        console.log("not authenticated");
        res.status(404).json({
            success: false,
            message: "user not authenticated"
        })

    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRETE_KEY);
        console.log(decoded);
        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: "user not authenticated"
            })
        }
        req.user = decoded;
        next()
    } catch (error) {
        res.status(501).json({
            success: false,
            message: "internal server error please try again later",
            error
        });
    }

}