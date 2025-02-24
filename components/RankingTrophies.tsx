import { GoldTrophy, SilverTrophy, BronzeTrophy, Shine } from "./Svgs";

export function RankingTrophies() {
    return (
        <div className="flex items-center justify-center gap-4 relative pb-12 pt-32">
            <Shine className="top-100 left-208" />
            <SilverTrophy className="h-30 w-auto" />
            <GoldTrophy className="h-30 w-auto relative -top-20" />
            <BronzeTrophy className="h-30 w-auto" />
            <Shine className="top-70 right-176" />
        </div>
    );
}