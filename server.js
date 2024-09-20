const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Thay thế 'YOUR_OPENAI_API_KEY' bằng API key của bạn
const OPENAI_API_KEY = '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';

app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: userMessage }],
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${OPENAI_API_KEY}`,
                },
            }
        );

        const botMessage = response.data.choices[0].message.content;
        res.json({ reply: botMessage });
    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Có lỗi xảy ra khi gọi OpenAI API.' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server đang chạy trên cổng ${PORT}`);
});
