/* eslint-disable react-hooks/exhaustive-deps */
import { HStack, VStack, Checkbox } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  CheckboxGroup,
  Badge,
  Spinner,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
function SearchSelect({
  diet$,
  mealType$,
  editDiet,
  editMealType,
  loading$,
  filter,
}) {
  const mealType = ["Breakfast", "Lunch", "Dinner", "Snack", "Teatime"];
  const diet = [
    "Balanced",
    "High-Fiber",
    "High-Protein",
    "Low-Carb",
    "Low-Fat",
    "Low-Sodium",
  ];

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [mealTypeValue, setMealTypeValue] = useState([]);
  const [dietValue, setDietValue] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const sub1 = diet$.subscribe((item) => {
      setDietValue(item);
    });

    const sub2 = mealType$.subscribe((item) => {
      setMealTypeValue(item);
    });
    const sub3 = loading$.subscribe((item) => {
      setLoading(item);
    });

    
    return () => {
      sub1.unsubscribe();
      sub2.unsubscribe();
      sub3.unsubscribe();
    };
  }, []);

  const dietCheckBoxClicked = (event, dietList) => {
    if (event.currentTarget.checked) {
      editDiet([...dietList, event.currentTarget.value]);
    } else {
      editDiet([
        ...dietList.filter((item) => item !== event.currentTarget.value),
      ]);
    }
  };

  const mealTypeCheckBoxClicked = (event, dietList) => {
    if (event.currentTarget.checked) {
      editMealType([...dietList, event.currentTarget.value]);
    } else {
      editMealType([
        ...dietList.filter((item) => item !== event.currentTarget.value),
      ]);
    }
  };

  const apply = () => {
    filter();
    onClose();
  };

  return (
    <div>
      <div>
        <Button onClick={onOpen}>Filter</Button>
        &nbsp; &nbsp;
        {mealTypeValue.length !== 0 || dietValue.length !== 0 ? (
          <Badge colorScheme="purple">Filter is present*</Badge>
        ) : (
          <></>
        )}
        &nbsp; &nbsp; {loading ? <Spinner /> : <></>}
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={5}>
              <p>Meal Type</p>
              <HStack spacing={4} wrap={"wrap"}>
                <CheckboxGroup value={mealTypeValue}>
                  {mealType.map((item) => (
                    <Checkbox
                      value={item.toLowerCase()}
                      key={item}
                      onChange={(event) => {
                        mealTypeCheckBoxClicked(event, mealTypeValue);
                      }}
                    >
                      {item}
                    </Checkbox>
                  ))}
                </CheckboxGroup>
              </HStack>

              <p>Diet</p>
              <HStack spacing={4} wrap={"wrap"}>
                <CheckboxGroup value={dietValue}>
                  {diet.map((item) => (
                    <Checkbox
                      value={item.toLowerCase()}
                      key={item}
                      onChange={(event) => {
                        dietCheckBoxClicked(event, dietValue);
                      }}
                    >
                      {item}
                    </Checkbox>
                  ))}
                </CheckboxGroup>
              </HStack>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="ghost"
              onClick={() => {
                apply();
              }}
            >
              Apply
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default SearchSelect;
