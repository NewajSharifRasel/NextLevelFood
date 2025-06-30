import path from "path";
import { writeFile } from "node:fs/promises";
import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  //throw new Error("Loading meals failed");
  return db.prepare("SELECT * FROM meals").all();
}

export function getMeal(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extension}`;
  const bufferedImage = await meal.image.arrayBuffer();

  const filePath = path.join("public", "images", fileName);
  await writeFile(filePath, Buffer.from(bufferedImage));

  meal.image = `/images/${fileName}`;

  db.prepare(
    `INSERT INTO meals
    (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
    )`
  ).run(meal);
}
// export async function deleteMealBySlug(slug) {
//   const stmt = db.prepare("DELETE FROM meals WHERE slug = ?");
//   const info = stmt.run(slug);
//   return info;
// }
