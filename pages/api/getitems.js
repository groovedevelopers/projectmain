// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import { APIENDPOINT, APIID, APIKEY } from "../../utils/constants";
import url from "url";

export default async function handler(req, res) {
  const queryObject = url.parse(req.url, true).query;
  const { q, diet, mealType, endPoint } = queryObject;


  const query =  endPoint ?? `${APIENDPOINT}?app_id=${APIID}&app_key=${APIKEY}&q=${q}&type=public${diet}${mealType}`;
  try {
    const result = await axios.get(query);

    res.status(200).send(result.data);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "" });

    return;
  }
}
