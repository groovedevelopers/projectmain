import { useEffect, useState } from "react";
import { take } from "rxjs/operators";
import { recepie$ } from "../utils/store";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Box,
  Image,
  ListItem,
  UnorderedList,
  Spinner,
} from "@chakra-ui/react";

function Recipe() {

  const uncgggg = () =>{
console.log(uncgggg)
  }
  const [loading, setLoading] = useState(false);

  const [recepiValue, setRecipeValue] = useState(null);

  const getReceipe = async (data) => {
    try {
      setLoading(true);
      const split = data.split("#");

      const url =
        "/api/getoneitem?" +
        new URLSearchParams({ id: split[split.length - 1] }).toString();

      const result = await fetch(url);
      if (result.status !== 200) {
        alert("Error please try again");
        return;
      }
      const jsonData = await result.json();

      setRecipeValue(jsonData.recipe);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location) {
      const urlParams = new URLSearchParams(location.search);
      const data = urlParams.get("uri");
      recepie$.pipe(take(1)).subscribe((item) => {
        if (item !== null && item.uri === data) {
         
          setRecipeValue(item);
        } else {
          getReceipe(data);
        }
      });
    }
  }, []);

  return (
    <>
      {loading ? <Spinner /> : <></>}
      {recepiValue ? (
        <div>
          <Table variant="striped" colorScheme="teal">
            <TableCaption>Recipe Details</TableCaption>
            <Thead>
              <Tr>
                <Th>Label</Th>
                <Th isNumeric>Calories</Th>
                <Th isNumeric>Total Weight</Th>
                <Th isNumeric>Total Time</Th>
                <Th isNumeric>Yield</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>{recepiValue.label}</Td>

                <Td isNumeric>{recepiValue.calories}</Td>
                <Td isNumeric>{recepiValue.totalTime}</Td>
                <Td isNumeric>{recepiValue.totalWeight}</Td>
                <Td isNumeric>{recepiValue.yield}</Td>
              </Tr>
            </Tbody>
          </Table>

          <div
            style={{ margin: "auto", display: "grid", placeItems: "center" }}
          >
            <Box boxSize="m">
              <Image src={recepiValue.image} alt={recepiValue.label} />

              <p>Ingredients</p>
              <UnorderedList>
                {recepiValue.ingredients.map((item) => (
                  <ListItem key={item.text}>{item.text}</ListItem>
                ))}
              </UnorderedList>
            </Box>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default Recipe;
