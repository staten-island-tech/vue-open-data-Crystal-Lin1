export async function getAllData(): Promise<Record<string, any>[]> {
    const url = 'https://data.cityofnewyork.us/resource/43nn-pn8j.json?$limit=10000'
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
    return filteredData 
}

export async function getBoroData(filteredData: Record<string, unknown>[], boro: String): Promise<Record<string, unknown>[]> {
    let boroData = null
    
    boroData = filteredData.filter((obj) => {
        return obj.boro === boro
    })
    console.log(boroData)
    return boroData
} 
