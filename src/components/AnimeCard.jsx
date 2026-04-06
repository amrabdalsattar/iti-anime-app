    import Link from 'next/link'
    import Image from 'next/image'

    const AnimeCard = ({ anime }) => {
        return (
            <div className="col-md-4">
                <div className="card shadow-sm mb-4">
                    <Image src={anime.image} alt={anime.title} className="card-img-top" width={400} height={300} />

                    <div className="card-body">
                        <h5>{anime.title}</h5>
                        <p>{anime.year}</p>

                        <Link
                            href={`/anime/${anime.id}`}
                            className="btn btn-dark"
                        >
                            View Details
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    export default AnimeCard