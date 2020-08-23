import { RootReducerType } from "../redux/redux-store"

export type PhotosType = {
    large: string | null
    small: string | null
}
export type ContactsType = {
    facebook: string | null,
    website: string | null,
    vk: string | null,
    twitter: string | null,
    instagram: string | null,
    youtube: string | null,
    github: string | null,
}
export type ProfileType = {
    userID: number | null
    name: string
    status: string
    aboutMe: string
    lookingForAJob: boolean | null
    lookingForAJobDescription: string
    photos: PhotosType
    contacts: ContactsType
}
export type PostType = {
    id: number
    text: string
    date: string
}
export type MessageType = {id: number, text: string}
export type DialogsType = {id: number, name: string}
export type AppStateType = ReturnType<RootReducerType>