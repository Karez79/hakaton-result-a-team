export const useFetch = async ({ url = '' } = {}) => {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`)
        }

        const data = await response.json()
        // console.log(data)        
        return data;

    } catch (error) {
        console.error(error)
    } finally {
        
    }
}
