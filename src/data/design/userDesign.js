const userDesign = {

    name: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    role: {
        type: String
    },
    token:{
        type:String
    }
}


export  default userDesign;