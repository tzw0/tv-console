import "./bookmarks.scss"

const bookmarks = [
    {
        "name": "FMovies",
        "url": "https://www.fmoviesto.cc/"
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
        "name": "anime",
        "url":"https://aniwave.to/"
    },
    {
        "name": "drama",
        "url":"https://ww8.dramacoool.co/"
    },
    {
        "name": "telegram",
        "url":"https://web.telegram.org/a/#777000"
    },
    {
        "name": "Top Films",
        "url":"https://www.netflix.com/tudum/top10/singapore",
        "image_link":"https://www.netflix.com"
    },
    {
        "name": "Top Series",
        "url":" https://www.netflix.com/tudum/top10/singapore/tv",
        "image_link":"https://www.netflix.com"
    },
]

export default function Bookmarks() {
    return (
        <div className="bookmarks">
            {
                bookmarks.map((item, index) => {
                    if (item["image_link"] === undefined) {
                        item.image_link = item.url
                    }
                    const icon_link = `https://www.google.com/s2/favicons?domain=${item.image_link}&sz=128`
                    return (
                        <a className="bookmark" key={index} href={item.url} target="_blank" rel="noreferrer"><img 
                        src={icon_link}
                        alt={icon_link}
                        /> {item.name} </a>
                    )
                })
            }
        </div>
    )
}