
export default function Main(){
    return(
        <>
            <img src="banner.jpg" className="w-[100vw] h-[100vh]" />
            <div className="absolute content-center justify-items-center text-center top-0 pt-20 left-0 bg-background/85 w-full h-full">
                <h2 className="font-bold text-6xl m-2">Stock Market Price, Prediction & News</h2>
                <p className="font-semibold text-xl m-2 text-pretty">Get information regarding all the latest companies from US stock market, get an estimation of 
                    their future stock prices using Machine Learning technologies and read the trending news affecting the 
                    stocks, it's technology and cryptos.
                </p>
                <button className=" bg-background hover:bg-popover duration-500 p-2 rounded-full">Get Started</button>
            </div>
        </>
    )
}