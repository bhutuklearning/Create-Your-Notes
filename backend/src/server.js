import app from './app.js';
import { ENV } from './config/env.js';



const PORT = ENV.PORT || 8000;

app.listen(3000, () => {
    console.log(`Server is running on port number ${PORT}`);
});