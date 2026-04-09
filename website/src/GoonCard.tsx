import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const getQuote = () => [
    "You make me proud (dejected).",
    "How? Just like how tf?",
    "Omfg, this is actually crazy.",
    "WTF?? Again? Dude stop, you are scaring me.",
    "Uhh, I don't know what to say. This is just insane.",
][Math.floor(Math.random() * 5)]

type GoonCardProps = {
    name: string
    todayCount: number
    lifetimeCount: number
}

export function GoonCard({ name, todayCount, lifetimeCount }: GoonCardProps) {
    return (
        <Card className="max-w-4xl py-0 sm:flex-row sm:gap-4 p-6">
            <CardContent className="grow px-0">
                <img
                    src="/literally-you.gif"
                    alt="Literally you rn"
                    className="size-full object-contain rounded-l-xl"
                />
            </CardContent>
            <div className="sm:min-w-60 w-2/3">
                <CardHeader className="pt-6">
                    <CardTitle className="text-4xl mb-2 whitespace-nowrap">Gooner: <span className="font-bold">{name}</span></CardTitle>
                    <CardDescription>
                        <div className="flex gap-2">
                            <Badge variant="default">
                                Today {todayCount}
                            </Badge>
                            <Badge variant="secondary">
                                Lifetime {lifetimeCount}
                            </Badge>
                        </div>
                    </CardDescription>
                </CardHeader>
                <CardFooter className="gap-3 py-6">
                    <p className="text-muted-foreground italic leading-relaxed">
                        {getQuote()}
                    </p>
                </CardFooter>
            </div>
        </Card>
    )
}
