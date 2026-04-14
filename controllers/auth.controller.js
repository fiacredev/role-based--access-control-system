import {
  registerStudent,
  registerFaculty,
  registerAdmin,
  registerSuperAdmin,
  loginUser
} from "../services/auth.service.js";

export const registerStudentController = async (req, res) => {
  try {
    const user = await registerStudent(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const registerFacultyController = async (req, res,) => {
  try {
    const user = await registerFaculty(req.body, req.user._id);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const registerAdminController = async (req, res) => {
  try {
    const user = await registerAdmin(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const registerSuperAdminController = async (req, res) => {
  try {
    const user = await registerSuperAdmin(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);

    res.status(200).json({
      message: "Login successful",
      token: result.token,
      user: result.user
    });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};









// import { registerUser, logInuser } from "../services/auth.service.js";

// export const register = async (req, res) =>{
//     try{
//         const user = await registerUser(req.body);
//         res.status(201).json({ message: "user registered", user });
//     }catch(error){
//         res.status(400).json({ message: error.message });
//     }
// };


// export const login = async (req,res) =>{
//     try{
//         const result = await logInuser(req.body.email, req.body.password);
//         res.json(result);
//     }catch(error){
//         res.status(401).json({ message: error.message});
//     }
// };
