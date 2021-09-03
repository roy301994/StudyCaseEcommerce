
const appkeyModel=require ('../models/index.js').appkeyModel


const validasiAppKey = async (req,res,next)=>{

    var check=false
        // 
        if (req.headers.hasOwnProperty('appkey')) {
            // check=true
            var AppkeyUser=req.headers.appkey 
            const dataAppKey= await appkeyModel.findOne({
                    where :{
                        app_key: AppkeyUser
                    }
                }) 
                if (dataAppKey){
                    next()
                }else{
                    res.status(401).json({
                        error:true,
                        message:'appkey incorrect',
                        data:[]
                    })
                

                }
        }else{
            res.status(401).json({
                error:true,
                message:'appkey not found',
                data:[]
            })
            
        }

}

module.exports=validasiAppKey