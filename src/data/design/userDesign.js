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
    level: {
        type: Number
    }
}


export  default userDesign;