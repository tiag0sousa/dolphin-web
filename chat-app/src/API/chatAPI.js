const chatStableEndpoint = "https://dolphin-proxy.onrender.com/chat/stable"
const chatExploratoryEndpoint = "http://34.123.16.98:8001/v1/chat"

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