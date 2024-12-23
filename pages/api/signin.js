import connectToDatabase from '@/database/dbConnection';
import User from '@/model/userSchema';
import bcrypt  from 'bcrypt';
import jwt from 'jsonwebtoken';


const validateInput = ({email, password }) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, message: 'Invalid email format.' };
  }
  if (password.length < 6) {
    return { isValid: false, message: 'Password must be at least 6 characters long.' };
  }
  return { isValid: true };
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Connect to the database
      await connectToDatabase();

      // Extract and validate input
      const {email, password } = req.body;
      const validation = validateInput({email, password });
      if (!validation.isValid) {
        return res.status(400).json({ message: validation.message });
      }

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        return res.status(409).json({ message: 'User with this email not exists.' });
      }
     const checkPassword = await bcrypt.compare(password,existingUser.password);
     if (!checkPassword) {
        return res.status(409).json({ message: 'Please Put Right Password' });
      }
   const payload = {
     id: existingUser._id,
     name:existingUser.name,
     email:existingUser.email
   };
   const token = jwt.sign(payload, "Defaut_key",{expiresIn: "1d",});
   res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Lax Secure`);
      return res.status(201).json({ message: 'User Logedin successfully!' });
    } catch (error) {
      console.error('Error in user creation:', error.message);
      return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
