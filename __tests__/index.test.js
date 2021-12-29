import { render, screen, fireEvent, act} from "@testing-library/react";
import Find from "../pages/findrecipe";
import Rec from '../pages/recipe'
import {arrayResponse, oneRespone} from '../array-response'

describe("Mock searchCall", () => {
  beforeEach(() => {
    
    global.fetch = jest.fn().mockImplementation(
      (path) => {
        if(path.incudes('/api/getitems?')){
          return ({
            ok: true,
            status: 200,
            json: async () => ({ ...arrayResponse }),
          })
        } else {
          return ({
            ok: true,
            status: 200,
            json: async () => ({ ...oneRespone }),
          })
        }
      }
    );
  });

  afterAll(() => {
    global.fetch.mockClear()
  })

  it("Find result", async () => {
     await act(  async () =>  {
      render(<Find />)
      const searchInput = screen.getByTestId("searchInput");
      searchInput.value = 'rice'
      const searchButton = screen.getByTestId("searchButton");
      fireEvent.click(searchButton)
      setTimeout(() => {
        const searchResult = screen.findByText("Ginger Chicken w/Braised Baby Bok Choy");
        expect(searchResult).toBeInTheDocument();
      },500)
     })
  });


  it("Prins recepie", async () => {
    await act(  async () =>  {
     render(<Rec />)
    setTimeout(() => {
      const searchResult = screen.findByText("Scotch Eggs");
      expect(searchResult).toBeInTheDocument();
    },500)
     
    })
 });
});





