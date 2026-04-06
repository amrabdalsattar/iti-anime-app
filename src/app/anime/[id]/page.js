import { animeList } from '@/data/anime_data_source'
import Image from 'next/image'
import Link from 'next/link'
export default async function AnimeDetails({ params }) {

    const { id } = await params

    const anime = animeList.find(
        (a) => a.id.toString() === id
    )

    if (!anime) {
        return <h2>Anime Not Found</h2>
    }

    return (
        <div>
            <h2>{anime.title}</h2>

            <Image
                src={anime.image}
                alt={anime.title}
                width={400}
                height={300}
            />

            <h4>Characters</h4>

            {anime.characters.map((char) => (
                <div key={char.id}>
                    <Link href={`/anime/${anime.id}/characters/${char.id}`}>
                        {char.name}
                    </Link>
                </div>
            ))}
        </div>
    )
}