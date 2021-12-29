import axios from "axios";
import { APIENDPOINT, APIID, APIKEY } from "../../utils/constants";
import url from "url";

export default async function handler(req, res) {
  const queryObject = url.parse(req.url, true).query;
  const { id } = queryObject;

  const query =`${APIENDPOINT}/${id}?app_id=${APIID}&app_key=${APIKEY}&type=public`;
  try {
    const result = await axios.get(query);
    res.status(200).send(result.data);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "" });

    return;
  }
}
