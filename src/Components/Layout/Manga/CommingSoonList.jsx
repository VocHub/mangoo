import React, { useEffect, useState } from "react"
import { queryTags } from "../../Context/Mangas/MangaActions"
import Spinner from "../Spinner"
import { MangaWideContainer } from "./MangaWideContainer"

export const CommingSoonList = () => {
  const [mangaQuery, setMangaQuery] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMangaQuery = async () => {
      const data = await queryTags(0)
      setMangaQuery(data)
      setLoading(false)
    }
    fetchMangaQuery()
  }, [])

  return loading ? (
    <Spinner />
  ) : (
    <div className="col-span-3 rounded-lg max-w-full border-zinc-700 border-opacity-40 mb-5 flex justify-center flex-row items-center">
      <ul className="list-none flex flex-wrap gap-x-16 justify-evenly min-w-[300px] w-[100%]">
        {loading ? (
          <Spinner />
        ) : (
          mangaQuery.map(({ id, data }) => (
            <MangaWideContainer
              key={id}
              id={id}
              name={data.name}
              rating={data.rating}
              img={data.bannerSmall}
              chap={data.chapters}
              status={data.status}
              customStyle="gap-x-5"
              clicks={data.clicks}
            />
          ))
        )}
      </ul>
    </div>
  )
}
