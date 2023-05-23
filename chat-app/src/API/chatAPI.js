const chatStableEndpoint = "https://dolphin-proxy.onrender.com/chat/stable"
const chatExploratoryEndpoint = "https://dolphin-proxy.onrender.com/chat/exploratory"

export const sendMessage = async (data, server) => {

    const endpoint = server === 'Stable' ? chatStableEndpoint : chatExploratoryEndpoint

    console.log("🚀 Request: " + endpoint)

    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    console.log("⬇️ Response:")
    console.log(response)

    if(!response.ok) {
        const errorMessage = `code ${response.status}`
        throw new Error(errorMessage)
    }

    return await response.json()
};