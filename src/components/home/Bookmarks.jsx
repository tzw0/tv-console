import "./bookmarks.scss"

const bookmarks = [
    {
        "name": "FMovies",
        "url": "https://ww4.fmovies.co/"
    },
    {
        "name": "YouTube",
        "url": "https://www.youtube.com/"
    },
    {
        "name": "duboku",
        "url": "https://www.duboku.tv/",
    },
    {
        "name": "9anime",
        "url":"https://9anime.to/"
    }
]

export default function Bookmarks() {
    return (
        <div className="bookmarks">
            {
                bookmarks.map((item, index) => {
                    const icon_link = `https://www.google.com/s2/favicons?domain=${item.url}&sz=128`
                    return (
                        <a className="bookmark" key={index} href={item.url}><img 
                        src={icon_link}
                        alt={icon_link}
                        /> {item.name} </a>
                    )
                })
            }
        </div>
    )
}