import User from '../models/userModel.js'; // Import model User

export const loginUser = async (req, res) => {
    console.log('Login request:', req.body); // log masuk
    const { username, password, role } = req.body;
    try {
        // Mencari user dengan username, password, dan role
        const user = await User.findOne({ where: { username, password, role } });

        if (user) {
            // Jika user ditemukan, kirim respons sukses
            return res.json({ success: true });
        } else {
            // Jika username, password, atau role salah, kirim error dengan status 401
            return res.status(401).json({ success: false, message: 'Username/password/role salah' });
        }
    } catch (error) {
        console.error('Login error:', error); // log error
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};
