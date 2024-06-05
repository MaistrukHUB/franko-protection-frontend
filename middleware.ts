import { NextResponse } from "next/server";
import * as Api from "./api";

export async function middleware(request: any) {
  let token = request.cookies.get("_token");

  // Додаємо логування для перевірки токена
  console.log("Token: ", token);

  if (!token) {
    // Якщо токен не знайдений, перенаправляємо на головну сторінку
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Перевіряємо роль користувача
  const admin = await Api.auth.checkRole(token.value);

  // Додаємо логування для перевірки ролі
  console.log("Is Admin: ", admin);

  if (!admin) {
    // Якщо користувач не адміністратор, перенаправляємо на головну сторінку
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Якщо користувач адміністратор, пропускаємо запит далі
  return NextResponse.next();
}

// Налаштовуємо маршрут для middleware
export const config = {
  matcher: ["/admin"],
};
