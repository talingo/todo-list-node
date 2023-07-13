import { writeFileSync, existsSync, readFileSync } from "fs";

const file = "./db/data.json";

export const saveDB = (data) => {
  writeFileSync(file, JSON.stringify(data));
};

export const readDB = () => {

    if ( !existsSync(file)) {
        return null
};

    const info = readFileSync(file, {encoding: 'utf-8'});
    const data = JSON.parse(info)


    return data
}  



export default {
  saveDB,
  readDB
};
