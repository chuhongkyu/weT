const getHomeList = async ({queryKey}:any) => {
    const [_key, { type, category, page, limit }] = queryKey

    const baseUrl = `/api/home/list`;

    const queryParams = new URLSearchParams({
      ...(type && { type }),
      ...(category && { category }),
      page,
      limit
    }).toString();
    
    const url = `${baseUrl}?${queryParams}`

    try {
      const response = await fetch(url, { next : { tags: ["list"]}});
  
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