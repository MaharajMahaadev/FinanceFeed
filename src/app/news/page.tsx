
interface News {
    category: string,
    datetime: number,
    headline: string,
    id: number,
    image: string,
    related: string,
    source: string,
    summary: string,
    url: string
}

async function fetchAllNews(){
    try{
        const res = await fetch(`https://finnhub.io/api/v1/news?category=general&token=${process.env.FINNHUB_KEY}`);
        const data = await res.json();
        return data;
    }
    catch(error){
        throw new Error('Failed News');
    }
}

export default async function Page(){
    
    const allNews: News[] = await fetchAllNews();

    return(
        <section className="grid grid-flow-row grid-cols-3 gap-10">
            {
                allNews.map((state) => (
                    <div key={state.url} className="h-full w-full">
                    <img src={state.image}></img>
                    <p>{state.source}</p>
                    <p>{state.headline}</p>
                    <p>{state.summary}</p>
                    <a href={state.url}>{state.url}</a>
                    </div>
                ))
            }
        </section>
    )
}