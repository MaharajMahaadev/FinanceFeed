import Link from "next/link"
import SearchBar from "./components/SearchBar"
import { ThemeToggle } from "./components/theme-toggle"

export default function Navbar(){
    return(
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
          <Link href="/">
            <h1 className="text-2xl font-bold">Finance Feed</h1>
            </Link>
            <nav className="hidden md:flex gap-6">
            <Link href="/stockprice">
              <p className="text-sm font-medium hover:text-primary">Dashboard</p>
            </Link>
            <Link href="/news">
              <p className="text-sm font-medium text-muted-foreground hover:text-primary">News</p>
            </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <SearchBar />
            <ThemeToggle />
          </div>
        </div>
      </header>
    )
}