export const USER_FRAGMENT = `
    id
    email
    userName
    firstName
    lastName
    bio
    avatar
`;
export const COMMENT_FRAGMENT = `
    fragment CommentFragment on Comment{
        id
        text
        user {
            ${USER_FRAGMENT}
        }
    }
`;


export const MESSAGE_IN_ROOM_FRAGMENT = `
    fragment mirf on Message {
        id
        text
        from{
            id
            avatar
            userName
        }
        to{
            id
            avatar
            userName
        }
        createAt
        updateAt
    }
`;