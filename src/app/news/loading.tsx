import { Button } from "@/ui/components/button"

function NewsSections(){
    return(
        <div className="relative h-full w-full glass-card p-8 rounded-2xl group-hover:translate-y-[-4px] transition duration-500">
            <div className="h-52 w-full animate-pulse bg-slate-300"></div>
            <p className="h-2 w-6 mt-2 animate-pulse bg-slate-300"></p>
            <p className="h-6 w-1/2 mt-2 animate-pulse bg-slate-300 my-3"></p>
            <p className="h-4 w-full mt-2 animate-pulse bg-slate-300 my-3"></p>
            <p className="h-4 w-full mt-2 animate-pulse bg-slate-300 my-3"></p>
            <p className="h-4 w-full mt-2 animate-pulse bg-slate-300 my-3"></p>
            <p className="h-4 w-full mt-2 animate-pulse bg-slate-300 my-3"></p>
            <div className="w-full mt-4">
                <Button variant="outline">Read More</Button>
            </div>
        </div>
    )
}

export default function Loading(){
    return(
        <section className="m-5 grid grid-cols-1 md:grid-cols-3 gap-10">
            <NewsSections />
            <NewsSections />
            <NewsSections />   
        </section>
    )
}