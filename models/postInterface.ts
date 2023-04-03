import { Timestamp } from "firebase/firestore"
interface postInterface {
    owner: string, // user id
    timestamp: Timestamp, // timestamp from firestore
    caption: string,
    image: string
}