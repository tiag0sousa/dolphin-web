const chatStableEndpoint = "http://localhost:3001/chat/stable"

export const sendMessage = async (data) => {
    const response = await fetch(chatStableEndpoint, {
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