import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";

const EDIT = "EDIT";
const DELETE = "DELETE";

export default {
    Mutation: {
        editPost: async(_,args,{request}) => {
            isAuthenticated(request);
            const { user } = request;
            const {id, caption, location, action } = args;
            const exist = await prisma.$exists.post({
                id,
                user:{
                    id: user.id
                }
            });

            if(exist){
                if(action === EDIT){
                    return prisma.updatePost({
                        data:{
                            caption, location
                        },
                        where:{
                            id
                        }
                    })
                }else{
                    return prisma.deletePost({id})
                }
            }else{
                throw Error("You can't do that!");
            }
        }
    }
}