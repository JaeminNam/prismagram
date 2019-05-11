import {prisma} from "../../../../generated/prisma-client";

export default {
    Mutation:{
        createAccount: async(_,args) => {
            const { userName, email, firstName="", lastName="" } = args;
            try{
                const user= await prisma.createUser({
                    userName,
                    email,
                    firstName,
                    lastName,
                });
                if(user){
                    return true;
                }else{
                    return false;
                }
            }catch(error){
                return false;
            }
        }
    }
}