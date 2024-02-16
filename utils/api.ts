import { IHomeQueryParams } from "./typeGroup";

const getHomeList = async ({ type = "latest", category, page = '1', limit = '5' }:IHomeQueryParams) => {
    const baseUrl = `/api/home/list`;
    // console.log(category)
    const queryParams = new URLSearchParams({
      ...(type && { type }),
      ...(category && { category }),
      page,
      limit
    }).toString();
    
    const url = `${baseUrl}?${queryParams}`

    try {
      const response = await fetch(url, {
        method: "GET",
      });
  
      const data = await response.json();
      return data;

    } catch (error) {
      console.error("API 호출 중 오류 발생:", error);
      return null;
    }
};


const getCountList = async () => {
  const url = "/api/home/count"

  try {
    const response = await fetch(url, {
      method: "GET",
    });

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("API 호출 Count:", error);
    return null;
  }
};


export { getHomeList, getCountList }