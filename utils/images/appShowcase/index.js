import Image from "next/image";
import { nanoid } from "nanoid";

let imagesList = [];

for (let i = 0; i <= 8; i++) {
  imagesList.push({
    id: nanoid(),
    src: `/static/img/app_showcase/${i}.png`
  });
}

export default imagesList;
