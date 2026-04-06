import { animeList } from '@/data/anime_data_source'

export default async function Character({ params }) {

    const { id, charId } = await params

    const anime = animeList.find(
        (a) => a.id.toString() === id
    )

    if (!anime) {
        return <h2>Anime Not Found</h2>
    }

    const character = anime.characters.find(
        (c) => c.id.toString() === charId
    )

    if (!character) {
        return <h2>Character Not Found</h2>
    }

    return (
        <div>
            <h2>{character.name}</h2>
            <p>From {anime.title}</p>
        </div>
    )
}