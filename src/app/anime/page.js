import { animeList } from '@/data/anime_data_source'
import AnimeCard from '@/components/AnimeCard'

export default function Anime() {
  return (
    <div>
      <h2 className="mb-4">Anime List</h2>

      <div className="row">
        {animeList.map((anime) => (
          <AnimeCard key={anime.id} anime={anime} />
        ))}
      </div>
    </div>
  )
}