const userDesign = {

    name: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String,
        unique:true
    },
    role: {
        type: String
    },
    token:{
        type:String
    }
}


export  default userDesign;