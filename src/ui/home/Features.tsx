import { features } from "@/lib/features"

export default function Features(){
    return(
        <div className="container text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Powerful Features for
              <span className="text-primary"> Modern Trading</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience a comprehensive suite of tools designed to give you the edge in today's markets.
            </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-6">
            {features.map((feature, index) => (
                <div key={index} className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-purple-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500" />
                <div className="glass-card p-8 rounded-2xl relative group-hover:translate-y-[-4px] transition duration-500">
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.info}</p>
                </div>
                </div>
            ))}
          </div>
        </div>
    )
}