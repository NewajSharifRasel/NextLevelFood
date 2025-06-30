import classes from "./page.module.css";
import Image from "next/image";
import { getMeal } from "@/lib/meals";

export default function MealDetailPage({ params }) {
  const meal = getMeal(params.mealSlug);

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={meal.image} alt={meal.title} fill />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summery}</p>
        </div>
      </header>
      <main>
        <div
          className={classes.instructions}
          dangerouslySetInnerHTML={{ __html: meal.instructions }}
        />
      </main>
    </>
  );
}
