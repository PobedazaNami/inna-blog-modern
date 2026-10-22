import {hydrateRoot,createRoot} from 'react-dom/client';
import App from './App';
const container=document.getElementById('root')!;
if(container.querySelector('main'))hydrateRoot(container,<App/>);else createRoot(container).render(<App/>);
