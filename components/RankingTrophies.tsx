import { GoldTrophy, SilverTrophy, BronzeTrophy, Shine } from "./Svgs";

export function RankingTrophies(){
    return(
        <div className="flex items-center justify-center gap-4">
            <Shine className="absolute top-100 left-208" />
            <SilverTrophy className="h-30 w-auto" />
            <GoldTrophy className="h-30 w-auto relative -top-16" />
            <BronzeTrophy className="h-30 w-auto" />
            <Shine className="absolute top-70 right-176" />
        </div>
    );
}