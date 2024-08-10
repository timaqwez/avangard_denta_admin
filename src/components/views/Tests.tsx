import { StatsCard } from "../StatsCard";

export function Tests() {
    return <>
    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        <div style={{width: 'calc(50% - 10px)'}}>
            <StatsCard statName={"Приведено клиентов"} statText={"1234"} statForDay={"8"} statForWeek={"100"}></StatsCard>
        </div>
        <div style={{width: 'calc(50% - 10px)'}}>
            <StatsCard statName={"Приведено клиентов"} statText={"1234"} statForDay={"8"} statForWeek={"100"}></StatsCard>
        </div>
    </div>
    </>
}