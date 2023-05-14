const chatStableEndpoint = "http://localhost:3001/chat/stable"
const chatExploratoryEndpoint = "http://localhost:3001/chat/exploratory"

export const sendMessage = async (data, server) => {

    const endpoint = server === 'Stable' ? chatStableEndpoint : chatExploratoryEndpoint

    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if(!response.ok) {
        throw new Error('HTTP error! status $(response.status)')
    }

    return await response.json()
};