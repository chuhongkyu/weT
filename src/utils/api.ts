const getHomeList = async ({queryKey}:any) => {
    const [_key, { type, category, page, limit }] = queryKey

    const baseUrl = `${process.env.NEXTAUTH_URL}/api/list`;

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
  const url = `${process.env.NEXTAUTH_URL}/api/listCount`

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

const getDetailList = async ({ queryKey }:any) => {
  const [_key, idx ] = queryKey;
  const url = `${process.env.NEXTAUTH_URL}/api/detail/${idx}`

  const response = await fetch(url, 
    { next : { tags: ['detail', idx]}}
  );
  const data = await response.json();
  if (!response.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return data;
};


const getCommentList = async({ queryKey }:any) => {
  const [_key, id ] = queryKey;
  const url = `${process.env.NEXTAUTH_URL}/api/comment/list?id=${id}`;

  const response = await fetch(url, { next: { revalidate: 30, tags: ['comment'] }});

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data
}

export { getHomeList, getCountList, getDetailList, getCommentList }