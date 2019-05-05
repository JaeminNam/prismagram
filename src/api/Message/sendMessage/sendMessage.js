import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation:{
        sendMessage: async(_,args,{request}) =>{
            isAuthenticated(request);
            const { user } = request;
            const { roomId, text,  toId } = args;
            let room;
            if(roomId === undefined){
                if(user.id !== toId){
                    room = await prisma.createRoom({
                        participants:{
                            connect:[
                                {id:toId},
                                {id:user.id}
                            ]
                        }
                    })
                }
            }else{
                room = await prisma.room({id:roomId});
            }
            if(!room){
                throw Error("Room not found")
            }
            return prisma.createMessage({
                text:text,
                room:{
                    connect:{
                        id:room.id
                    }
                },
                from:{
                    connect:{
                        id:user.id
                    }
                },
                to:{
                    connect:{
                        id:toId
                    }
                }
            });
        }
    }
}