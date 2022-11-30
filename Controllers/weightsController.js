const User = require('../Model/User')
const Weight = require('../Model/Weight');
const userId = require('../Middleware/verifyJWT')
  



    const getUserWeights = async(req, res) =>{
       
    const weights = await  Weight.find({userId: req.body.userId}).exec();
    if(!weights){
        return res.status(204).json({'message': 'no weights, please add a weight'})
    }
    res.json(weights);
}

    const addWeights = async (req,res)=>{
    
    
        
        const {weight} = req.body
        if(!weight){
            return res.status(400).json({'message': 'weight amount required'});
        }
       
            try{
                const addWeight = await Weight.create({
                    weight: req.body.weight,
                    userId: req.body.userId
                    
                })
                res.status(201).json(addWeight)
            }catch(err){
                console.log(err)
            }
            
            
        }
        const deleteAllWeights = async(req,res)=>{
            const userWeights = await Weight.find({userId: req.body.userId}).exec();
            const response = await userWeights.delete();
            res.json(response);
        }
        
    

    module.exports = {
        getUserWeights,
        addWeights,
        deleteAllWeights
    }






























