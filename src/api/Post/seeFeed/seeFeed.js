import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";

export default {
    Query:{
        seeFeed: async (_,args,{request}) => {
            isAuthenticated(request);
            const { user } = request;

            return prisma.posts({
                where:{
                    OR:[
                        {user: {followers_some: { id: user.id }}},
                        {user: { id: user.id }}
                    ]
                }
            })

            // const following = await prisma.user({id:user.id}).following();
            // following.push(user);
            // return prisma.posts({
            //     where:{
            //        user:{
            //            id_in: following.map(user => user.id)
            //        }
            //     },
            //     orderBy:"createAt_DESC"
            // })
        }
    }
}