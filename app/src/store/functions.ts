export async function getAllData(): Promise<Record<string, any>[]> {
    const url = 'https://data.cityofnewyork.us/resource/43nn-pn8j.json'
    //NOTE: the dataset has 297k rows but default amount u can get is 1k. but thats still a lot
    //if i have extra time ill look into how to get the rest of the data
    try {
        const response = await fetch(url)
        const data = await response.json()
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
    return [] //here so t
    }
export async function filterOutBadData(data: Record<string, unknown>[]): Promise<Record<string, unknown>[]> {
    const filteredData = data.filter((obj) => {
        return Object.hasOwn(obj, 'grade')
    })
    console.log(filteredData)
    return data //placeholder so ts stops complaining
    //TODO: filter out data that is missing critical info (like score, date, etc.) and also filter out data that is clearly wrong (like scores that are negative or above 100)

    /* {
    "camis": "41459621",
    "dba": "GINO'S BRICK OVEN PIZZA & TRATTORIA",
    "boro": "Brooklyn",
    "building": "548550",
    "street": "FLATBUSH AVENUE",
    "phone": "7182871277",
    "cuisine_description": "Pizza",
    "inspection_date": "2022-10-13T00:00:00.000",
    "action": "Violations were cited in the following area(s).",
    "violation_code": "02B",
    "violation_description": "Hot TCS food item not held at or above 140 °F.",
    "critical_flag": "Critical",
    "score": "7",
    "grade": "A",
    "grade_date": "2022-10-13T00:00:00.000",
    "record_date": "2026-03-13T06:00:13.000",
    "inspection_type": "Cycle Inspection / Initial Inspection",
    "latitude": "0",
    "longitude": "0",
    "bbl": "3"
}*/
}
