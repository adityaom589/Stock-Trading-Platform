const User = require("../model/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");


module.exports.Signup = async (req, res, next) => {
  


  try {
    const { email, password, username } = req.body;

    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    
    const user = await User.create({ email, password, username });

   
    const token = createSecretToken(user._id);

    
    res.cookie("token", token, {
      path: "/", 
      expires: new Date(Date.now() + 86400000), 
      secure: false, 
      httpOnly: true, 
    });

    
    return res.status(201).json({
      message: "User signed in successfully",
      success: true,
      user
    });

  } catch (error) {
    console.error(error);
    
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


module.exports.Login = async (req, res, next) => {
  console.log('🔍 LOGIN REQUEST RECEIVED:', req.body);


  try {
    const { email, password } = req.body;

    
    console.log('EMAIL:', email, 'PASSWORD LENGTH:', password?.length);

    
    if (!email || !password) {
      console.log('EMPTY FIELDS DETECTED');
      return res.status(400).json({ message: 'All fields are required' });
    }


     console.log('SEARCHING FOR USER:', email); 

    const user = await User.findOne({ email });
    console.log('USER FOUND:', !!user); 

    if (!user) {
       console.log(' NO USER EXISTS FOR:', email); 
      return res.status(401).json({ message: 'Incorrect password or email' });
    }

    console.log(' CHECKING PASSWORD...');
    const auth = await bcrypt.compare(password, user.password);
    console.log('✅ PASSWORD MATCH:', auth);


    if (!auth) {
      console.log('PASSWORD DOES NOT MATCH');
      return res.status(401).json({ message: 'Incorrect password or email' });
    }

    
    const token = createSecretToken(user._id);

   
    res.cookie("token", token, {
      path: "/",
      expires: new Date(Date.now() + 86400000), 
      secure: false, 
      httpOnly: true, 
      sameSite: "lax",
    });

    console.log('LOGIN SUCCESSFUL for:', email);     
    return res.status(200).json({
      message: "User logged in successfully",
      success: true
    });

    

  } catch (error) {
    console.error(error);
    console.log('Signup ERROR:', error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};