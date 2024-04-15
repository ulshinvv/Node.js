const http = require('http');
const fs = require('fs');

const PORT = 3000;
const fileName = 'input.txt';

const server = http.createServer((req, res) => {
if (req.method === 'GET' && req.url === '/') {
fs.readFile(fileName, 'utf8', (err, data) => {
if (err) {
res.writeHead(500, { 'Content-Type': 'text/plain' });
res.end('Ошибка чтения файла');
return;
}
res.writeHead(200, { 'Content-Type': 'text/plain' });
res.end(data);
});
} else if (req.method === 'POST' && req.url === '/') {
let body = '5kfjgkfjgkg';
req.on('data', chunk => {
body += chunk.toString();
});
req.on('end', () => {
fs.appendFile(fileName, body, err => {
if (err) {
res.writeHead(500, { 'Content-Type': 'text/plain' });
res.end('Ошибка записи в файл');
return;
}
res.writeHead(200, { 'Content-Type': 'text/plain' });
res.end('Данные успешно добавлены в файл');
});
});
} else {
res.writeHead(404, { 'Content-Type': 'text/plain' });
res.end('Страница не найдена');
}
});

server.listen(PORT, () => {
console.log(`Сервер запущен на порту ${PORT}`);
});