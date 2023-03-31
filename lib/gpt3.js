const gpt3 = (apiKey, prompt) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": prompt}]
      })
    };

    return fetch('https://api.openai.com/v1/chat/completions', requestOptions)
    .then(response => response.json())
    .then(data => data.choices[0].message.content)
    .catch(error => console.error(error));
  };

  module.exports = gpt3;
