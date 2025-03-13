const Student = require('../models/Student');

const getStudents = async (req, res) => {
   
  try {   
    const students = await Student.find();
    res.status(200).json(students);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const showStudents = async (req, res) => {
  const { id } = req.params;
  try 
  {
    const students = await Student.findById(id, req.body, { new: true });
    res.status(200).json(students);
  }catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createStudents = async (req, res) =>{
    const {name, email, age, phone_number} = req.body;

    if (!name || !email || !age || !phone_number){
        return res.status(400).json({ message: 'Please provide all fields' });
    }
    try{      
        
        const student = await Student.create({name, email, age, phone_number});
        res.status(201).json(student);
    }
    catch (error)
    {
        res.status(500).json({message: error.message});
    }
};


const updateStudent = async (req, res) => {

    const { id } = req.params;
    try
    {
        const students = await Student.findByIdAndUpdate(id, req.body, {new:true});
        if(!Student){
            return res.status(404).json({message:"user not found"});
        }
        res.status(200).json(students);
    }
    catch (error){
        res.status(500).json({message:error.message});
    }
};

const deleteStudent = async (req, res) =>{
    const { id } = req.params;
    try{
        const students = await Student.findByIdAndDelete(id);
        if(!Student){
            return res.status(404).json({message:"student not found"});
        }
        res.status(200).json({message:"student deleted successfully"});
    }
    catch (error){
        res.status(404).json({message:error.message});
    }
};

module.exports = {
    getStudents,
    createStudents,
    showStudents,
    updateStudent,
    deleteStudent
}
