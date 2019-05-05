import { prisma } from "../../generated/prisma-client";

export default {
    User: {
        fullName: (parent) => {
            return `${parent.firstName} ${parent.lastName}`;
        },
        isFollowing: (parent, _, {request}) => {
            const { user } = request;
            const { id: parentId} = parent;
            try{
                return prisma.$exists.user(
                    {
                        AND:[
                            {id:parentId},
                            {followers_some:{id:user.id}}
                        ]
                    }
                );
            }catch(error){
                console.log(error);
                return false;
            }
        },
        isAmI: (parent,_,{request}) => {
            const { id:parentId } = parent;
            const { user } = request;
            return parentId === user.id;
        }
    },
    Post: {
        files: (request) => prisma.post({id:request.id}).files(),
        user: (request) => prisma.post({id:request.id}).user(),
        comments: (request) => prisma.post({id:request.id}).comments(),
        likes: (request) => prisma.post({id:request.id}).likes(),
        isLike: async(parent,_,{request}) => {
            const { user } = request;
            const { id } = parent;
            try{
                return prisma.$exists.like(
                    {
                        AND:[
                            {post:{id}},
                            {user:{id:user.id}}
                        ]
                    }
                );
            }catch(error){
                console.log(error);
                return false;
            }
        },
        likeCount: (parent) => prisma.likesConnection({
            where:{post:{id:parent.id}}
        }).aggregate().count()
    }
}