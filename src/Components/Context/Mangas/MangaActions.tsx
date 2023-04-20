import {
    doc,
    getDocs,
    getDoc,
    collection,
    query,
    limit,
    where,
    orderBy,
} from "firebase/firestore"
import { db } from "../../../firebase.config"

interface fetchMangaProps {
    type?: string
    q?: number
}

export const fetchMangas = async ({ type, q }: fetchMangaProps) => {
    let mangaQ
    const mangasRef = collection(db, "mangas")
    if (type && type === "limit") {
        mangaQ = query(mangasRef, limit(q!), orderBy("timestamp", "desc"))
    } else {
        mangaQ = query(mangasRef, orderBy("timestamp", "desc"))
    }

    const mangasSnap = await getDocs(mangaQ)

    const mangasData: {
        id: any
        data: any
    }[] = []

    mangasSnap.forEach((item) => {
        mangasData.push({
            id: item.id,
            data: item.data(),
        })
    })

    return mangasData
}

export const fetchManga = async (id: any) => {
    const mangaRef = doc(db, "mangas", id)
    const mangaSnap = await getDoc(mangaRef)

    let mangaData = null

    if (mangaSnap.exists()) {
        mangaData = {
            id: mangaSnap.id,
            data: mangaSnap.data(),
        }
    }

    return mangaData
}

export const queryTags = async (tagNumber: any) => {
    const data: any[] = []

    const mangaRef = collection(db, "mangas")
    const q = query(mangaRef, where("status", "==", tagNumber))

    const mangas = await getDocs(q)
    mangas.forEach((item) =>
        data.push({
            id: item.id,
            data: item.data(),
        })
    )

    return data
}
