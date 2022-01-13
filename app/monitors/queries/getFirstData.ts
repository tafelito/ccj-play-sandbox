import { Ctx } from "blitz";

export default async function getShippingRecipts(_ = null, ctx: Ctx) {
  // Validate the input
  // const data = GetProject.parse(input)

  // Require user to be logged in
  ctx.session.$authorize();

  return Array.from({ length: 40 }, () => Math.floor(Math.random() * 40));
}
