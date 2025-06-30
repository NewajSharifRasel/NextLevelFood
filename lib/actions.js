"use server";
import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { deleteMealBySlug } from "./meals";

export async function shareMeal(formData) {
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    creator: formData.get("creator"),
    creator_email: formData.get("creator_email"),
    image: formData.get("image"), // এখানে File object আসবে
  };
  // await deleteMealBySlug("fortest");

  await saveMeal(meal);
  redirect("/meals");
}
