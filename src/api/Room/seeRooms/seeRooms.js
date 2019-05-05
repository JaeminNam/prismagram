import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middleware";

export default {
    Query:{
        seeRooms: (_,args,{request}) => {
            isAuthenticated(request);
            const { user } = request;
            return prisma.rooms({
                where:{
                    participants_some: {id:user.id}
                }
            })
        }
    }
}