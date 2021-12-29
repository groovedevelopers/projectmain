import { Box, Image, Badge } from "@chakra-ui/react";

function Home() {
  const property = {
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOquvpYFKXHDL1YaakSKHKvNDzGqD8WnffSQ&usqp=CAU",
    imageAlt: "about",
  };

  return (
    <div style={{display: 'grid' , "placeItems": 'center'}}>
       <br></br>
       <h5>Welcome about</h5>
      <Box maxW="m" borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Image src={property.imageUrl} alt={property.imageAlt} />

        
      </Box>
    </div>
  );
}

export default Home;
