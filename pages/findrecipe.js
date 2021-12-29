import { useRef,  useLayoutEffect } from "react";
import { IconButton } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import {
  BehaviorSubject,
  combineLatest,
  firstValueFrom,
} from "rxjs";

import { map, take} from "rxjs/operators";
import SearchResult from "../components/reciperesult";
import SearchSelect from "../components/searchselect";

import {searchResult$, searchResultSubject$, diet$, mealType$, dietSubject$,  mealTypeSubject$, currentSearch$   } from '../utils/store'
function FindRecipe() {

  const loading$ = new BehaviorSubject(false)
  

  const hits$ = searchResult$.pipe(
    map((item) => {
      return item.hits;
    })
  );
  const links$ = searchResult$.pipe(
    map((item) => {
      return item._links;
    })
  );

  const input = useRef(null);

 useLayoutEffect(() => {

  currentSearch$.pipe(take(1)).subscribe( item => {
    if(item){
      input.current.value = item


    }
  })


 }, [] )

  const fetRecipes = async () => {
    const q = input.current.value.trim();

    if (q.length < 3) {
      alert("Please inser at least 3 characters");
      return;
    }

    const { diet, mealType } = await firstValueFrom(
      combineLatest([diet$, mealType$]).pipe(
        map(([dietList, mealTypeList]) => {
        

          const diet = dietList.reduce((pv, cv) => `${pv}&diet=${cv}`, "");
          const mealType = mealTypeList.reduce(
            (pv, cv) => `${pv}&mealType=${cv}`,
            ""
          );

          return {
            diet: diet === "&diet=" ? "" : diet,

            mealType: mealType === "&mealType=" ? "" : mealType,
          };
        })
      )
    );

    let params = { q, diet, mealType };
    const url = "/api/getitems?" + new URLSearchParams(params).toString();

    try {
      loading$.next(true);
      const result = await fetch(url);
      if (result.status !== 200) {
        alert("Error please try again");
        return;
      }
      const data = await result.json();
      
      searchResultSubject$.next(data);

      currentSearch$.next(q)
    } catch (error) {
    } finally {
      loading$.next(false);
    }
  };

  const getMore = async () => {
  
  
    try {
      loading$.next(true);
      const link = (await firstValueFrom(links$))?.next?.href;
      if (link) {
        const url = "/api/getitems?" + new URLSearchParams({endPoint:link }).toString();
        const result = await fetch(url);
        if (result.status !== 200) {
          alert("Error please try again");
          return;
        }
        const data = await result.json();
        const finalResult = await firstValueFrom(
          searchResult$.pipe(
            map((items) => {
              const itemData = data;
              itemData.hits = [...items.hits, ...itemData.hits];
              return itemData;
            })
          )
        );

        searchResultSubject$.next(finalResult);
            
      }
    } catch (error) {
      console.log(error)
    } finally {
      loading$.next(false);
    }
  };

  const editMealType = (meal) => {
    mealTypeSubject$.next(meal);
  };

  const editDiet = (meal) => {
    dietSubject$.next(meal);
  };

 
  return (
    <div className="receiptResult">
      <header>
        <div>
          <Input ref={input}   data-testid="searchInput"  placeholder="Search receipe" />

          <IconButton
            colorScheme="blue"
            aria-label="Search database"
            data-testid="searchButton"
            onClick={() => fetRecipes("rice")}
            icon={<SearchIcon />}
          />
        </div>
        <SearchSelect
          mealType$={mealType$}
          diet$={diet$}
          editDiet={editDiet}
          editMealType={editMealType}
          loading$={loading$}
          filter={fetRecipes}
        />
      </header>

      <main>
        <SearchResult hits$={hits$} getMore={getMore}></SearchResult>
      </main>
    </div>
  );
}

export default FindRecipe;
