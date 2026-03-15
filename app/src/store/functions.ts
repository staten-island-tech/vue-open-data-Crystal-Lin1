export async function getAllData(): Promise<void> {
    const url = 'https://data.cityofnewyork.us/resource/43nn-pn8j.json'
    //NOTE: the dataset has 297k rows but default amount u can get is 1k. but thats still a lot
    //if i have extra time ill look into how to get the rest of the data
    try {
        const response = await fetch(url)
        const data = await response.json()
        console.log(data)
    } catch (error) {
        console.log(error)
    }
    }
export async function filterOutBadData(data: Record<string, unknown>[]): Promise<Record<string, unknown>[]> {
    return data //placeholder so ts stops complaining
    //TODO: filter out data that is missing critical info (like score, date, etc.) and also filter out data that is clearly wrong (like scores that are negative or above 100)
}
getAllData()