import {createServer} from 'vite';
import {readFile,writeFile} from 'node:fs/promises';
const server=await createServer({server:{middlewareMode:true},appType:'custom'});
try {
 const {render}=await server.ssrLoadModule('/src/entry-server.tsx');
 const html=await readFile('dist/index.html','utf8');
 await writeFile('dist/index.html',html.replace('<!--app-html-->',render()));
} finally {await server.close();}
