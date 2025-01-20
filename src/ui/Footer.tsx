
export default function Footer(){
    return(
        <footer className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t-2 border-t-foreground">
        <div className="container flex h-16 items-center justify-between">
          <a className="text-sm font-medium text-muted-foreground hover:text-primary" href='https://github.com/MaharajMahaadev/FinanceFeed' target="_blank">Github</a>
          <p className="font-semibold">Created by Maharaj Mahaadev</p>
          <a className="text-sm font-medium text-muted-foreground hover:text-primary" href='https://maharajmahaadev.vercel.app/' target="_blank">Portfolio</a>
        </div>
      </footer>
    )
}