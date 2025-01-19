import { Button } from "@/ui/components/button";

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
    catch(err){
        console.log(err);
        throw new Error('Failed News');
    }
}

export default async function Page(){
    
    const allNews: News[] = await fetchAllNews();

    return(
        <section className="m-5 grid grid-cols-1 md:grid-cols-3 gap-10">
            {
                allNews.map((state) => (
                    <div key={state.url} className="relative h-full w-full glass-card p-8 rounded-2xl group-hover:translate-y-[-4px] transition duration-500">
                    <img src={state.image} alt="News content Image" />
                    <p className="font-bold mt-2 text-sm">{state.source}</p>
                    <p className="text-xl font-semibold my-3">{state.headline}</p>
                    <p className="text-muted-foreground">{state.summary}</p>
                    <div className="w-full mt-4">
                    <a target="_blank" href={state.url}><Button variant="outline">Read More</Button></a>
                    </div>
                    </div>
                ))
            }
        </section>
    )
}