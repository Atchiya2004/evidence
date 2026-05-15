const analyzeEmail = require("../utils/phishingAnalyzer")

exports.analyze = (req,res)=>{
 const result = analyzeEmail(req.body.content)
 res.json(result)
}