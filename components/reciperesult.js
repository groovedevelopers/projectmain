import { Button, Box, Image } from "@chakra-ui/react";
import { TriangleDownIcon, ArrowRightIcon } from "@chakra-ui/icons";

import { useEffect, useState } from "react";
import Link from "next/link";
import { recepie$ } from "../utils/store";

function SearchResult({ hits$, getMore }) {
  const [searchResult, setsearchResult] = useState([]);

  useEffect(() => {
    const sub = hits$.subscribe((item) => {
      setsearchResult(item);
    });

    return () => sub.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div data-testid="searchResult">
      <div className="rowRwap">
        {searchResult.map((item) => (
          <Box key={item.recipe.uri} boxSize="sm">
            <Image
              loading="lazy"
              src={item.recipe.image}
              alt={item.recipe.label}
            />

            <p  >
              <Link
             
                href={{ pathname: "/recipe", query: { uri: item.recipe.uri } }}

                passHref={true}
                key={item.recipe.uri}
                
              >
                <span className="pointer"  onClick={
               () => { recepie$.next(item.recipe)}
              }>
                  {item.recipe.label} <ArrowRightIcon />
                </span>
              </Link>
            </p>
          </Box>
        ))}
      </div>

      {searchResult.length >= 20 ? (
        <div style={{ display: "grid", placeItems: "center", padding: "10px" }}>
          <Button
            onClick={() => {
              getMore();
            }}
          >
            Load more &nbsp; <TriangleDownIcon />
          </Button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default SearchResult;
