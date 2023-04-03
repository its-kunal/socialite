import { Timestamp } from "firebase/firestore"
export interface postInterface {
    owner: string, // user id
    timestamp: Timestamp, // timestamp from firestore
    caption: string,
    image: string, // url to firebase cloud storage
    like: [{
        value: boolean,
        owner: string // user id
    }],
    comment: [{
        value: string,
        owner: string // user id
    }],
    interest: [string]
}