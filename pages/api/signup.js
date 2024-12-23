import connectToDatabase from '@/database/dbConnection';
import User from '@/model/userSchema';
import bcrypt  from 'bcrypt';
const saltRounds = 10;
// Utility function for validation
const validateInput = ({ name, email, password }) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!name || !email || !password) {
    return { isValid: false, message: 'All fields are required.' };
  }
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
      const { name, email, password } = req.body;
      const validation = validateInput({ name, email, password });
      if (!validation.isValid) {
        return res.status(400).json({ message: validation.message });
      }

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: 'User with this email already exists.' });
      }
     let salt = await bcrypt.genSalt(saltRounds);
     let hassedPassword = await bcrypt.hash(password, salt);
      // Create a new user
      const newUser = new User({ name, email, password:hassedPassword });
      await newUser.save();

      return res.status(201).json({ message: 'User created successfully!' });
    } catch (error) {
      console.error('Error in user creation:', error.message);
      return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
