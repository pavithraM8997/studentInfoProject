const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const cors = require('cors');
const WebSocket = require('ws');


const app = express();
const wss = new WebSocket.Server({ noServer: true });

app.use(cors()); 
app.use(express.json()); 


mongoose.connect('mongodb://localhost:27017/submitdb', {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));


const userSchema = new mongoose.Schema({
    studentName:  String,
    age: Number,
    email: String,
    phoneNo:  Number,
    address: String,
    course: String
});

const User = mongoose.model('User1', userSchema);


app.post('/signup', async (req, res) => {
    console.log('Received signup request:', req.body);
    const { studentName, age, email, phoneNo, address, course } = req.body;
    

    try {
        const newUser = new User({ studentName, age, email, phoneNo, address, course });
        await newUser.save();
        res.status(200).json({ message: 'User signed up successfully!' });
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json({ message: 'Failed to sign up user' });
    }
});


app.get('/studentslist',async(req,res)=>{
    try{
        const students= await User.find();
        res.status(200).json(students);
    }
    catch(error){
        console.error('error fetching students',error);
    }
    }
)
// Example backend code
app.delete('/studentslist', async (req, res) => {
    const { ids } = req.body;
    try {
      await User.deleteMany({ _id: { $in: ids } });
      res.status(200).json({ message: 'Students deleted successfully' });
    } catch (error) {
      console.error('Error deleting students:', error);
      res.status(500).json({ message: 'Failed to delete students' });
    }
  });
  
  

  app.get('/api/students/:id', async (req, res) => {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({ error: 'Invalid student ID format' });
      }
      try {
          const student = await User.findById(id);
          if (!student) {
              return res.status(404).json({ error: 'Student not found' });
          }
          res.json(student);
      } catch (error) {
          console.error('Error fetching student:', error);
          res.status(500).json({ error: 'Internal server error' });
      }
  });
  app.put('/api/students/:id', async (req, res) => {
    try {
      const updatedStudent = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true } // This returns the updated student document
      );
      if (!updatedStudent) {
        return res.status(404).json({ message: "Student not found" });
      }
      res.status(200).json(updatedStudent);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
app.get('/', async (req, res) => {
    res.send("working");
})

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
