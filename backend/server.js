import app from "./src/app.js";
import config from "./src/config/env.config.js";

import ConnectDb from "./src/config/ConnectDb.js";
ConnectDb();

app.listen(config.PORT, () => {
  console.log(`Server is Runing on Port ${config.PORT}`);
});
