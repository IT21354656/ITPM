const CodeSnippet = require("../models/codeSnippetModel");

//Add codes

const addCodes = async (req, res) => {
    try {
        const{title, description, code, tags} = req.body;

        //check if fields are empty
        if (!title || !description || !code ) {
            return res.status(400).json({
              message: "All the fields must be filled",
            });
          }
          
        //Add
        const newCodeSnippet = new  CodeSnippet({
            title, 
            description, 
            code, 
            tags

        }) ; await newCodeSnippet.save();

        res.status(200).json({
            title, 
            description, 
            code, 
            tags
        });

      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
}
}

const insertCode = (req,res)=>{

    
    
      const codebody = `/ class ForLoopExample {
        public static void main(String[] args) {
            for (int i = 1; i <= 5; i++) {
                System.out.println("This is iteration " + i);
            }
        }
    }
    
    `;
    
      const codeName = "For loop"
      const codeDescription = "A sample refers to a smaller, manageable version of a larger group. It is a subset containing the characteristics of a larger population. Samples are used in statistical testing when population sizes are too large for the test to include all possible members or observations."
      const codeTags = ["For", "for", "loop", ]
    
      const newCodeSnippet = new CodeSnippet({
        title:codeName,
        description: codeDescription,
        code:codebody.trim(),
        tags: codeTags
      });
    
      newCodeSnippet.save().then(r=>{
        return res.status(200).json(r);
        
      }).catch(error=>{
        return res.status(500).json(error);
      })
    
    }

    /////////////////////////
    const insertCodeSnippet = async (req, res) => {
      const { title, description, code, tags } = req.body;
    
      try {
        // Create a new code snippet document and save it to your database
        const newCodeSnippet = new CodeSnippet({
          title,
          description,
          code,
          tags,
        });
        await newCodeSnippet.save();
    
        res.status(201).json({ message: 'Code snippet saved successfully' });
      } catch (error) {
        console.error('Error inserting code snippet:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    };


    //Get all code snippet
    const getAllCodeSnippets = async (req, res) => {
        try {
          const allCodeSnippets = await CodeSnippet.find();
          if (!allCodeSnippets) {
            return res.status(404).json({ message: "Code snippets not found" });
          } else {
            res.status(200).json(allCodeSnippets);
          }
        } catch (err) {
          console.error(err);
          res.status(500).json({ message: "Server error" });
        }
      };

      // Define a route for searching by tags
    const getCodeSnippetByTag =  async (req, res) => {
    const { keyword } = req.query;

    console.log("trrfrr",keyword);
  
    try {
      // Use Mongoose or your database library to search for records with matching tags
      const records = await CodeSnippet.find({ tags: keyword }).select('title description code');
  
      if (records.length === 0) {
        return res.status(404).json({ message: 'No matching records found.' });
      }
  
      res.status(200).json(records);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };


module.exports = {
    addCodes,
    insertCode,
    getAllCodeSnippets,
    getCodeSnippetByTag,
    insertCodeSnippet
  };