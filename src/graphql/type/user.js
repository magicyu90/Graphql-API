export const UserType = `

    type User{
       name:String,
       password:String,
       email:String,
       role:String
    }
    
    type Token{
       token:String
    }
    
    type Query {
        login(email:String,password:String):Token,
        test(message:String):String
    }
    
    type Mutation{
       register(
          name:String!
          email:String!
          password:String!
          role:String!
       ):Token
    }
`;

