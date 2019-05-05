import { prisma } from "../../../../generated/prisma-client";
import { MESSAGE_IN_ROOM_FRAGMENT } from "../../../fragments";

export default {
    Subscription: {
        newMessage: {
            subscribe: (_,args) => {
                const { roomId } = args;
                return prisma.$subscribe.message({
                    mutation_in: "CREATED",
                    node:{
                        room:{
                            id:"cjvax2e541br40b30olz9mf9y"
                        }
                    } 
                }).node().$fragment(MESSAGE_IN_ROOM_FRAGMENT)
            },
            resolve: payload => payload
        }
    }
}