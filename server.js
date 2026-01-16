// const express = require('express');
// const path = require('path');
// const app = express();
// const PORT = process.env.PORT || 3000;

// // 정적 파일 제공
// app.use(express.static(path.join(__dirname, 'public')));

// // 외부 api 키 감추기, 클라이언트에서는 노출됨
// app.get('/api/config', (req, res)=> {
//     res.json({
//         apiKey: process.env.MAP_API_KEY
//     });
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

const express = require('express')
const app = express()

app.listen(8080, () => {
    console.log('http://localhost:8080 에서 서버 실행중')
})

// app.get('/', function(요청, 응답) {
//   응답.sendFile(__dirname + '/index.html')
// })

const path = require('path');
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// app.get('/url', (요청, 응답) => {
//     응답.send('url페이지')
// })