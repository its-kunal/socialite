export interface IUser extends UserCredentials {
    name: string,
    interests: string[],
    followers: string[],
    following: string[]
}
export interface UserCredentials {
    username: string,
    password: string
}