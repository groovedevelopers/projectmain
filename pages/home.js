import { Box, Image } from "@chakra-ui/react";

function Home() {
  const property = {
    imageUrl: "https://bit.ly/2Z4KKcF",
    imageAlt: "Rear view of modern home with pool",
   
  };

  return (
    <div style={{display: 'grid' , "placeItems": 'center'}}>
       <br></br>
       <h5>Welcome home</h5>
      <Box maxW="m" borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Image src={property.imageUrl} alt={property.imageAlt} />

        
      </Box>
    </div>
  );
}

export default Home;
